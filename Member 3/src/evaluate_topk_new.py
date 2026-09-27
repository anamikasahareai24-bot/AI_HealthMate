import pandas as pd
import joblib
import numpy as np

TEST_PATH = "datasets/processed/test_new.csv"
MODEL_PATH = "models/disease_prediction_model_new.pkl"
ENCODER_PATH = "models/disease_label_encoder_new.pkl"

print("Loading test data and model...")

df = pd.read_csv(TEST_PATH)

X_test = df.drop(columns=["disease"])
y_test = df["disease"]

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

y_test_encoded = encoder.transform(y_test)

print("Test samples:", len(X_test))
print("Disease classes:", len(encoder.classes_))

print("\nCalculating prediction probabilities...")

probabilities = model.predict_proba(X_test)

top3 = np.argsort(probabilities, axis=1)[:, -3:]
top5 = np.argsort(probabilities, axis=1)[:, -5:]

top3_correct = sum(
    y_test_encoded[i] in top3[i]
    for i in range(len(y_test_encoded))
)

top5_correct = sum(
    y_test_encoded[i] in top5[i]
    for i in range(len(y_test_encoded))
)

top3_accuracy = top3_correct / len(y_test_encoded)
top5_accuracy = top5_correct / len(y_test_encoded)

print("\n========== TOP-K RESULTS ==========")
print(f"Top-1 Accuracy: {model.score(X_test, y_test_encoded):.4f}")
print(f"Top-3 Accuracy: {top3_accuracy:.4f}")
print(f"Top-5 Accuracy: {top5_accuracy:.4f}")

print("\nTop-3 and Top-5 evaluation completed!")