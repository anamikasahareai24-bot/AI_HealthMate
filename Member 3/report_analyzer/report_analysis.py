import re


PARAMETER_ALIASES = {
    "Hemoglobin": ["hemoglobin", "haemoglobin", "hb"],
    "WBC": ["total wbc count", "wbc count", "wbc"],
    "RBC": ["rbc count", "rbc"],
    "Platelets": ["platelet count", "platelets", "platelet"],
    "Hematocrit": ["hematocrit", "haematocrit", "pcv"],
    "MCV": ["mcv"],
    "MCH": ["mch"],
    "MCHC": ["mchc"],
    "RDW": ["rdw", "rdw-cv"],

    "Fasting Blood Glucose": [
        "fasting blood glucose",
        "fasting glucose",
        "fasting blood sugar",
        "fbs"
    ],

    "Random Blood Glucose": [
        "random blood glucose",
        "random glucose",
        "random blood sugar",
        "rbs"
    ],

    "HbA1c": [
        "hba1c",
        "hbaic",
        "glycated hemoglobin",
        "glycosylated hemoglobin"
    ],

    "Total Cholesterol": [
        "total cholesterol",
        "cholesterol"
    ],

    "Triglycerides": [
        "triglycerides",
        "triglyceride"
    ],

    "HDL": [
        "hdl cholesterol",
        "hdl"
    ],

    "LDL": [
        "ldl cholesterol",
        "ldl"
    ],

    "TSH": [
        "tsh",
        "thyroid stimulating hormone"
    ],

    "T3": [
        "t3",
        "triiodothyronine"
    ],

    "T4": [
        "t4",
        "thyroxine"
    ],

    "ALT": [
        "alt",
        "sgpt",
        "alanine aminotransferase"
    ],

    "AST": [
        "ast",
        "sgot",
        "aspartate aminotransferase"
    ],

    "ALP": [
        "alp",
        "alkaline phosphatase"
    ],

    "Bilirubin": [
        "total bilirubin",
        "bilirubin"
    ],

    "Creatinine": [
        "serum creatinine",
        "creatinine"
    ],

    "Urea": [
        "blood urea",
        "serum urea",
        "urea"
    ],

    "Vitamin D": [
        "vitamin d",
        "25-oh vitamin d",
        "25 hydroxy vitamin d"
    ],

    "Vitamin B12": [
        "vitamin b12",
        "b12",
        "cobalamin"
    ]
}


def normalize_text(text):
    """Normalize OCR errors and line formatting."""

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

    return text.replace("\r", "\n")


def get_parameter_section(text, aliases):
    """
    Get a small section of text after a parameter name.
    This prevents one parameter from accidentally
    taking another parameter's reference range.
    """

    lines = text.splitlines()

    for i, line in enumerate(lines):

        clean_line = line.strip().lower()

        for alias in aliases:

            if clean_line == alias.lower():

                # Take only the next few lines
                section = lines[i + 1:i + 8]

                return "\n".join(section)

    return ""


def extract_reference_range(text, parameter):

    aliases = PARAMETER_ALIASES.get(
        parameter,
        [parameter]
    )

    section = get_parameter_section(
        text,
        aliases
    )

    if not section:
        return None

    # Example: 13.0 - 17.0
    match = re.search(
        r"(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)",
        section
    )

    if match:

        return {
            "type": "range",
            "low": float(match.group(1)),
            "high": float(match.group(2))
        }

    # Example: Below 5.7
    match = re.search(
        r"below\s+(\d+(?:\.\d+)?)",
        section,
        re.IGNORECASE
    )

    if match:

        return {
            "type": "below",
            "limit": float(match.group(1))
        }

    # Example: Above 40
    match = re.search(
        r"above\s+(\d+(?:\.\d+)?)",
        section,
        re.IGNORECASE
    )

    if match:

        return {
            "type": "above",
            "limit": float(match.group(1))
        }

    # Example:
    # MCV
    # 86
    # 80
    # 100
    #
    # First number is result, next two are range.
    numbers = re.findall(
        r"\b\d+(?:\.\d+)?\b",
        section
    )

    if len(numbers) >= 3:

        return {
            "type": "range",
            "low": float(numbers[1]),
            "high": float(numbers[2])
        }

    return None


def analyze_value(value, reference):

    if reference is None:
        return "Reference range unavailable"

    if reference["type"] == "range":

        if value < reference["low"]:
            return "Low"

        elif value > reference["high"]:
            return "High"

        return "Normal"

    if reference["type"] == "below":

        if value < reference["limit"]:
            return "Normal"

        return "High"

    if reference["type"] == "above":

        if value > reference["limit"]:
            return "Normal"

        return "Low"


def analyze_report(text, parameters):

    text = normalize_text(text)

    results = {}

    for parameter, value in parameters.items():

        reference = extract_reference_range(
            text,
            parameter
        )

        status = analyze_value(
            value,
            reference
        )

        results[parameter] = {
            "value": value,
            "reference": reference,
            "status": status
        }

    return results