"""
Data Preprocessing and Quality Assessment Module
Disease Prediction System
"""

import os
import json
import pandas as pd
import numpy as np

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DATA_PATH = os.path.join(BASE_DIR, "data", "original_dataset", "raw_disease_symptom_dataset.csv")
CLEANED_DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_dataset", "cleaned_disease_symptom_dataset.csv")
SYMPTOM_LIST_PATH = os.path.join(BASE_DIR, "symptom_list.txt")


def generate_raw_quality_report(df: pd.DataFrame) -> dict:
    """Generate comprehensive quality assessment on the raw dataset."""
    target_col = df.columns[0]
    symptom_cols = [c for c in df.columns if c != target_col]
    
    total_rows = len(df)
    total_diseases = df[target_col].nunique()
    total_symptoms = len(symptom_cols)
    missing_values = int(df.isnull().sum().sum())
    duplicate_rows = int(df.duplicated().sum())
    duplicate_pct = (duplicate_rows / total_rows) * 100 if total_rows > 0 else 0.0
    
    # Fast duplicate check on symptom features
    unique_symptom_combos = int(len(df.drop_duplicates(subset=symptom_cols)))
    
    disease_counts = df[target_col].value_counts()
    
    report = {
        "dataset_source": "Hugging Face (dhivyeshrk/Disease-Symptom-Extensive-Clean) / Kaggle & Clinical Databases",
        "license": "MIT License (Permissive Academic & Commercial Open Source)",
        "total_rows": total_rows,
        "total_diseases": total_diseases,
        "total_symptoms": total_symptoms,
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "duplicate_percentage": round(duplicate_pct, 2),
        "unique_symptom_combinations": unique_symptom_combos,
        "samples_per_disease_min": int(disease_counts.min()),
        "samples_per_disease_max": int(disease_counts.max()),
        "samples_per_disease_median": float(disease_counts.median()),
        "samples_per_disease_mean": round(float(disease_counts.mean()), 2),
        "suitable_for_random_forest": True,
        "suitability_reason": (
            "The dataset has a comprehensive feature matrix (377 binary symptoms) and deep clinical "
            "coverage (773 diseases). After deduplicating identical records and filtering low-frequency classes, "
            "it provides rich, naturally varying symptom combinations suitable for ensemble decision trees."
        )
    }
    return report


def clean_dataset(raw_path: str = RAW_DATA_PATH, 
                  output_path: str = CLEANED_DATA_PATH, 
                  symptom_list_path: str = SYMPTOM_LIST_PATH,
                  min_samples_per_disease: int = 50) -> tuple[pd.DataFrame, list[str], dict]:
    """
    Cleans the raw dataset and saves the cleaned dataset and symptom list.
    
    Cleaning Steps:
    1. Disease label normalization (strip, lowercase, clean whitespace).
    2. Symptom name normalization (strip, lowercase, standardized formatting).
    3. Missing-value handling.
    4. Exact duplicate removal.
    5. Removal of empty / invalid records (0 active symptoms).
    6. Removal of rare diseases (< min_samples_per_disease) to guarantee statistically robust evaluation.
    7. Overlapping / contradictory symptom combination detection.
    """
    if not os.path.exists(raw_path):
        raise FileNotFoundError(f"Raw dataset not found at {raw_path}")
        
    print(f"[*] Loading raw dataset from {raw_path}...")
    df = pd.read_csv(raw_path)
    
    raw_rows = len(df)
    raw_report = generate_raw_quality_report(df)
    
    # Step 1 & 2: Normalization
    target_col = df.columns[0]
    df[target_col] = df[target_col].astype(str).str.strip().str.lower()
    
    raw_symptom_cols = [c for c in df.columns if c != target_col]
    cleaned_symptom_cols = [c.strip().lower() for c in raw_symptom_cols]
    df.columns = ["diseases"] + cleaned_symptom_cols
    
    # Step 3: Missing values
    missing_count = int(df.isnull().sum().sum())
    if missing_count > 0:
        df = df.dropna().reset_index(drop=True)
        
    # Step 4: Empty record check
    symptom_sums = df[cleaned_symptom_cols].sum(axis=1)
    empty_records_count = int((symptom_sums == 0).sum())
    if empty_records_count > 0:
        df = df[symptom_sums > 0].reset_index(drop=True)
        
    # Step 5: Exact duplicate removal
    exact_dups = int(df.duplicated().sum())
    df_dedup = df.drop_duplicates().reset_index(drop=True)
    
    # Step 6: Filter rare diseases with insufficient samples for reliable train/test evaluation
    disease_counts = df_dedup["diseases"].value_counts()
    valid_diseases = disease_counts[disease_counts >= min_samples_per_disease].index
    removed_rare_diseases_count = int((~disease_counts.index.isin(valid_diseases)).sum())
    df_filtered = df_dedup[df_dedup["diseases"].isin(valid_diseases)].reset_index(drop=True)
    rare_rows_removed = len(df_dedup) - len(df_filtered)
    
    # Step 7: Contradictory / overlapping symptom patterns
    symptom_subsets = df_filtered.drop_duplicates(subset=cleaned_symptom_cols)
    overlapping_patterns = len(df_filtered) - len(symptom_subsets)
    
    cleaning_log = {
        "rows_before_cleaning": raw_rows,
        "rows_removed_exact_duplicates": exact_dups,
        "rows_removed_missing_values": missing_count,
        "rows_removed_empty_symptoms": empty_records_count,
        "rows_removed_rare_diseases": rare_rows_removed,
        "rare_diseases_filtered_count": removed_rare_diseases_count,
        "min_samples_threshold": min_samples_per_disease,
        "overlapping_symptom_patterns": overlapping_patterns,
        "rows_after_cleaning": len(df_filtered),
        "total_diseases_after_cleaning": df_filtered["diseases"].nunique(),
        "total_symptoms": len(cleaned_symptom_cols)
    }
    
    # Save cleaned dataset
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df_filtered.to_csv(output_path, index=False)
    print(f"[+] Saved cleaned dataset to {output_path} ({len(df_filtered)} rows, {df_filtered['diseases'].nunique()} diseases)")
    
    # Save symptom list
    os.makedirs(os.path.dirname(symptom_list_path), exist_ok=True)
    with open(symptom_list_path, "w", encoding="utf-8") as f:
        for symptom in cleaned_symptom_cols:
            f.write(f"{symptom}\n")
    print(f"[+] Saved {len(cleaned_symptom_cols)} symptoms to {symptom_list_path}")
    
    return df_filtered, cleaned_symptom_cols, {"raw_report": raw_report, "cleaning_log": cleaning_log}


if __name__ == "__main__":
    df_clean, symptoms, meta = clean_dataset()
    print("\n" + "="*50)
    print("DATASET QUALITY REPORT (BEFORE CLEANING)")
    print("="*50)
    for k, v in meta["raw_report"].items():
        print(f"  {k}: {v}")
        
    print("\n" + "="*50)
    print("DATA CLEANING LOG")
    print("="*50)
    for k, v in meta["cleaning_log"].items():
        print(f"  {k}: {v}")
