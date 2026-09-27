from src.specialist_recommendation import get_specialist_recommendation
import joblib
from src.symptom_processor import prepare_input


MODEL_PATH = "models/disease_prediction_model_new.pkl"
ENCODER_PATH = "models/disease_label_encoder_new.pkl"


# Load trained model and label encoder
model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)


def predict_disease(selected_symptoms, top_k=3):

    # Minimum symptom requirement
    if len(selected_symptoms) < 2:
        return {
            "status": "insufficient_symptoms",
            "message": "Please select at least 2 symptoms.",
            "predictions": []
        }

    # Convert symptoms to model input
    input_data, valid_symptoms = prepare_input(selected_symptoms)

    # Check valid symptoms
    if len(valid_symptoms) < 2:
        return {
            "status": "insufficient_symptoms",
            "message": "Please select at least 2 valid symptoms.",
            "predictions": []
        }

    # Get probabilities from Random Forest
    probabilities = model.predict_proba(input_data)[0]

    # Get Top-K predictions
    top_indices = probabilities.argsort()[-top_k:][::-1]

    predictions = []

    for index in top_indices:

        # Convert encoded label back to disease name
        disease = encoder.inverse_transform([index])[0]

        # Calculate confidence
        confidence = probabilities[index] * 100

        # Get specialist based on predicted disease
        specialist = get_specialist_recommendation(disease)

        predictions.append({
            "disease": disease,
            "confidence": round(confidence, 2),
            "recommended_specialist": specialist["recommended_specialist"]
        })

    # Confidence check
    highest_confidence = predictions[0]["confidence"]

    if highest_confidence < 5:
        status = "low_confidence"
        message = (
            "Prediction confidence is low. "
            "Please select more symptoms or consult a healthcare professional."
        )
    else:
        status = "success"
        message = "Possible conditions based on the selected symptoms."

    return {
        "status": status,
        "message": message,
        "predictions": predictions
    }