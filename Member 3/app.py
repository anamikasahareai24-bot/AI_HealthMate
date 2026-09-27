import streamlit as st
import pandas as pd
from src.predict_new_disease import predict_disease
from report_analyzer.report_analyzer import analyze_file
from chatbot.healthbot import get_healthbot_response

# ============================================================
# PAGE CONFIG
# ============================================================

st.set_page_config(
    page_title="AI HealthMate - AI/ML Testing",
    page_icon="🏥",
    layout="wide"
)


# ============================================================
# LOAD ALL SYMPTOMS
# ============================================================

DATA_PATH = "datasets/processed/train_new.csv"

df = pd.read_csv(DATA_PATH)

ALL_SYMPTOMS = [
    str(col)
    for col in df.columns
    if col != "disease"
]


# ============================================================
# COMMON SYMPTOMS
# ============================================================

# Exactly 10 common symptoms are shown as checkboxes.
common_symptoms_candidates = [
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

# Keep only symptoms that actually exist in the model dataset.
COMMON_SYMPTOMS = [
    symptom
    for symptom in common_symptoms_candidates
    if symptom in ALL_SYMPTOMS
]

# All model symptoms are available through the single
# Search & Select box. This also allows searching a common symptom
# such as fever, even though it is already available as a checkbox.
SEARCH_SYMPTOMS = ALL_SYMPTOMS


# ============================================================
# SESSION STATE
# ============================================================

if "selected_symptoms" not in st.session_state:
    st.session_state.selected_symptoms = []

if "page" not in st.session_state:
    st.session_state.page = "Disease Prediction"


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
    if st.button(
        "🩺 Disease Prediction",
        use_container_width=True
    ):
        st.session_state.page = "Disease Prediction"

with col2:
    if st.button(
        "📄 Report Analyzer",
        use_container_width=True
    ):
        st.session_state.page = "Report Analyzer"

with col3:
    if st.button(
        "💬 AI Chatbot",
        use_container_width=True
    ):
        st.session_state.page = "AI Chatbot"


st.divider()


# ============================================================
# DISEASE PREDICTION
# ============================================================

if st.session_state.page == "Disease Prediction":

    st.header("🩺 Disease Prediction")

    st.write(
        "Select common symptoms below or search for other symptoms."
    )

    st.info(
        "Select symptoms using the checkboxes or search for any other symptom in the single search box."
    )

    # ========================================================
    # COMMON SYMPTOMS
    # ========================================================

    st.subheader("Common Symptoms")

    col1, col2 = st.columns(2)

    for i, symptom in enumerate(COMMON_SYMPTOMS):

        display_name = symptom.replace("_", " ").title()

        if i % 2 == 0:
            with col1:
                checked = st.checkbox(
                    display_name,
                    value=symptom in st.session_state.selected_symptoms,
                    key=f"common_{symptom}"
                )

                if checked and symptom not in st.session_state.selected_symptoms:
                    st.session_state.selected_symptoms.append(symptom)

                elif not checked and symptom in st.session_state.selected_symptoms:
                    st.session_state.selected_symptoms.remove(symptom)

        else:
            with col2:
                checked = st.checkbox(
                    display_name,
                    value=symptom in st.session_state.selected_symptoms,
                    key=f"common_{symptom}"
                )

                if checked and symptom not in st.session_state.selected_symptoms:
                    st.session_state.selected_symptoms.append(symptom)

                elif not checked and symptom in st.session_state.selected_symptoms:
                    st.session_state.selected_symptoms.remove(symptom)

    st.divider()

    # ========================================================
    # SINGLE SEARCH & SELECT BOX
    # ========================================================

    st.subheader("Other Symptoms")

    st.write("Search and select any additional symptom:")

    search_options = [""] + SEARCH_SYMPTOMS

    selected_from_search = st.selectbox(
        "🔍 Search & Select Symptoms",
        options=search_options,
        index=0,
        format_func=lambda x: (
            "Type to search symptoms..."
            if x == ""
            else x.replace("_", " ").title()
        ),
        key="symptom_search_select"
    )

    # Add selected symptom to the final list.
    if selected_from_search and selected_from_search not in st.session_state.selected_symptoms:
        st.session_state.selected_symptoms.append(selected_from_search)

    # ========================================================
    # SELECTED SYMPTOMS
    # ========================================================

    st.subheader("Selected Symptoms")

    if st.session_state.selected_symptoms:

        for symptom in list(st.session_state.selected_symptoms):

            display_name = symptom.replace("_", " ").title()

            col1, col2 = st.columns([8, 1])

            with col1:
                st.write(f"☑️ {display_name}")

            with col2:
                if st.button(
                    "✕",
                    key=f"remove_symptom_{symptom}"
                ):
                    st.session_state.selected_symptoms.remove(symptom)
                    st.rerun()

    else:
        st.caption("No symptoms selected yet.")

    st.write("")


# ========================================================
    # PREDICT BUTTON
    # ========================================================

    if st.button(
        "🔍 Predict Disease",
        type="primary",
        use_container_width=True
    ):

        selected_symptoms = st.session_state.selected_symptoms


        if len(selected_symptoms) < 2:

            st.warning(
                "Please select at least 2 symptoms."
            )

        else:

            with st.spinner("Analyzing symptoms..."):

                try:

                    result = predict_disease(
                        selected_symptoms
                    )

                    status = result.get(
                        "status",
                        "unknown"
                    )

                    message = result.get(
                        "message",
                        ""
                    )

                    predictions = result.get(
                        "predictions",
                        []
                    )


                    # ========================================
                    # STATUS MESSAGE
                    # ========================================

                    if status == "low_confidence":

                        st.warning(message)

                    elif status == "success":

                        st.success(message)

                    else:

                        st.info(message)


                    # ========================================
                    # RESULTS
                    # ========================================

                    if predictions:

                        st.subheader(
                            "Possible Conditions"
                        )


                        for i, prediction in enumerate(
                            predictions,
                            start=1
                        ):

                            disease = prediction.get(
                                "disease",
                                "Unknown"
                            )

                            confidence = float(
                                prediction.get(
                                    "confidence",
                                    0
                                )
                            )

                            specialist = prediction.get(
                                "recommended_specialist",
                                "General Physician"
                            )


                            st.markdown(
                                f"### {i}. {disease}"
                            )


                            result_col1, result_col2 = st.columns(2)


                            with result_col1:

                                st.metric(
                                    "Model Score",
                                    f"{confidence:.2f}%"
                                )


                            with result_col2:

                                st.write(
                                    "**Recommended Specialist**"
                                )

                                st.info(
                                    specialist
                                )


                            st.divider()


                    else:

                        st.warning(
                            "No prediction available."
                        )


                except Exception as e:

                    st.error(
                        "An error occurred while making "
                        "the prediction."
                    )

                    st.exception(e)


    # ========================================================
    # DISCLAIMER
    # ========================================================

    st.caption(
        "⚠️ This is an AI/ML project prototype. "
        "The predictions are possible conditions based on "
        "selected symptoms and are not a medical diagnosis."
    )





# ============================================================
# REPORT ANALYZER
# ============================================================

elif st.session_state.page == "Report Analyzer":

    st.header("📄 AI Medical Report Analyzer")

    st.write(
        "Upload a medical report in PDF or image format for analysis."
    )

    # --------------------------------------------------------
    # EXPLANATION LANGUAGE
    # --------------------------------------------------------

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

        # ----------------------------------------------------
        # PREVIEW IMAGE
        # ----------------------------------------------------

        if file_type.startswith("image"):

            st.subheader("📷 Report Preview")

            st.image(
                uploaded_file,
                caption=uploaded_file.name,
                use_container_width=True
            )

        # ----------------------------------------------------
        # PDF INFORMATION
        # ----------------------------------------------------

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

                with st.spinner(
                    "Analyzing medical report..."
                ):

                    report = analyze_file(
                        temp_file_path,
                        language=explanation_language
                    )

                st.success(
                    "✅ Report analyzed successfully!"
                )

                # --------------------------------------------
                # EXTRACTED PARAMETERS
                # --------------------------------------------

                st.subheader(
                    "🧪 Extracted Parameters"
                )

                parameters = report["parameters"]

                if parameters:

                    for parameter, value in parameters.items():

                        st.write(
                            f"**{parameter}:** {value}"
                        )

                else:

                    st.warning(
                        "No recognized medical parameters "
                        "were found in the report."
                    )

                st.divider()

                # --------------------------------------------
                # REPORT ANALYSIS
                # --------------------------------------------

                st.subheader(
                    "📊 Report Analysis"
                )

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
                            f"{data['value']} → "
                            f"{status}"
                        )

                st.divider()

                # --------------------------------------------
                # PARAMETER EXPLANATIONS
                # --------------------------------------------

                st.subheader(
                    "💡 What Do These Parameters Mean?"
                )

                explanations = report.get(
                    "explanations",
                    {}
                )

                if explanations:

                    for parameter, explanation in explanations.items():

                        with st.expander(
                            f"🔹 What is {parameter}?"
                        ):

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
# AI CHATBOT
# ============================================================

elif st.session_state.page == "AI Chatbot":

    st.header("💬 AI Healthcare Chatbot")

    st.write(
        "Ask a healthcare-related question."
    )

    # Conversation memory
    if "chat_messages" not in st.session_state:
        st.session_state.chat_messages = []

    # Display previous messages
    for message in st.session_state.chat_messages:

        with st.chat_message(message["role"]):
            st.write(message["content"])

    question = st.chat_input(
        "Ask your health question..."
    )

    if question:

        # Show user message
        st.session_state.chat_messages.append({
            "role": "user",
            "content": question
        })

        with st.chat_message("user"):
            st.write(question)

        try:

            # Convert history for chatbot
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

            # Save AI response
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