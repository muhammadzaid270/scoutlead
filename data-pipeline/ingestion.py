import argparse
import csv
import json
import os
import re
import time
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, Iterable, List, Optional, Tuple

import requests
from supabase import Client, create_client
from dotenv import load_dotenv
from schema_registry import SCHEMA_REGISTRY
load_dotenv()


SOCRATA_DOMAIN = os.getenv("SOCRATA_DOMAIN", "data.austintexas.gov")
SOCRATA_DATASET_ID = os.getenv("SOCRATA_DATASET_ID")
SOCRATA_APP_TOKEN = os.getenv("SOCRATA_APP_TOKEN")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_TABLE = os.getenv("SUPABASE_TABLE", "permits")
SUPABASE_UNIQUE_KEY = os.getenv("SUPABASE_UNIQUE_KEY", "permit_id")

REQUEST_TIMEOUT_SECONDS = int(os.getenv("REQUEST_TIMEOUT_SECONDS", "30"))
MAX_RETRIES = int(os.getenv("MAX_RETRIES", "5"))
PAGE_SIZE = int(os.getenv("PAGE_SIZE", "1000"))
INSERT_BATCH_SIZE = int(os.getenv("INSERT_BATCH_SIZE", "500"))
MIN_DESCRIPTION_LENGTH = int(os.getenv("MIN_DESCRIPTION_LENGTH", "0"))
MAX_ROWS = int(os.getenv("MAX_ROWS", "0"))  # 0 means no limit

SOQL_SELECT = os.getenv("SOQL_SELECT", "")
SOQL_WHERE = os.getenv("SOQL_WHERE", "")
SOQL_ORDER = os.getenv("SOQL_ORDER", "")

DATE_FORMAT = "%Y-%m-%d"
PERMIT_TYPE_BLACKLIST = {
	"signage permit",
	"tent permit",
}

DB_COLUMNS = [
	"permit_id",
	"description",
	"issued_at",
	"work_class",
	"permit_type",
	"estimated_cost",
	"contractor_name",
	"status",
	"address",
	"zip_code",
	"permit_class",
	"contractor_phone",
	"portal_link",
	"source_updated_at",
	"raw_payload",
	"ingested_at",
]


def get_required_env(name: str) -> str:
	value = os.getenv(name)
	if not value:
		raise RuntimeError(f"Missing required env var: {name}")
	return value


def resolve_alias(row: Dict[str, Any], aliases: Iterable[str]) -> Optional[Any]:
	return next(
		(
			value.strip() if isinstance(value, str) else value
			for key in aliases
			if (value := row.get(key)) is not None
			and not (isinstance(value, str) and value.strip() == "")
		),
		None,
	)


def fallback_string(value: Optional[Any], default: str) -> str:
	if value is None:
		return default
	if isinstance(value, str):
		value = value.strip()
		return value if value else default
	return str(value)


def parse_float(value: Any) -> Optional[float]:
	if value is None:
		return None
	if isinstance(value, (int, float)):
		return float(value)
	text = str(value).strip().replace(",", "")
	if text == "":
		return None
	try:
		return float(text)
	except ValueError:
		return None


def parse_datetime(value: Any) -> Optional[str]:
	if value is None:
		return None
	text = str(value).strip()
	if text == "":
		return None

	if text.isdigit():
		try:
			timestamp = int(text)
			if timestamp > 1_000_000_000_000:
				timestamp = int(timestamp / 1000)
			dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
			return dt.isoformat()
		except (ValueError, OSError):
			pass

	if text.endswith("Z"):
		text = text[:-1] + "+00:00"

	try:
		dt = datetime.fromisoformat(text)
		if dt.tzinfo is None:
			dt = dt.replace(tzinfo=timezone.utc)
		else:
			dt = dt.astimezone(timezone.utc)
		return dt.isoformat()
	except ValueError:
		pass

	for fmt in ("%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S"):
		try:
			dt = datetime.strptime(text, fmt).replace(tzinfo=timezone.utc)
			return dt.isoformat()
		except ValueError:
			continue

	return None


def parse_date_arg(value: str) -> date:
	try:
		return datetime.strptime(value, DATE_FORMAT).date()
	except ValueError as exc:
		raise argparse.ArgumentTypeError(
			f"Invalid date '{value}'. Expected format {DATE_FORMAT}."
		) from exc


def parse_args() -> argparse.Namespace:
	parser = argparse.ArgumentParser(
		description="Ingest permit data from the Socrata API into Supabase."
	)
	parser.add_argument(
		"--start-date",
		type=parse_date_arg,
		help="Start date (YYYY-MM-DD). Defaults to yesterday if omitted.",
	)
	parser.add_argument(
		"--end-date",
		type=parse_date_arg,
		help="End date (YYYY-MM-DD). Defaults to yesterday if omitted.",
	)
	return parser.parse_args()


def resolve_date_range(
	start_date: Optional[date], end_date: Optional[date]
) -> Tuple[str, str]:
	if not start_date and not end_date:
		yesterday = datetime.now(timezone.utc).date() - timedelta(days=1)
		start_date = yesterday
		end_date = yesterday
	elif start_date and not end_date:
		end_date = start_date
	elif end_date and not start_date:
		start_date = end_date

	if start_date and end_date and start_date > end_date:
		raise ValueError("start_date must be on or before end_date.")

	return start_date.strftime(DATE_FORMAT), end_date.strftime(DATE_FORMAT)


def sanitize_phone(value: Optional[Any]) -> Optional[str]:
	if value is None:
		return None
	digits = re.sub(r"\D", "", str(value))
	if len(digits) < 10:
		return None
	return digits


def is_missing_contact(value: Optional[Any]) -> bool:
	if value is None:
		return True
	if isinstance(value, str) and value.strip() == "":
		return True
	return False


def is_blacklisted_permit_type(value: Optional[Any]) -> bool:
	if value is None:
		return False
	text = str(value).strip().lower()
	if text == "":
		return False
	return text in PERMIT_TYPE_BLACKLIST


def build_soql_where(start_date: str, end_date: str) -> str:
	clauses: List[str] = []
	if SOQL_WHERE:
		clauses.append(f"({SOQL_WHERE})")
	if start_date and end_date:
		clauses.append(
			f"issue_date >= '{start_date}' AND issue_date <= '{end_date}'"
		)
	return " AND ".join(clauses)


def request_socrata_page(
	offset: int, limit: int, start_date: str, end_date: str
) -> List[Dict[str, Any]]:
	if not SOCRATA_DATASET_ID:
		raise RuntimeError("Missing SOCRATA_DATASET_ID")

	url = f"https://{SOCRATA_DOMAIN}/resource/{SOCRATA_DATASET_ID}.json"
	params: Dict[str, Any] = {
		"$limit": limit,
		"$offset": offset,
	}
	if SOQL_SELECT:
		params["$select"] = SOQL_SELECT
	where_clause = build_soql_where(start_date, end_date)
	if where_clause:
		params["$where"] = where_clause
	if SOQL_ORDER:
		params["$order"] = SOQL_ORDER

	headers = {"Accept": "application/json"}
	if SOCRATA_APP_TOKEN:
		headers["X-App-Token"] = SOCRATA_APP_TOKEN

	for attempt in range(MAX_RETRIES + 1):
		try:
			response = requests.get(
				url, params=params, headers=headers, timeout=REQUEST_TIMEOUT_SECONDS
			)
		except requests.RequestException:
			wait = min(60, 2 ** attempt)
			time.sleep(wait)
			continue

		if response.status_code == 429 or response.status_code >= 500:
			retry_after = response.headers.get("Retry-After")
			if retry_after and retry_after.isdigit():
				wait = max(1, int(retry_after))
			else:
				wait = min(60, 2 ** attempt)
			time.sleep(wait)
			continue

		response.raise_for_status()
		payload = response.json()
		if isinstance(payload, list):
			return payload
		return []

	raise RuntimeError("Socrata request failed after retries")


def normalize_row(row: Dict[str, Any]) -> Optional[Dict[str, Any]]:
	permit_id = resolve_alias(row, SCHEMA_REGISTRY["permit_id"])
	if not permit_id:
		return None

	description_value = resolve_alias(row, SCHEMA_REGISTRY["description"])
	if description_value is None:
		return None
	description = str(description_value).strip()
	if len(description) < MIN_DESCRIPTION_LENGTH:
		return None

	issued_at = parse_datetime(resolve_alias(row, SCHEMA_REGISTRY["issued_at"]))
	source_updated_at = parse_datetime(
		resolve_alias(row, SCHEMA_REGISTRY["source_updated_at"])
	)

	address = fallback_string(
		resolve_alias(row, SCHEMA_REGISTRY["address"]), "Not Provided"
	)
	work_class = fallback_string(
		resolve_alias(row, SCHEMA_REGISTRY["work_class"]), "Unknown"
	)
	permit_type_raw = resolve_alias(row, SCHEMA_REGISTRY["permit_type"])
	permit_type = fallback_string(permit_type_raw, "Unknown")
	if is_blacklisted_permit_type(permit_type_raw or permit_type):
		return None

	contractor_name_raw = resolve_alias(row, SCHEMA_REGISTRY["contractor_name"])
	contractor_phone_raw = resolve_alias(row, SCHEMA_REGISTRY["contractor_phone"])
	contractor_phone = sanitize_phone(contractor_phone_raw)
	if is_missing_contact(contractor_name_raw) and contractor_phone is None:
		return None
	contractor_name = fallback_string(contractor_name_raw, "Not Provided")
	zip_code = fallback_string(resolve_alias(row, SCHEMA_REGISTRY["zip_code"]), "Unknown")
	permit_class = fallback_string(
		resolve_alias(row, SCHEMA_REGISTRY["permit_class"]), "Unknown"
	)
	portal_link_value = resolve_alias(row, SCHEMA_REGISTRY["portal_link"])
	portal_link: Optional[str]
	if isinstance(portal_link_value, dict):
		url_value = portal_link_value.get("url")
		portal_link = url_value.strip() if isinstance(url_value, str) else None
	elif isinstance(portal_link_value, str):
		portal_link = portal_link_value.strip() or None
	else:
		portal_link = None
	estimated_cost = parse_float(resolve_alias(row, SCHEMA_REGISTRY["estimated_cost"]))
	if estimated_cost is None:
		estimated_cost = None

	record = {
		"permit_id": str(permit_id).strip(),
		"description": description,
		"issued_at": issued_at,
		"work_class": work_class,
		"permit_type": permit_type,
		"estimated_cost": estimated_cost,
		"contractor_name": contractor_name,
		"status": resolve_alias(row, SCHEMA_REGISTRY["status"]),
		"address": address,
		"zip_code": zip_code,
		"permit_class": permit_class,
		"contractor_phone": contractor_phone,
		"portal_link": portal_link,
		"source_updated_at": source_updated_at,
		"raw_payload": row,
		"ingested_at": datetime.now(timezone.utc).isoformat(),
	}

	return {key: record.get(key) for key in DB_COLUMNS}


def chunked(items: List[Dict[str, Any]], size: int) -> Iterable[List[Dict[str, Any]]]:
	for start in range(0, len(items), size):
		yield items[start : start + size]


def init_raw_csv() -> str:
	base_dir = os.path.dirname(os.path.abspath(__file__))
	raw_dir = os.path.join(base_dir, "data", "raw")
	os.makedirs(raw_dir, exist_ok=True)
	timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
	csv_path = os.path.join(raw_dir, f"permits_{timestamp}.csv")

	with open(csv_path, "w", newline="", encoding="utf-8") as handle:
		writer = csv.DictWriter(handle, fieldnames=DB_COLUMNS)
		writer.writeheader()

	return csv_path


def write_raw_csv(rows: List[Dict[str, Any]], csv_path: str) -> None:
	if not rows:
		return

	with open(csv_path, "a", newline="", encoding="utf-8") as handle:
		writer = csv.DictWriter(handle, fieldnames=DB_COLUMNS)
		for row in rows:
			serialized: Dict[str, Any] = {}
			for key in DB_COLUMNS:
				value = row.get(key)
				if isinstance(value, (dict, list)):
					value = json.dumps(value)
				serialized[key] = value
			writer.writerow(serialized)


def insert_rows(supabase: Client, rows: List[Dict[str, Any]]) -> int:
	if not rows:
		return 0

	inserted = 0
	for batch in chunked(rows, INSERT_BATCH_SIZE):
		table = supabase.table(SUPABASE_TABLE)
		try:
			response = table.upsert(batch, on_conflict=SUPABASE_UNIQUE_KEY).execute()
		except TypeError:
			response = table.upsert(batch).execute()

		data = response.data or []
		inserted += len(data)

	return inserted


def create_supabase_client() -> Client:
	url = get_required_env("SUPABASE_URL")
	key = get_required_env("SUPABASE_KEY")
	return create_client(url, key)


def ingest(start_date: str, end_date: str) -> None:
	supabase = create_supabase_client()
	csv_path = init_raw_csv()
	offset = 0
	total_seen = 0
	total_inserted = 0

	while True:
		page = request_socrata_page(
			offset=offset,
			limit=PAGE_SIZE,
			start_date=start_date,
			end_date=end_date,
		)
		if not page:
			break

		normalized: List[Dict[str, Any]] = []
		for row in page:
			total_seen += 1
			record = normalize_row(row)
			if record:
				normalized.append(record)

			if MAX_ROWS and total_seen >= MAX_ROWS:
				break

		write_raw_csv(normalized, csv_path)
		total_inserted += insert_rows(supabase, normalized)

		if MAX_ROWS and total_seen >= MAX_ROWS:
			break

		if len(page) < PAGE_SIZE:
			break

		offset += PAGE_SIZE

	print(
		"Ingestion complete: "
		f"seen={total_seen} inserted_or_updated={total_inserted}"
	)


if __name__ == "__main__":
	args = parse_args()
	try:
		start_date, end_date = resolve_date_range(args.start_date, args.end_date)
	except ValueError as exc:
		raise SystemExit(str(exc)) from exc
	ingest(start_date=start_date, end_date=end_date)