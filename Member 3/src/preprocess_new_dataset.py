import pandas as pd
from sklearn.model_selection import train_test_split
import os

INPUT_PATH = "datasets/new_dataset2/data.csv"
OUTPUT_DIR = "datasets/processed"

os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Loading dataset...")

df = pd.read_csv(INPUT_PATH)

# Rename target column
df.rename(columns={"diseases": "disease"}, inplace=True)

print("Original shape:", df.shape)

# Remove exact duplicate rows
before = len(df)
df = df.drop_duplicates().reset_index(drop=True)
print("Removed duplicates:", before - len(df))

# Remove diseases with only 1 sample
disease_counts = df["disease"].value_counts()

rare_diseases = disease_counts[disease_counts < 2].index

print("Removing diseases with only 1 sample:", len(rare_diseases))

df = df[~df["disease"].isin(rare_diseases)].reset_index(drop=True)

# Separate features and target
X = df.drop(columns=["disease"])
y = df["disease"]

# Stratified train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Save
train_df = X_train.copy()
train_df.insert(0, "disease", y_train.values)

test_df = X_test.copy()
test_df.insert(0, "disease", y_test.values)

train_df.to_csv(
    f"{OUTPUT_DIR}/train_new.csv",
    index=False
)

test_df.to_csv(
    f"{OUTPUT_DIR}/test_new.csv",
    index=False
)

print("\n========== FINAL DATA ==========")
print("Final shape:", df.shape)
print("Features:", X.shape[1])
print("Diseases:", y.nunique())

print("\n========== SPLIT ==========")
print("Training samples:", len(train_df))
print("Testing samples:", len(test_df))

print("\nSaved:")
print("train_new.csv")
print("test_new.csv")