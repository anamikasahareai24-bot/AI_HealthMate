import pandas as pd

df = pd.read_csv("datasets/processed/train_new.csv")

diseases = sorted(df["disease"].unique())

print("Total diseases:", len(diseases))

for i, disease in enumerate(diseases, start=1):
    print(f"{i}. {disease}")