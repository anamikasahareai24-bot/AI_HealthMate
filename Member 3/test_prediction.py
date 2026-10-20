from src.predict_new_disease import model
from src.symptom_processor import prepare_input

test_cases = [
    ["fever", "cough", "feeling_cold"],
    ["skin_rash", "itching_of_skin", "fever"],
    ["headache", "nausea", "vomiting"]
]

for selected in test_cases:

    X, valid = prepare_input(selected)

    active_features = X.columns[X.iloc[0] == 1].tolist()

    print("\n================================")
    print("Input:", valid)
    print("Active features:", active_features)
    print("Number of active features:", X.iloc[0].sum())

    probabilities = model.predict_proba(X)[0]

    print("Probability sum:", probabilities.sum())
    print("Number of non-zero probabilities:", (probabilities > 0).sum())
    print("Maximum probability:", probabilities.max())