import pandas as pd

path = "datasets/new_dataset2/data.csv"

df = pd.read_csv(path)

print("Total rows:", len(df))
print("Unique diseases:", df["diseases"].nunique())
print("Duplicate rows:", df.duplicated().sum())

print("\nDisease distribution:")
print(df["diseases"].value_counts().describe())

print("\nDiseases with <10 samples:",
      (df["diseases"].value_counts() < 10).sum())

print("Diseases with <20 samples:",
      (df["diseases"].value_counts() < 20).sum())

print("\nMinimum samples:",
      df["diseases"].value_counts().min())

print("\nMaximum samples:",
      df["diseases"].value_counts().max())