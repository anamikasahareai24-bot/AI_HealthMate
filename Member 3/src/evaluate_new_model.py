import pandas as pd
import joblib
from sklearn.metrics import accuracy_score, f1_score

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
print("Features:", X_test.shape[1])
print("Disease classes:", len(encoder.classes_))

print("\nMaking predictions...")

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test_encoded, y_pred)
macro_f1 = f1_score(y_test_encoded, y_pred, average="macro", zero_division=0)
weighted_f1 = f1_score(y_test_encoded, y_pred, average="weighted", zero_division=0)

print("\n========== MODEL RESULTS ==========")
print(f"Accuracy: {accuracy:.4f}")
print(f"Macro F1: {macro_f1:.4f}")
print(f"Weighted F1: {weighted_f1:.4f}")

print("\nAnalyzing prediction confidence...")

probabilities = model.predict_proba(X_test)

max_confidences = probabilities.max(axis=1) * 100

print("\n========== CONFIDENCE ANALYSIS ==========")

print(f"Average confidence: {max_confidences.mean():.2f}%")
print(f"Median confidence: {pd.Series(max_confidences).median():.2f}%")
print(f"Minimum confidence: {max_confidences.min():.2f}%")
print(f"Maximum confidence: {max_confidences.max():.2f}%")

print("\nConfidence distribution:")

for threshold in [1, 2, 5, 10, 15, 20, 30, 50]:
    percentage = (max_confidences >= threshold).mean() * 100
    print(f"Confidence >= {threshold}% : {percentage:.2f}% of test samples")

print("\n========== CORRECT vs INCORRECT CONFIDENCE ==========")

correct_mask = y_pred == y_test_encoded
incorrect_mask = ~correct_mask

correct_confidences = max_confidences[correct_mask]
incorrect_confidences = max_confidences[incorrect_mask]

print("\nCorrect predictions:")
print(f"Count: {len(correct_confidences)}")
print(f"Average: {correct_confidences.mean():.2f}%")
print(f"Median: {pd.Series(correct_confidences).median():.2f}%")
print(f"Minimum: {correct_confidences.min():.2f}%")
print(f"Maximum: {correct_confidences.max():.2f}%")

print("\nIncorrect predictions:")
print(f"Count: {len(incorrect_confidences)}")
print(f"Average: {incorrect_confidences.mean():.2f}%")
print(f"Median: {pd.Series(incorrect_confidences).median():.2f}%")
print(f"Minimum: {incorrect_confidences.min():.2f}%")
print(f"Maximum: {incorrect_confidences.max():.2f}%")


print("\n========== THRESHOLD ANALYSIS ==========")

for threshold in [1, 2, 5, 10, 15, 20, 30, 50]:

    selected = max_confidences >= threshold

    if selected.sum() > 0:
        coverage = selected.mean() * 100
        accuracy_above = correct_mask[selected].mean() * 100

        print(
            f"Threshold >= {threshold}% | "
            f"Coverage: {coverage:.2f}% | "
            f"Accuracy: {accuracy_above:.2f}%"
        )