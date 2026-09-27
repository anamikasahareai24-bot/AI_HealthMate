import pandas as pd

DATA_PATH = "datasets/processed/train_new.csv"


def get_symptom_list():
    """Return all symptoms known by the trained model."""
    df = pd.read_csv(DATA_PATH)
    return [col for col in df.columns if col != "disease"]


def prepare_input(selected_symptoms):
    """
    Convert selected symptoms into the 0/1 format
    expected by the ML model.
    """

    symptoms = get_symptom_list()

    # Create all-zero input
    input_data = pd.DataFrame(
        0,
        index=[0],
        columns=symptoms
    )

    # Activate selected symptoms
    valid_symptoms = []

    for symptom in selected_symptoms:
        if symptom in symptoms:
            input_data.loc[0, symptom] = 1
            valid_symptoms.append(symptom)

    return input_data, valid_symptoms


# if __name__ == "__main__":

#     # Example selected by user
#     selected = [
#         "fever",
#         "skin_rash",
#         "itching_of_skin"
#     ]

    # input_data, valid = prepare_input(selected)

    # print("Selected symptoms:", valid)
    # print("Number of active symptoms:", len(valid))
    # print("Input shape:", input_data.shape)