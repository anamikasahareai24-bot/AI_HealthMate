from report_analyzer.text_extractor import extract_text_from_pdf
from report_analyzer.ocr_engine import extract_text_from_image
from report_analyzer.report_extractor import extract_parameters
from report_analyzer.report_analysis import analyze_report
from report_analyzer.parameter_explainer import get_parameter_explanation


def analyze_file(file_path, language="English"):
    """
    Complete medical report analysis pipeline.

    PDF/Image
        ↓
    Text extraction / OCR
        ↓
    Parameter extraction
        ↓
    Reference-range analysis
        ↓
    Parameter explanation
    """

    if file_path.lower().endswith(".pdf"):

        text = extract_text_from_pdf(file_path)

    elif file_path.lower().endswith(
        (".png", ".jpg", ".jpeg", ".webp")
    ):

        text = extract_text_from_image(file_path)

    else:
        raise ValueError(
            "Unsupported file format. "
            "Use PDF, PNG, JPG, JPEG or WEBP."
        )

    # Extract medical parameters
    parameters = extract_parameters(text)

    # Analyze extracted values
    results = analyze_report(text, parameters)

    # Add explanation for every extracted parameter
    explanations = {}

    for parameter in parameters:

        explanations[parameter] = get_parameter_explanation(
            parameter,
            language
        )

    return {
        "text": text,
        "parameters": parameters,
        "results": results,
        "explanations": explanations
    }


if __name__ == "__main__":

    file_path = input("Enter report file path: ")

    try:

        report = analyze_file(file_path)

        print("\n========== EXTRACTED PARAMETERS ==========\n")

        for parameter, value in report["parameters"].items():
            print(f"{parameter}: {value}")

        print("\n========== REPORT ANALYSIS ==========\n")

        for parameter, data in report["results"].items():

            print(
                f"{parameter}: "
                f"{data['value']} -> {data['status']}"
            )

        print("\n========== PARAMETER EXPLANATIONS ==========\n")

        for parameter, explanation in report["explanations"].items():

            print(f"{parameter}:")
            print(explanation)
            print()

    except Exception as e:

        print("\nError:", e)