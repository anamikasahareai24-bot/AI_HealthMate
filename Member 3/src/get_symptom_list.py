import pandas as pd

DATA_PATH = "datasets/processed/train_new.csv"

df = pd.read_csv(DATA_PATH)

symptoms = [col for col in df.columns if col != "disease"]

print("Total symptoms:", len(symptoms))
print("\n========== SYMPTOM LIST ==========")

for i, symptom in enumerate(symptoms, 1):
    print(f"{i}. {symptom}")