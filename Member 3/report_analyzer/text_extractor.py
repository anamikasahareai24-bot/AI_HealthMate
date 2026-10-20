import pymupdf


def extract_text_from_pdf(pdf_path):
    """
    Extract text directly from a digital PDF.
    """

    document = pymupdf.open(pdf_path)

    extracted_text = ""

    for page in document:
        extracted_text += page.get_text()

    document.close()

    return extracted_text


if __name__ == "__main__":
    pdf_path = input("Enter PDF path: ")

    text = extract_text_from_pdf(pdf_path)

    print("\n========== EXTRACTED TEXT ==========\n")
    print(text)