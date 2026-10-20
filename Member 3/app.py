
import streamlit as st
import pandas as pd
import sys
from pathlib import Path

from report_analyzer.report_analyzer import analyze_file
from chatbot.healthbot import get_healthbot_response

# ============================================================
# PATH SETUP
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DISEASE2_DIR = BASE_DIR / "disease2"
DISEASE2_SRC = DISEASE2_DIR / "src"

if str(DISEASE2_SRC) not in sys.path:
    sys.path.insert(0, str(DISEASE2_SRC))

if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from predict import DiseasePredictor
from src.specialist_recommendation import get_specialist_recommendation


# ============================================================
# PAGE CONFIG
# ============================================================

st.set_page_config(
    page_title="AI HealthMate - AI/ML Testing",
    page_icon="🏥",
    layout="wide"
)


# ============================================================
# LOAD DISEASE2 MODEL
# ============================================================

@st.cache_resource
def load_predictor():
    return DiseasePredictor()


try:
    predictor = load_predictor()
except Exception as e:
    predictor = None
    st.error(f"Unable to load disease prediction model: {e}")


# ============================================================
# SYMPTOMS FROM NEW MODEL
# ============================================================

ALL_SYMPTOMS = predictor.symptom_list if predictor else []

common_symptom_names = [
    "fever",
    "cough",
    "nausea",
    "dizziness",
    "skin_rash",
    "back_pain",
    "headache",
    "fatigue",
    "vomiting",
    "joint_pain"
]

# Match symptom names regardless of spaces/underscores/case.
def normalize_symptom(symptom):
    return str(symptom).strip().lower().replace(" ", "_")


symptom_lookup = {
    normalize_symptom(symptom): symptom
    for symptom in ALL_SYMPTOMS
}

COMMON_SYMPTOMS = [
    symptom_lookup[normalize_symptom(symptom)]
    for symptom in common_symptom_names
    if normalize_symptom(symptom) in symptom_lookup
]


# ============================================================
# SESSION STATE
# ============================================================

if "selected_symptoms" not in st.session_state:
    st.session_state.selected_symptoms = []

if "page" not in st.session_state:
    st.session_state.page = "Disease Prediction"

if "chat_messages" not in st.session_state:
    st.session_state.chat_messages = []


# ============================================================
# HEADER
# ============================================================

st.title("🏥 AI HealthMate")
st.subheader("AI/ML Testing Interface")

st.write(
    "Temporary local interface for testing Member 3's AI/ML features."
)

st.divider()


# ============================================================
# NAVIGATION
# ============================================================

col1, col2, col3 = st.columns(3)

with col1:
    if st.button("🩺 Disease Prediction", use_container_width=True):
        st.session_state.page = "Disease Prediction"

with col2:
    if st.button("📄 Report Analyzer", use_container_width=True):
        st.session_state.page = "Report Analyzer"

with col3:
    if st.button("💬 AI Chatbot", use_container_width=True):
        st.session_state.page = "AI Chatbot"

st.divider()


# ============================================================
# DISEASE PREDICTION - NEW DISEASE2 MODEL
# ============================================================

if st.session_state.page == "Disease Prediction":

    st.header("🩺 Disease Prediction")
    st.caption("Antigravity Disease Prediction Model")

    if predictor is None:
        st.error(
            "Disease prediction model is unavailable. "
            "Check the disease2 model files and paths."
        )
        st.stop()

    st.write(
        "Select common symptoms below or search for other symptoms."
    )

    # --------------------------------------------------------
    # COMMON SYMPTOMS
    # --------------------------------------------------------

    st.subheader("Common Symptoms")
    cols = st.columns(2)

    for i, symptom in enumerate(COMMON_SYMPTOMS):
        with cols[i % 2]:
            checked = st.checkbox(
                symptom.replace("_", " ").title(),
                value=symptom in st.session_state.selected_symptoms,
                key=f"disease2_common_{symptom}"
            )

            if (
                checked
                and symptom not in st.session_state.selected_symptoms
            ):
                st.session_state.selected_symptoms.append(symptom)

            elif (
                not checked
                and symptom in st.session_state.selected_symptoms
            ):
                st.session_state.selected_symptoms.remove(symptom)

    st.divider()

    # --------------------------------------------------------
    # SEARCH & SELECT SYMPTOMS
    # --------------------------------------------------------

    st.subheader("Search & Select Symptoms")

    
    
    selected_from_search = st.multiselect(
        "Search symptoms",
        options=ALL_SYMPTOMS,
        format_func=lambda x: x.replace("_", " ").title(),
        key="disease2_search_symptoms"
    )

    common_selected = [
        symptom for symptom in COMMON_SYMPTOMS
        if st.session_state.get(f"disease2_common_{symptom}", False)
    ]

    st.session_state.selected_symptoms = list(dict.fromkeys(
        common_selected + selected_from_search
    ))


   
    
    # --------------------------------------------------------
    # REMOVE SYMPTOM CALLBACK
    # --------------------------------------------------------

    def remove_symptom(symptom):
        if symptom in st.session_state.selected_symptoms:
            st.session_state.selected_symptoms.remove(symptom)

        common_key = f"disease2_common_{symptom}"
        if common_key in st.session_state:
            st.session_state[common_key] = False

        search_key = "disease2_search_symptoms"
        if search_key in st.session_state:
            st.session_state[search_key] = [
                s for s in st.session_state[search_key]
                if s != symptom
            ]


    # --------------------------------------------------------
    # SELECTED SYMPTOMS
    # --------------------------------------------------------

    st.subheader("Selected Symptoms")

    selected = st.session_state.selected_symptoms.copy()

    if selected:
        for symptom in selected:
            display_name = symptom.replace("_", " ").title()

            col1, col2 = st.columns([8, 1])

            with col1:
                st.write(f"☑️ {display_name}")

            with col2:
                st.button(
                    "✕",
                    key=f"remove_symptom_{symptom}",
                    on_click=remove_symptom,
                    args=(symptom,)
                )
    else:
        st.info("No symptoms selected yet.")



    # --------------------------------------------------------
    # PREDICT
    # --------------------------------------------------------

    if st.button(
        "🔍 Predict Disease",
        type="primary",
        use_container_width=True
    ):

        selected = st.session_state.selected_symptoms

        if len(selected) < 4:
            st.warning(
                f"Please select at least 4 symptoms. "
                f"You have selected {len(selected)}."
            )

        else:
            with st.spinner("Analyzing symptoms..."):

                try:
                    result = predictor.predict_disease(
                        selected,
                        top_k=3
                    )

                    if result.get("status") != "success":
                        st.error(
                            result.get(
                                "message",
                                result.get(
                                    "disclaimer",
                                    "Prediction failed."
                                )
                            )
                        )

                    else:
                        predictions = result.get(
                            "top_predictions",
                            []
                        )

                        st.subheader("Top 3 Predictions")

                        if predictions:
                            for i, prediction in enumerate(
                                predictions[:3],
                                start=1
                            ):
                                disease = prediction.get(
                                    "disease",
                                    "Unknown"
                                )

                                # Use raw_probability when available.
                                raw_score = prediction.get(
                                    "raw_probability"
                                )

                                if raw_score is not None:
                                    score = float(raw_score) * 100
                                else:
                                    score = float(
                                        prediction.get(
                                            "model_confidence",
                                            prediction.get("confidence", 0)
                                        )
                                    )

                                try:
                                    recommendation = (
                                        get_specialist_recommendation(
                                            disease
                                        )
                                    )
                                    specialist = recommendation.get(
                                        "recommended_specialist",
                                        "Consult a General Physician"
                                    )
                                except Exception:
                                    specialist = (
                                        "Consult a General Physician"
                                    )

                                st.markdown(f"### {i}. {disease}")

                                st.progress(
                                    min(max(score / 100, 0.0), 1.0)
                                )

                                st.write(
                                    f"**Model Score:** {score:.2f}%"
                                )

                                st.write("**Recommended Specialist**")
                                st.info(specialist)

                                st.divider()

                        else:
                            st.warning("No prediction available.")

                        unrecognized = result.get(
                            "unrecognized_symptoms",
                            []
                        )

                        if unrecognized:
                            st.warning(
                                "Some symptoms were not recognized: "
                                + ", ".join(unrecognized)
                            )

                except Exception as e:
                    st.error(f"Prediction failed: {e}")

    st.caption(
        "⚠️ This is an AI/ML project prototype. Model scores are "
        "not confirmed diagnoses or validated probabilities of "
        "having a disease. Consult a qualified healthcare professional "
        "for medical advice."
    )


# ============================================================
# REPORT ANALYZER - EXISTING CODE PRESERVED
# ============================================================

elif st.session_state.page == "Report Analyzer":

    st.header("📄 AI Medical Report Analyzer")

    st.write(
        "Upload a medical report in PDF or image format for analysis."
    )

    explanation_language = st.selectbox(
        "🌐 Explanation Language",
        ["English", "Hindi", "Hinglish"],
        help="Choose the language in which medical parameters will be explained."
    )

    uploaded_file = st.file_uploader(
        "Upload Medical Report",
        type=["pdf", "png", "jpg", "jpeg"],
        help="Supported formats: PDF, PNG, JPG, JPEG"
    )

    if uploaded_file:

        st.success(f"File selected: {uploaded_file.name}")

        file_type = uploaded_file.type
        file_size = uploaded_file.size / 1024

        col1, col2 = st.columns(2)

        with col1:
            st.write("**File Type:**")
            st.write(file_type)

        with col2:
            st.write("**File Size:**")
            st.write(f"{file_size:.2f} KB")

        st.divider()

        if file_type.startswith("image"):

            st.subheader("📷 Report Preview")

            st.image(
                uploaded_file,
                caption=uploaded_file.name,
                use_container_width=True
            )

        elif file_type == "application/pdf":

            st.subheader("📑 PDF Report")

            st.info(
                "PDF uploaded successfully. "
                "Click Analyze Report to process it."
            )

        st.divider()

        if st.button(
            "🔍 Analyze Report",
            type="primary",
            use_container_width=True
        ):

            temp_file_path = (
                "temp_uploaded_report"
                + uploaded_file.name[
                    uploaded_file.name.rfind("."):
                ]
            )

            try:

                with open(temp_file_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())

                with st.spinner("Analyzing medical report..."):

                    report = analyze_file(
                        temp_file_path,
                        language=explanation_language
                    )

                st.success("✅ Report analyzed successfully!")

                st.subheader("🧪 Extracted Parameters")

                parameters = report["parameters"]

                if parameters:
                    for parameter, value in parameters.items():
                        st.write(f"**{parameter}:** {value}")
                else:
                    st.warning(
                        "No recognized medical parameters "
                        "were found in the report."
                    )

                st.divider()

                st.subheader("📊 Report Analysis")

                results = report["results"]

                for parameter, data in results.items():

                    status = data["status"]

                    if status == "Normal":
                        st.success(
                            f"🟢 {parameter}: "
                            f"{data['value']} → Normal"
                        )

                    elif status == "High":
                        st.warning(
                            f"🟠 {parameter}: "
                            f"{data['value']} → High"
                        )

                    elif status == "Low":
                        st.error(
                            f"🔴 {parameter}: "
                            f"{data['value']} → Low"
                        )

                    else:
                        st.info(
                            f"🔵 {parameter}: "
                            f"{data['value']} → {status}"
                        )

                st.divider()

                st.subheader("💡 What Do These Parameters Mean?")

                explanations = report.get("explanations", {})

                if explanations:
                    for parameter, explanation in explanations.items():
                        with st.expander(f"🔹 What is {parameter}?"):
                            st.write(explanation)
                else:
                    st.info(
                        "No parameter explanations are available."
                    )

                st.info(
                    "ℹ️ This analysis compares extracted values "
                    "with the reference ranges stated in the uploaded "
                    "report. Parameter explanations are for educational "
                    "purposes only and are not a medical diagnosis."
                )

            except Exception as e:
                st.error(
                    "❌ An error occurred while analyzing the report."
                )
                st.exception(e)

    else:
        st.info(
            "📤 Please upload a medical report in PDF or image format."
        )


# ============================================================
# AI CHATBOT - EXISTING CODE PRESERVED
# ============================================================

elif st.session_state.page == "AI Chatbot":

    st.header("💬 AI Healthcare Chatbot")

    st.write("Ask a healthcare-related question.")

    # Display previous messages
    for message in st.session_state.chat_messages:
        with st.chat_message(message["role"]):
            st.write(message["content"])

    question = st.chat_input("Ask your health question...")

    if question:

        st.session_state.chat_messages.append({
            "role": "user",
            "content": question
        })

        with st.chat_message("user"):
            st.write(question)

        try:

            conversation_history = [
                {
                    "role": message["role"],
                    "content": message["content"]
                }
                for message in st.session_state.chat_messages[:-1]
            ]

            with st.chat_message("assistant"):

                with st.spinner("Thinking..."):

                    answer = get_healthbot_response(
                        question,
                        conversation_history
                    )

                    st.write(answer)

            st.session_state.chat_messages.append({
                "role": "assistant",
                "content": answer
            })

        except Exception as e:

            st.error(
                "Unable to connect to AI HealthMate right now."
            )

            st.exception(e)

    st.caption(
        "⚠️ AI HealthMate provides general health information "
        "and is not a substitute for professional medical advice."
    )
