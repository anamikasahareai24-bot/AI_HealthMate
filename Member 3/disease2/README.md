# Disease Prediction System (Random Forest Classifier)

A standalone machine learning pipeline for symptom-based disease classification using a tuned **Random Forest Classifier** trained on high-dimensional clinical records.

---

## 1. Project Overview & Architecture

This project is a standalone, purely ML-focused disease prediction system. It does not include external web servers, frontends, or chatbots.

```
disease2/
├── data/
│   ├── original_dataset/
│   │   └── raw_disease_symptom_dataset.csv
│   └── cleaned_dataset/
│       └── cleaned_disease_symptom_dataset.csv
├── models/
│   ├── disease_prediction_model.pkl
│   ├── label_encoder.pkl
│   ├── disease_symptom_profiles.pkl
│   ├── train_test_split_meta.json
│   └── evaluation_results.json
├── src/
│   ├── __init__.py
│   ├── preprocess.py
│   ├── train_model.py
│   ├── evaluate_model.py
│   └── predict.py
├── symptom_list.txt
├── requirements.txt
└── README.md
```

---

## 2. Dataset Information & Licensing

* **Source**: [Hugging Face (`dhivyeshrk/Disease-Symptom-Extensive-Clean`)](https://huggingface.co/datasets/dhivyeshrk/Disease-Symptom-Extensive-Clean) / Columbia University & Kaggle Clinical Data Repositories.
* **License**: **MIT License** (Permissive Open Source for Academic and Research Use).
* **Format**: Tabular feature matrix (377 binary symptom indicators: 1 = present, 0 = absent).

### Dataset Quality Summary (Before Cleaning)
* **Total Rows**: 246,945
* **Total Diseases**: 773
* **Total Symptoms**: 377
* **Missing Values**: 0
* **Exact Duplicate Rows**: 57,298 (23.20%)
* **Unique Symptom Combinations**: 169,888
* **Samples per Disease**: Min: 1, Max: 1,219, Median: 168.0, Mean: 319.46

---

## 3. Data Cleaning & Pipeline

The preprocessing module (`src/preprocess.py`) performs:
1. **Label Normalization**: Lowercases, strips whitespace, and standardizes disease and symptom feature names.
2. **Duplicate Removal**: Removes 57,298 exact duplicate rows.
3. **Missing & Empty Filtering**: Verifies 0 missing values and removes records with 0 active symptoms.
4. **Reliability Class Thresholding**: Filters rare diseases (< 50 samples) to ensure statistically robust, stratified 80/20 train/test evaluation across all retained classes.
5. **Final Cleaned Dataset**:
   * **Total Rows**: 184,454
   * **Total Retained Disease Classes**: 413
   * **Total Binary Symptom Features**: 377

---

## 4. Data Leakage Verification & Train/Test Split

* **Train / Test Ratio**: 80% Training (147,563 samples), 20% Testing (36,891 samples).
* **Sampling**: Stratified splitting on target classes with fixed `random_state=42`.
* **Leakage Checks**:
  * Label encoding and empirical symptom probability profiles are fit **strictly on the training partition**.
  * Evaluated symptom pattern overlap: 85.60% (31,580 samples) of the unseen test instances have symptom combinations never seen in the training partition.
  * No target or preprocessing leakage exists.

---

## 5. Model Architecture & Hyperparameters

Tuned `RandomForestClassifier`:
* `n_estimators`: 100
* `max_depth`: 30
* `min_samples_leaf`: 1
* `max_features`: "sqrt"
* `class_weight`: "balanced"
* `random_state`: 42
* `n_jobs`: -1 (Parallel tree building)

---

## 6. Evaluation Metrics on Unseen Test Data (413 Classes)

Evaluated across **36,891 unseen test samples**:

| Metric | Score |
| :--- | :--- |
| **Top-1 Accuracy** | **67.13%** |
| **Top-3 Accuracy** | **79.70%** |
| **Top-5 Accuracy** | **83.97%** |
| **Macro Precision** | **75.70%** |
| **Macro Recall** | **71.16%** |
| **Macro F1-Score** | **70.86%** |
| **Weighted F1-Score** | **71.00%** |

---

## 7. Partial-Symptom Inference & Realistic Testing

In real clinical settings, patients report a subset of their symptoms (~5-8 symptoms) and rarely know or confirm all 377 possible symptoms. Treating unselected symptoms as strictly confirmed "absent" harms classification.

The inference engine in `src/predict.py`:
1. Vectorizes user-selected symptoms.
2. Evaluates the Random Forest decision paths.
3. Computes the clinical symptom coverage / recall across candidate diseases based on training profiles.
4. Outputs the **Top 3 Candidate Diseases** with calibrated differential confidence percentages.

---

## 8. Installation and Execution

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run Data Preprocessing
```bash
python src/preprocess.py
```

### Step 3: Train Random Forest Model & Verify Leakage
```bash
python src/train_model.py
```

### Step 4: Evaluate Model on Unseen Test Split
```bash
python src/evaluate_model.py
```

### Step 5: Run CLI Realistic Predictions & Symptom Tests
```bash
python src/predict.py
```

### Step 6: Launch Web Application UI
```bash
python app.py
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser to interact with the responsive visual UI.

---

## 9. Important Medical Disclaimer

> **Notice:** These results are generated from symptom patterns learned from the dataset and are **not a confirmed medical diagnosis**. This system is intended for academic and decision-support research only.
