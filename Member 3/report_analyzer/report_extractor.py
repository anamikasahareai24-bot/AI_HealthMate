import re


# Common medical parameter names and their variations
PARAMETER_ALIASES = {
    "Hemoglobin": [
        "hemoglobin", "haemoglobin", "hb"
    ],
    "WBC": [
        "total wbc count", "wbc count", "total leukocyte count",
        "white blood cell count", "wbc"
    ],
    "RBC": [
        "rbc count", "red blood cell count", "rbc"
    ],
    "Platelets": [
        "platelet count", "platelets", "platelet"
    ],
    "Hematocrit": [
        "hematocrit", "haematocrit", "pcv"
    ],
    "MCV": ["mcv"],
    "MCH": ["mch"],
    "MCHC": ["mchc"],
    "RDW": ["rdw", "rdw-cv"],
    "Fasting Blood Glucose": [
        "fasting blood glucose", "fasting glucose",
        "fasting blood sugar", "fbs"
    ],
    "Random Blood Glucose": [
        "random blood glucose", "random glucose",
        "random blood sugar", "rbs"
    ],
    "HbA1c": [
        "hba1c", "hbaic", "glycated hemoglobin",
        "glycosylated hemoglobin"
    ],
    "Total Cholesterol": [
    "total cholesterol", "cholesterol"
    ],
    "Triglycerides": [
        "triglycerides", "triglyceride"
    ],
    "HDL": [
    "hdl cholesterol", "hdl"
    ],
    "LDL": [
    "ldl cholesterol", "ldl"
    ],
    "TSH": [
    "tsh", "thyroid stimulating hormone"
    ],
    "T3": [
        "t3", "triiodothyronine"
    ],
    "T4": [
        "t4", "thyroxine"
    ],
    "ALT": [
        "alt", "sgpt", "alanine aminotransferase"
    ],
    "AST": [
        "ast", "sgot", "aspartate aminotransferase"
    ],
    "ALP": [
        "alp", "alkaline phosphatase"
    ],
    "Bilirubin": [
        "total bilirubin", "bilirubin"
    ],

    "Creatinine": [
        "serum creatinine", "creatinine"
    ],
    "Urea": [
        "blood urea", "serum urea", "urea"
    ],
    "Vitamin D": [
        "vitamin d", "25-oh vitamin d", "25 hydroxy vitamin d"
    ],
    "Vitamin B12": [
        "vitamin b12", "b12", "cobalamin"
    ]
}


def normalize_text(text):
    """Clean OCR/PDF text while preserving useful information."""

    text = text.replace("\r", "\n")

    # Fix common OCR character problems
    replacements = {
        "HbAIc": "HbA1c",
        "HbAlc": "HbA1c",
        "HBAIc": "HbA1c",
        "gldL": "g/dL",
        "mgldL": "mg/dL",
        "IpL": "/µL",
        "lakhluL": "lakh/µL"
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    return text


def find_parameter_value(text, aliases):
    """
    Find a numeric value appearing after a parameter name.
    Works across spaces and line breaks.
    """

    for alias in aliases:

        pattern = (
            r"\b"
            + re.escape(alias)
            + r"\b"
            + r"[\s:=-]*"
            + r"([\d,]+(?:\.\d+)?)"
        )

        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            value = match.group(1).replace(",", "")

            try:
                return float(value)
            except ValueError:
                continue

    return None


def extract_parameters(text):
    """
    Extract recognized medical parameters from any supported
    PDF/OCR report format.
    """

    text = normalize_text(text)

    parameters = {}

    for parameter, aliases in PARAMETER_ALIASES.items():

        value = find_parameter_value(text, aliases)

        if value is not None:
            parameters[parameter] = value

    return parameters


if __name__ == "__main__":

    sample_text = """
    CITYCARE DIAGNOSTIC LABORATORY

    Hemoglobin
    10.2 g/dL

    Total WBC Count
    11,500 /µL

    RBC Count: 4.65 million/uL

    Platelets 2.45 lakh/uL

    Fasting Blood Glucose: 108 mg/dL

    HbAIc
    5.8 %

    Total Cholesterol 188 mg/dL

    TSH: 6.2 mIU/L

    Vitamin D 18.5 ng/mL
    """

    result = extract_parameters(sample_text)

    print("\n========== EXTRACTED PARAMETERS ==========\n")

    for parameter, value in result.items():
        print(f"{parameter}: {value}")