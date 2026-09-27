import easyocr


# Initialize EasyOCR
reader = easyocr.Reader(["en"])


def extract_text_from_image(image_path):
    """
    Extract text from a medical report image using EasyOCR.
    """

    results = reader.readtext(image_path)

    extracted_text = ""

    for detection in results:
        text = detection[1]
        extracted_text += text + "\n"

    return extracted_text


if __name__ == "__main__":
    image_path = input("Enter image path: ")

    text = extract_text_from_image(image_path)

    print("\n========== OCR EXTRACTED TEXT ==========\n")
    print(text)