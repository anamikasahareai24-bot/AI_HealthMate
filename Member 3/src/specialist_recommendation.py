from src.specialist_mapping import recommend_specialist


def get_specialist_recommendation(predicted_disease):
    specialist = recommend_specialist(predicted_disease)

    return {
        "disease": predicted_disease,
        "recommended_specialist": specialist
    }