import pandas as pd
import joblib

MODEL_PATH = "models/disease_prediction_model_new.pkl"
ENCODER_PATH = "models/disease_label_encoder_new.pkl"
TEST_PATH = "datasets/processed/test_new.csv"

print("Loading model and test data...")

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)
test_df = pd.read_csv(TEST_PATH)

X_test = test_df.drop(columns=["disease"])
y_test = test_df["disease"]

print("Test samples:", len(X_test))

# Pick first test sample
sample = X_test.iloc[[0]]
actual_disease = y_test.iloc[0]

# Prediction
probabilities = model.predict_proba(sample)[0]

top_indices = probabilities.argsort()[-5:][::-1]

print("\n========== MODEL CHECK ==========")
print("Actual disease:", actual_disease)

print("\nTop 5 predictions:")

for i, index in enumerate(top_indices, 1):
    disease = encoder.inverse_transform([index])[0]
    confidence = probabilities[index] * 100

    print(f"{i}. {disease} ({confidence:.2f}%)")

print("\nNumber of symptoms in this test sample:",
      int(sample.sum(axis=1).iloc[0]))