import pandas as pd
import joblib
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

TRAIN_PATH = "datasets/processed/train_new.csv"
MODEL_DIR = "models"

os.makedirs(MODEL_DIR, exist_ok=True)

print("Loading training data...")

df = pd.read_csv(TRAIN_PATH)

X = df.drop(columns=["disease"])
y = df["disease"]

print("Training samples:", len(X))
print("Features:", X.shape[1])
print("Diseases:", y.nunique())

print("\nEncoding disease labels...")

encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

print("Number of classes:", len(encoder.classes_))

print("\nCreating Random Forest...")

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=25,
    min_samples_leaf=2,
    class_weight="balanced_subsample",
    random_state=42,
    n_jobs=-1
)

print("Training model...")

model.fit(X, y_encoded)

print("Training completed!")

joblib.dump(model, f"{MODEL_DIR}/disease_prediction_model_new.pkl")
joblib.dump(encoder, f"{MODEL_DIR}/disease_label_encoder_new.pkl")

print("\nModel saved successfully!")