"""
Clinical AI - Streamlit Disease Prediction Dashboard
Standalone Interactive ML Interface
"""

import streamlit as st
import json
import os
from src.predict import DiseasePredictor

st.set_page_config(
    page_title="Clinical AI - Disease Prediction System",
    page_icon="🩺",
    layout="wide"
)

# Custom Styling
st.markdown("""
<style>
    .main-header {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        color: #6366f1;
    }
    .rank-card {
        background-color: rgba(99, 102, 241, 0.08);
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 12px;
        padding: 1.25rem;
        margin-bottom: 1rem;
    }
    .rank-1 {
        border-color: #f59e0b;
        background: rgba(245, 158, 11, 0.08);
    }
    .badge-rank {
        font-weight: 700;
        font-size: 1.1rem;
    }
    .disclaimer-box {
        background-color: rgba(244, 63, 94, 0.08);
        border: 1px solid rgba(244, 63, 94, 0.3);
        border-radius: 8px;
        padding: 0.85rem 1rem;
        color: #fda4af;
        margin-top: 2rem;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_predictor():
    return DiseasePredictor()

predictor = load_predictor()

# Header
st.title("🩺 Clinical AI - Disease Prediction System")
st.caption("Standalone Random Forest Multi-Class Disease Prediction Engine (413 Disease Classes | 377 Binary Symptoms)")

col_left, col_right = st.columns([1.1, 0.9], gap="large")

# Presets
PRESET_CASES = {
    "-- Manual Selection --": [],
    "1. Influenza / Upper Respiratory": ["fever", "cough", "fatigue", "headache", "chills", "sore throat"],
    "2. Acute Gastroenteritis": ["nausea", "vomiting", "diarrhea", "fever", "decreased appetite", "lower abdominal pain"],
    "3. Acute Cardiopulmonary Distress": ["sharp chest pain", "shortness of breath", "sweating", "dizziness", "palpitations"],
    "4. Migraine / Neurological Cephalea": ["headache", "nausea", "dizziness", "facial pain", "fatigue"],
    "5. Inflammatory Polyarthritis": ["joint pain", "muscle pain", "joint swelling", "joint stiffness or tightness", "fatigue"],
    "6. Allergic Dermatitis": ["skin rash", "itching of skin", "skin lesion", "abnormal appearing skin", "skin swelling"],
    "7. Hepatic / Biliary Obstruction": ["jaundice", "upper abdominal pain", "fatigue", "nausea", "decreased appetite", "fever"],
    "8. Acute Cystitis / UTI": ["painful urination", "frequent urination", "fever", "lower abdominal pain", "back pain"],
    "9. Hyperthyroidism": ["recent weight loss", "increased heart rate", "sweating", "fatigue", "frequent urination", "anxiety and nervousness"],
    "10. Acute Rhinosinusitis": ["sinus congestion", "painful sinuses", "nasal congestion", "facial pain", "headache", "cough"]
}

with col_left:
    st.subheader("1. Patient Symptoms Input")
    
    preset_choice = st.selectbox(
        "Load Clinical Test Case Preset:",
        options=list(PRESET_CASES.keys()),
        index=0
    )
    
    default_selected = PRESET_CASES[preset_choice] if preset_choice != "-- Manual Selection --" else []
    
    selected_symptoms = st.multiselect(
        "Search and select symptoms (from 377 clinical vocabulary):",
        options=predictor.symptom_list,
        default=default_selected
    )
    
    st.write(f"**Total Selected Symptoms:** `{len(selected_symptoms)}`")
    
    predict_btn = st.button("🚀 Analyze Symptoms & Predict Disease", type="primary", use_container_width=True)

with col_right:
    st.subheader("2. Differential Diagnosis Results")
    
    # Run prediction either on button click or if preset selected
    if predict_btn or (preset_choice != "-- Manual Selection --" and len(selected_symptoms) > 0):
        if len(selected_symptoms) == 0:
            st.warning("⚠️ Please select at least one symptom.")
        else:
            with st.spinner("Analyzing differential patterns via Random Forest..."):
                results = predictor.predict_disease(selected_symptoms, top_k=3)
                
            st.success(f"Evaluated {len(results['recognized_symptoms'])} clinical symptoms.")
            st.markdown(f"### {results['heading']}")
            
            for pred in results["top_predictions"]:
                rank = pred["rank"]
                disease = pred["disease"]
                conf = pred["confidence_percentage"]
                score = pred["confidence_score"]
                
                card_class = "rank-1" if rank == 1 else ""
                emoji = "🥇" if rank == 1 else ("🥈" if rank == 2 else "🥉")
                
                st.markdown(f"""
                <div class="rank-card {card_class}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="badge-rank">{emoji} #{rank} {disease}</span>
                        <span style="font-weight:700; color:#6366f1; font-size:1.1rem;">{conf}</span>
                    </div>
                </div>
                """, unsafe_allow_html=True)
                st.progress(float(score))
                
            st.markdown(f"""
            <div class="disclaimer-box">
                <strong>Medical Notice:</strong> {results['disclaimer']}
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("👈 Select symptoms on the left and click **Analyze Symptoms & Predict Disease**.")

# Model Performance Section
with st.expander("📊 Model Performance & Validation Metrics"):
    if os.path.exists("models/evaluation_results.json"):
        with open("models/evaluation_results.json") as f:
            eval_meta = json.load(f)
        c1, c2, c3, c4 = st.columns(4)
        c1.metric("Top-1 Accuracy", f"{eval_meta.get('accuracy_top1', 0)*100:.2f}%")
        c2.metric("Top-3 Accuracy", f"{eval_meta.get('accuracy_top3', 0)*100:.2f}%")
        c3.metric("Top-5 Accuracy", f"{eval_meta.get('accuracy_top5', 0)*100:.2f}%")
        c4.metric("Macro F1 (413 Classes)", f"{eval_meta.get('macro_f1', 0)*100:.2f}%")
