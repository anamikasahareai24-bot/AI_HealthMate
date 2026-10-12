
import os
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "cleaned_dataset",
    "cleaned_disease_symptom_dataset.csv"
)


def main():
    print("Loading dataset...", flush=True)

    df = pd.read_csv(DATA_PATH)

    symptom_cols = [col for col in df.columns if col != "diseases"]

    print(f"Total rows: {len(df)}", flush=True)
    print(f"Total diseases: {df['diseases'].nunique()}", flush=True)

    print("\nChecking duplicate symptom patterns...", flush=True)

    # Convert symptom columns into a compact binary matrix
    X = df[symptom_cols].fillna(0).to_numpy(dtype=np.uint8)

    # Find unique symptom patterns and map every row to its pattern
    unique_patterns, pattern_ids = np.unique(
        X, axis=0, return_inverse=True
    )

    print(f"Unique symptom combinations: {len(unique_patterns)}", flush=True)

    # Check whether one symptom pattern has multiple disease labels
    check_df = pd.DataFrame({
        "pattern_id": pattern_ids,
        "disease": df["diseases"].astype(str).to_numpy()
    })

    disease_counts = check_df.groupby("pattern_id")["disease"].nunique()
    ambiguous_ids = disease_counts[disease_counts > 1].index

    print(
        f"Combinations linked to multiple diseases: {len(ambiguous_ids)}",
        flush=True
    )

    print("\nExamples of ambiguous combinations:", flush=True)

    if len(ambiguous_ids) > 0:
        examples = (
            check_df[check_df["pattern_id"].isin(ambiguous_ids)]
            .drop_duplicates(["pattern_id", "disease"])
            .groupby("pattern_id")["disease"]
            .apply(list)
            .head(10)
        )

        for pattern_id, diseases in examples.items():
            print(f"Pattern {pattern_id}: {', '.join(diseases)}", flush=True)
    else:
        print("None found.", flush=True)

    print("\nCheck completed.", flush=True)


if __name__ == "__main__":
    main()
