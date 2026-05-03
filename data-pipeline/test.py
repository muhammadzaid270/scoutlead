import pandas as pd

filename = "permits_20260502_214558.csv"
file_path = f"data/raw/{filename}"

df = pd.read_csv(file_path)

print(df.columns)