
import os
import joblib

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(BASE_DIR, "models", "disease_prediction_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")
SYMPTOM_PATH = os.path.join(BASE_DIR, "symptom_list.txt")

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

with open(SYMPTOM_PATH, "r", encoding="utf-8") as f:
    symptoms = [line.strip() for line in f if line.strip()]

print("Symptoms in list:", len(symptoms))
print("Model expected features:", getattr(model, "n_features_in_", "Not available"))
print("Model estimators:", len(model.estimators_))
print("Encoder diseases:", len(encoder.classes_))
print("First 10 symptoms:", symptoms[:10])

if hasattr(model, "n_features_in_"):
    print("Feature count matches:", model.n_features_in_ == len(symptoms))

print(
    "Estimator count matches:",
    len(model.estimators_) == len(encoder.classes_)
)
