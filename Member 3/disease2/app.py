"""
Disease Prediction System - Web Application Server
FastAPI Backend & Interactive Clinical AI UI
"""

import os
import json
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import DiseasePredictor

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
EVAL_RESULTS_PATH = os.path.join(BASE_DIR, "models", "evaluation_results.json")
SPLIT_META_PATH = os.path.join(BASE_DIR, "models", "train_test_split_meta.json")
SYMPTOM_LIST_PATH = os.path.join(BASE_DIR, "symptom_list.txt")

app = FastAPI(
    title="Clinical AI - Disease Prediction System",
    description="Standalone Random Forest Disease Classification & Differential Diagnosis API",
    version="1.0.0"
)

# Enable CORS for cross-origin browser requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Predictor
predictor = None
try:
    predictor = DiseasePredictor()
    print("[+] DiseasePredictor model loaded successfully.")
except Exception as e:
    print(f"[!] Warning initializing predictor: {e}")


class PredictionRequest(BaseModel):
    symptoms: list[str]
    top_k: int = 3


SYMPTOM_CATEGORIES = {
    "General & Constitutional": [
        "fever", "fatigue", "chills", "sweating", "recent weight loss", 
        "weight gain", "decreased appetite", "excessive appetite", "underweight"
    ],
    "Respiratory & ENT": [
        "cough", "coughing up sputum", "shortness of breath", "difficulty breathing",
        "breathing fast", "sore throat", "throat swelling", "nasal congestion",
        "sinus congestion", "painful sinuses", "loss of voice", "hoarse voice"
    ],
    "Cardiovascular & Chest": [
        "sharp chest pain", "burning chest pain", "chest tightness", 
        "congestion in chest", "palpitations", "increased heart rate", "irregular heartbeat"
    ],
    "Gastrointestinal & Abdominal": [
        "nausea", "vomiting", "vomiting blood", "diarrhea", "constipation",
        "lower abdominal pain", "upper abdominal pain", "sharp abdominal pain",
        "burning abdominal pain", "stomach bloating", "swollen abdomen",
        "difficulty in swallowing", "heartburn", "jaundice"
    ],
    "Neurological & Psychological": [
        "headache", "frontal headache", "dizziness", "confusion", 
        "anxiety and nervousness", "insomnia", "depression", "tremors",
        "seizures", "fainting", "numbness", "tingling sensation"
    ],
    "Musculoskeletal & Joints": [
        "joint pain", "joint swelling", "joint stiffness or tightness",
        "muscle pain", "muscle weakness", "muscle swelling", 
        "muscle cramps, contractures, or spasms", "back pain", "low back pain"
    ],
    "Dermatological & Skin": [
        "skin rash", "itching of skin", "skin lesion", "skin swelling",
        "abnormal appearing skin", "skin redness", "dry skin",
        "skin dryness, peeling, scaliness, or roughness", "skin growth"
    ],
    "Urological & Renal": [
        "painful urination", "frequent urination", "retention of urine",
        "involuntary urination", "blood in urine", "cloudy urine"
    ]
}

PRESET_TEST_CASES = [
    {
        "id": "flu",
        "name": "Influenza / Upper Respiratory Infection",
        "category": "Respiratory",
        "symptoms": ["fever", "cough", "fatigue", "headache", "chills", "sore throat"]
    },
    {
        "id": "gastro",
        "name": "Acute Gastroenteritis / Enteric Infection",
        "category": "Gastrointestinal",
        "symptoms": ["nausea", "vomiting", "diarrhea", "fever", "decreased appetite", "lower abdominal pain"]
    },
    {
        "id": "cardio",
        "name": "Acute Cardiopulmonary Distress",
        "category": "Cardiovascular",
        "symptoms": ["sharp chest pain", "shortness of breath", "sweating", "dizziness", "palpitations"]
    },
    {
        "id": "migraine",
        "name": "Migraine / Neurological Cephalea",
        "category": "Neurological",
        "symptoms": ["headache", "nausea", "dizziness", "facial pain", "fatigue"]
    },
    {
        "id": "arthritis",
        "name": "Inflammatory Polyarthritis / Rheumatology",
        "category": "Musculoskeletal",
        "symptoms": ["joint pain", "muscle pain", "joint swelling", "joint stiffness or tightness", "fatigue"]
    },
    {
        "id": "dermatitis",
        "name": "Allergic Dermatitis / Eczematous Flare",
        "category": "Dermatological",
        "symptoms": ["skin rash", "itching of skin", "skin lesion", "abnormal appearing skin", "skin swelling"]
    },
    {
        "id": "hepatic",
        "name": "Hepatic / Biliary Obstruction",
        "category": "Gastrointestinal",
        "symptoms": ["jaundice", "upper abdominal pain", "fatigue", "nausea", "decreased appetite", "fever"]
    },
    {
        "id": "cystitis",
        "name": "Acute Cystitis / Urinary Tract Infection",
        "category": "Urological",
        "symptoms": ["painful urination", "frequent urination", "fever", "lower abdominal pain", "back pain"]
    },
    {
        "id": "hyperthyroid",
        "name": "Hyperthyroidism / Hypermetabolic State",
        "category": "Endocrine",
        "symptoms": ["recent weight loss", "increased heart rate", "sweating", "fatigue", "frequent urination", "anxiety and nervousness"]
    },
    {
        "id": "sinusitis",
        "name": "Acute Rhinosinusitis / Sinus Infection",
        "category": "Respiratory",
        "symptoms": ["sinus congestion", "painful sinuses", "nasal congestion", "facial pain", "headache", "cough"]
    }
]


@app.get("/api/symptoms")
def get_symptoms():
    if not os.path.exists(SYMPTOM_LIST_PATH):
        raise HTTPException(status_code=404, detail="Symptom list not found")
    with open(SYMPTOM_LIST_PATH, "r", encoding="utf-8") as f:
        all_symptoms = [line.strip().lower() for line in f if line.strip()]
    return {
        "total_symptoms": len(all_symptoms),
        "symptoms": sorted(all_symptoms),
        "categories": SYMPTOM_CATEGORIES
    }


@app.get("/api/presets")
def get_presets():
    return {"presets": PRESET_TEST_CASES}


@app.get("/api/metrics")
def get_metrics():
    eval_data = {}
    split_data = {}
    if os.path.exists(EVAL_RESULTS_PATH):
        with open(EVAL_RESULTS_PATH, "r", encoding="utf-8") as f:
            eval_data = json.load(f)
    if os.path.exists(SPLIT_META_PATH):
        with open(SPLIT_META_PATH, "r", encoding="utf-8") as f:
            split_data = json.load(f)
    return {
        "evaluation": eval_data,
        "split_metadata": split_data
    }


@app.post("/api/predict")
def predict(request: PredictionRequest):
    global predictor
    if predictor is None:
        try:
            predictor = DiseasePredictor()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Model predictor failed to initialize: {str(e)}")
            
    result = predictor.predict_disease(request.symptoms, top_k=request.top_k)
    return result


# Mount static files
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/", response_class=FileResponse)
def read_root():
    return os.path.join(STATIC_DIR, "index.html")


if __name__ == "__main__":
    import sys
    port = 8000
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    print(f"\n=======================================================")
    print(f"  CLINICAL AI - DISEASE PREDICTION SYSTEM")
    print(f"  Server URL: http://localhost:{port}")
    print(f"=======================================================\n")
    uvicorn.run(app, host="127.0.0.1", port=port, reload=False)
