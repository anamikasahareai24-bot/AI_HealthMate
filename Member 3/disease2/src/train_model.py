"""
Disease Prediction Model Training
One-vs-Rest Logistic Regression
"""

import os
import json
import time
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, f1_score


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "cleaned_dataset",
    "cleaned_disease_symptom_dataset.csv"
)

MODEL_PATH = os.path.join(
    BASE_DIR, "models", "disease_prediction_model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR, "models", "label_encoder.pkl"
)

PROFILES_PATH = os.path.join(
    BASE_DIR, "models", "disease_symptom_profiles.pkl"
)

META_PATH = os.path.join(
    BASE_DIR, "models", "train_test_split_meta.json"
)

SYMPTOM_LIST_PATH = os.path.join(
    BASE_DIR, "symptom_list.txt"
)


def train_model(
    data_path=DATA_PATH,
    test_size=0.20,
    random_state=42
):
    print("=" * 55)
    print("ONE-VS-REST LOGISTIC REGRESSION")
    print("=" * 55)

    if not os.path.exists(data_path):
        raise FileNotFoundError(
            f"Dataset not found: {data_path}"
        )

    print("\n[*] Loading dataset...")
    df = pd.read_csv(data_path)

    with open(
        SYMPTOM_LIST_PATH, "r", encoding="utf-8"
    ) as file:
        symptoms = [
            line.strip()
            for line in file
            if line.strip()
        ]

    X = df[symptoms].fillna(0).values.astype(np.float32)
    y_raw = df["diseases"].astype(str).values

    encoder = LabelEncoder()
    y = encoder.fit_transform(y_raw)

    print(f"[+] Samples: {len(X)}")
    print(f"[+] Symptoms: {len(symptoms)}")
    print(f"[+] Diseases: {len(encoder.classes_)}")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
        stratify=y
    )

    print("\n[*] Preparing Logistic Regression...")

    base_model = LogisticRegression(
        solver="lbfgs",
        max_iter=300,
        class_weight="balanced",
        random_state=random_state
    )

    model = OneVsRestClassifier(
        base_model,
        n_jobs=-1
    )

    print("[*] Training started...")
    start = time.time()

    model.fit(X_train, y_train)

    training_time = round(time.time() - start, 2)
    print(f"[+] Training time: {training_time} seconds")

    print("\n[*] Evaluating model...")
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    macro_f1 = f1_score(
        y_test, y_pred, average="macro", zero_division=0
    )

    print(f"[+] Top-1 accuracy: {accuracy * 100:.2f}%")
    print(f"[+] Macro F1: {macro_f1:.4f}")

    print("\n[*] Creating disease symptom profiles...")

    train_df = pd.DataFrame(X_train, columns=symptoms)
    train_df["disease_idx"] = y_train

    profiles = (
        train_df.groupby("disease_idx")[symptoms]
        .mean()
        .reindex(
            range(len(encoder.classes_)),
            fill_value=0
        )
        .values.astype(np.float32)
    )

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    joblib.dump(profiles, PROFILES_PATH)

    metadata = {
        "model_type": "OneVsRest Logistic Regression",
        "num_classes": len(encoder.classes_),
        "num_features": len(symptoms),
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "accuracy": round(float(accuracy), 4),
        "macro_f1": round(float(macro_f1), 4),
        "training_time_seconds": training_time,
        "random_state": random_state
    }

    with open(META_PATH, "w", encoding="utf-8") as file:
        json.dump(metadata, file, indent=2)

    print("\n[+] Model and supporting files saved.")
    print("[+] Training completed successfully.")

    return model, encoder, metadata


if __name__ == "__main__":
    train_model()

