SCHEMA_REGISTRY = {
    "permit_id": ["permitnum", "permit_number", "id"],
    "description": ["description", "work_description", "project_desc"],
    "issued_at": ["issue_date", "issueddate"],
    "address": [
        "permit_location", 
        "original_address1", 
        "site_address", 
        "address"
    ],
    "zip_code": ["original_zip", "original_zip_code", "zip", "postal_code", "zipcode", "zip_code"], # Added from CSV
    "work_class": ["work_class"],
    "permit_type": ["permit_type_desc"],
    "permit_class": ["permit_class_mapped", "permit_class"],
    "estimated_cost": ["total_job_valuation"],
    "contractor_name": [
        "contractor_company_name", 
        "applicant_full_name", 
        "applicant_name"
    ],
    "contractor_phone": ["contractor_phone"],
    "status": ["status_current", "status", "permit_status"],
    "source_updated_at": ["statusdate", "source_updated_at", "updated_date"],
    "portal_link": ["link"],
    "raw_payload": ["raw_payload"],
    "ingested_at": ["ingested_at"],
}