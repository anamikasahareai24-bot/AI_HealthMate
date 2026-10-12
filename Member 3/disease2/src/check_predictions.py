
import os
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(
    BASE_DIR, "data", "cleaned_dataset",
    "cleaned_disease_symptom_dataset.csv"
)
MODEL_PATH = os.path.join(BASE_DIR, "models", "disease_prediction_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")
SYMPTOM_PATH = os.path.join(BASE_DIR, "symptom_list.txt")


def main():
    print("Loading dataset and model...")

    df = pd.read_csv(DATA_PATH)

    with open(SYMPTOM_PATH, encoding="utf-8") as f:
        symptoms = [line.strip() for line in f if line.strip()]

    X = df[symptoms].fillna(0).to_numpy(dtype=np.float32)

    encoder = joblib.load(ENCODER_PATH)
    model = joblib.load(MODEL_PATH)
    y = encoder.transform(df["diseases"].astype(str))

    _, X_test, _, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    print("Evaluating test cases...")
    scores = np.column_stack([
        estimator.predict_proba(X_test)[:, list(estimator.classes_).index(1)]
        for estimator in model.estimators_
    ])

    top1 = scores.argmax(axis=1)
    top3 = np.argsort(scores, axis=1)[:, -3:][:, ::-1]

    print(f"\nTop-1 accuracy: {accuracy_score(y_test, top1) * 100:.2f}%")
    print(f"Top-3 accuracy: {np.mean([y_test[i] in top3[i] for i in range(len(y_test))]) * 100:.2f}%")

    # Show up to 20 incorrect predictions
    wrong_indices = np.where(top1 != y_test)[0]
    print(f"\nIncorrect predictions: {len(wrong_indices)} / {len(y_test)}")
    print("\n===== FIRST 20 INCORRECT EXAMPLES =====")

    for idx in wrong_indices[:20]:
        active_symptoms = [
            symptoms[j] for j in np.where(X_test[idx] > 0)[0]
        ]
        actual = encoder.classes_[y_test[idx]]

        print("\n" + "-" * 55)
        print("Symptoms:", ", ".join(active_symptoms))
        print("Actual disease:", actual)
        print("Predicted Top 3:")

        for rank, disease_idx in enumerate(top3[idx], start=1):
            score = scores[idx, disease_idx] * 100
            disease = encoder.classes_[disease_idx]
            print(f"  {rank}. {disease} | Raw model score: {score:.2f}%")

    print("\nAnalysis complete. No model files were changed.")


if __name__ == "__main__":
    main()