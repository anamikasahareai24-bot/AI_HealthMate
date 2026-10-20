"""
Model Evaluation Module
Disease Prediction System
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLEANED_DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_dataset", "cleaned_disease_symptom_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "disease_prediction_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")
SYMPTOM_LIST_PATH = os.path.join(BASE_DIR, "symptom_list.txt")
EVAL_RESULTS_PATH = os.path.join(BASE_DIR, "models", "evaluation_results.json")


def evaluate_model(data_path: str = CLEANED_DATA_PATH,
                   model_path: str = MODEL_PATH,
                   encoder_path: str = ENCODER_PATH,
                   symptom_list_path: str = SYMPTOM_LIST_PATH,
                   test_size: float = 0.20,
                   random_state: int = 42) -> dict:
    """
    Evaluates the trained Random Forest model on the completely unseen test split.
    Calculates Accuracy, Precision, Recall, Macro F1, Weighted F1, Top-3 and Top-5 Accuracy.
    """
    if not os.path.exists(model_path) or not os.path.exists(encoder_path):
        raise FileNotFoundError("Model or encoder artifacts not found. Run train_model.py first.")
        
    print(f"[*] Loading model from {model_path}...")
    rf = joblib.load(model_path)
    label_encoder = joblib.load(encoder_path)
    
    with open(symptom_list_path, "r", encoding="utf-8") as f:
        symptom_features = [line.strip() for line in f if line.strip()]
        
    df = pd.read_csv(data_path)
    X = df[symptom_features].values.astype(np.int8)
    y = label_encoder.transform(df["diseases"].values)
    
    print(f"[*] Splitting unseen test set (20%) using random_state={random_state}...")
    _, X_test, _, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
    
    print(f"[*] Generating predictions on {len(X_test)} test instances...")
    y_pred = rf.predict(X_test)
    y_proba = rf.predict_proba(X_test)
    
    # Calculate Standard Metrics
    accuracy = float(accuracy_score(y_test, y_pred))
    macro_precision = float(precision_score(y_test, y_pred, average="macro", zero_division=0))
    weighted_precision = float(precision_score(y_test, y_pred, average="weighted", zero_division=0))
    macro_recall = float(recall_score(y_test, y_pred, average="macro", zero_division=0))
    weighted_recall = float(recall_score(y_test, y_pred, average="weighted", zero_division=0))
    macro_f1 = float(f1_score(y_test, y_pred, average="macro", zero_division=0))
    weighted_f1 = float(f1_score(y_test, y_pred, average="weighted", zero_division=0))
    
    # Calculate Top-3 and Top-5 Accuracy
    classes_arr = rf.classes_
    top3_hits = 0
    top5_hits = 0
    
    for i, true_label in enumerate(y_test):
        top_indices = np.argsort(y_proba[i])[::-1]
        top3_classes = classes_arr[top_indices[:3]]
        top5_classes = classes_arr[top_indices[:5]]
        
        if true_label in top3_classes:
            top3_hits += 1
        if true_label in top5_classes:
            top5_hits += 1
            
    top3_accuracy = float(top3_hits / len(y_test))
    top5_accuracy = float(top5_hits / len(y_test))
    
    eval_results = {
        "test_samples_count": len(X_test),
        "num_classes": len(label_encoder.classes_),
        "accuracy_top1": round(accuracy, 4),
        "accuracy_top3": round(top3_accuracy, 4),
        "accuracy_top5": round(top5_accuracy, 4),
        "macro_precision": round(macro_precision, 4),
        "weighted_precision": round(weighted_precision, 4),
        "macro_recall": round(macro_recall, 4),
        "weighted_recall": round(weighted_recall, 4),
        "macro_f1": round(macro_f1, 4),
        "weighted_f1": round(weighted_f1, 4),
    }
    
    # Save evaluation summary
    with open(EVAL_RESULTS_PATH, "w", encoding="utf-8") as f:
        json.dump(eval_results, f, indent=2)
    print(f"[+] Saved evaluation metrics to {EVAL_RESULTS_PATH}")
    
    return eval_results


if __name__ == "__main__":
    results = evaluate_model()
    print("\n" + "="*50)
    print("UNSEEN TEST EVALUATION METRICS")
    print("="*50)
    print(f"  Top-1 Accuracy     : {results['accuracy_top1'] * 100:.2f}%")
    print(f"  Top-3 Accuracy     : {results['accuracy_top3'] * 100:.2f}%")
    print(f"  Top-5 Accuracy     : {results['accuracy_top5'] * 100:.2f}%")
    print(f"  Macro Precision    : {results['macro_precision'] * 100:.2f}%")
    print(f"  Macro Recall       : {results['macro_recall'] * 100:.2f}%")
    print(f"  Macro F1-Score     : {results['macro_f1'] * 100:.2f}%")
    print(f"  Weighted F1-Score  : {results['weighted_f1'] * 100:.2f}%")
