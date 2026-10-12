"""
Disease Prediction Module
One-vs-Rest Logistic Regression
Independent disease probability scores
"""

import os
import difflib
import joblib
import numpy as np


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR, "models", "disease_prediction_model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR, "models", "label_encoder.pkl"
)

PROFILES_PATH = os.path.join(
    BASE_DIR, "models", "disease_symptom_profiles.pkl"
)

SYMPTOM_LIST_PATH = os.path.join(
    BASE_DIR, "symptom_list.txt"
)


class DiseasePredictor:

    def __init__(
        self,
        model_path=MODEL_PATH,
        encoder_path=ENCODER_PATH,
        profiles_path=PROFILES_PATH,
        symptom_list_path=SYMPTOM_LIST_PATH
    ):

        for path in (
            model_path,
            encoder_path,
            symptom_list_path
        ):
            if not os.path.exists(path):
                raise FileNotFoundError(
                    f"Required file not found: {path}"
                )

        self.model = joblib.load(model_path)
        self.label_encoder = joblib.load(encoder_path)

        with open(
            symptom_list_path, "r", encoding="utf-8"
        ) as file:
            self.symptom_list = [
                line.strip().lower()
                for line in file
                if line.strip()
            ]

        # Normalize symptom names for matching.
        self.symptom_to_idx = {
            symptom.replace("_", " "): i
            for i, symptom in enumerate(self.symptom_list)
        }

        self.classes_ = self.label_encoder.classes_

        self.profiles = (
            joblib.load(profiles_path)
            if os.path.exists(profiles_path)
            else None
        )

        # Ensure this is the newly trained One-vs-Rest model.
        if not hasattr(self.model, "estimators_"):
            raise TypeError(
                "Incompatible model. Run the new train_model.py first."
            )

        if len(self.model.estimators_) != len(self.classes_):
            raise ValueError(
                "Model and label encoder classes do not match."
            )

    # --------------------------------------------------
    # SYMPTOM VALIDATION
    # --------------------------------------------------

    def validate_and_map_symptoms(self, input_symptoms):

        valid = []
        unknown = []

        known_symptoms = list(self.symptom_to_idx.keys())

        for item in input_symptoms:

            cleaned = (
                str(item)
                .strip()
                .lower()
                .replace("_", " ")
            )

            if cleaned in self.symptom_to_idx:
                valid.append(cleaned)
            else:
                matches = difflib.get_close_matches(
                    cleaned,
                    known_symptoms,
                    n=1,
                    cutoff=0.75
                )

                if matches:
                    valid.append(matches[0])
                else:
                    unknown.append(item)

        return list(dict.fromkeys(valid)), unknown

    # --------------------------------------------------
    # INDEPENDENT PROBABILITY SCORES
    # --------------------------------------------------

    def get_independent_probabilities(self, feature_vector):

        scores = []

        # Each estimator predicts one disease vs all others.
        for estimator in self.model.estimators_:

            probabilities = estimator.predict_proba(
                feature_vector
            )[0]

            positive_index = np.flatnonzero(
                estimator.classes_ == 1
            )

            if len(positive_index) == 0:
                scores.append(0.0)
            else:
                scores.append(
                    float(probabilities[positive_index[0]])
                )

        return np.asarray(scores, dtype=float)

    # --------------------------------------------------
    # PREDICT DISEASE
    # --------------------------------------------------

    def predict_disease(self, selected_symptoms, top_k=3):

        if not selected_symptoms:
            return {
                "status": "error",
                "message": "Please select at least one symptom."
            }

        valid, unknown = self.validate_and_map_symptoms(
            selected_symptoms
        )

        if not valid:
            return {
                "status": "error",
                "message": "No recognized symptoms found.",
                "unrecognized_symptoms": unknown
            }

        # Build input vector.
        feature_vector = np.zeros(
            (1, len(self.symptom_list)),
            dtype=np.float32
        )

        active_indices = []

        for symptom in valid:
            idx = self.symptom_to_idx[symptom]
            feature_vector[0, idx] = 1
            active_indices.append(idx)

        # Independent scores, not normalized across diseases.
        probabilities = self.get_independent_probabilities(
            feature_vector
        )

        # Rank diseases by their own model scores.
        top_indices = np.argsort(probabilities)[::-1][
            :max(1, min(top_k, len(probabilities)))
        ]

        predictions = []

        for rank, idx in enumerate(top_indices, start=1):

            score = float(probabilities[idx])

            symptom_match = 0.0

            if (
                self.profiles is not None
                and idx < len(self.profiles)
            ):
                symptom_match = float(
                    np.mean(self.profiles[idx, active_indices])
                )

            percentage = round(score * 100, 2)

            predictions.append({
                "rank": rank,
                "disease": str(self.classes_[idx]).title(),

                # Independent model probability score
                "model_confidence": percentage,
                "model_confidence_percentage": f"{percentage:.2f}%",

                # Compatibility with existing UI/code
                "confidence": percentage,
                "confidence_percentage": f"{percentage:.2f}%",

                "raw_probability": round(score, 6),
                "symptom_match": round(symptom_match, 4)
            })

        return {
            "status": "success",
            "selected_symptoms_input": selected_symptoms,
            "recognized_symptoms": valid,
            "unrecognized_symptoms": unknown,
            "top_predictions": predictions,
            "heading": "Top possible diseases based on independent model scores.",
            "disclaimer": (
                "AI-generated estimates only, not a confirmed diagnosis. "
                "Scores are model outputs and may not be calibrated "
                "medical probabilities."
            )
        }


# --------------------------------------------------
# FORMAT RESULT
# --------------------------------------------------

def format_prediction_result(result):

    if result.get("status") == "error":
        return f"[ERROR] {result.get('message')}"

    lines = ["Selected Symptoms:"]

    lines.extend(
        f"  - {symptom}"
        for symptom in result["recognized_symptoms"]
    )

    lines.append(f"\n{result['heading']}")

    for prediction in result["top_predictions"]:
        lines.append(
            f"{prediction['rank']}. "
            f"{prediction['disease']} "
            f"(Independent Model Score: "
            f"{prediction['model_confidence_percentage']})"
        )

    lines.append(f"\nDisclaimer: {result['disclaimer']}")

    return "\n".join(lines)