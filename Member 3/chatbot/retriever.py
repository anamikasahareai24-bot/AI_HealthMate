import re
from sentence_transformers import SentenceTransformer, util

KNOWLEDGE_FILE = "chatbot/medical_knowledge.txt"

# Load embedding model once
model = SentenceTransformer("all-MiniLM-L6-v2")


def load_knowledge():
    with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as file:
        knowledge = file.read()

    sections = re.split(r"\n---\n", knowledge)

    # Remove empty sections
    return [section.strip() for section in sections if section.strip()]


def retrieve_knowledge(question, top_k=2):
    sections = load_knowledge()

    if not sections:
        return ""

    # Create embeddings
    question_embedding = model.encode(
        question,
        convert_to_tensor=True
    )

    section_embeddings = model.encode(
        sections,
        convert_to_tensor=True
    )

    # Calculate semantic similarity
    similarities = util.cos_sim(
        question_embedding,
        section_embeddings
    )[0]

    # Get top relevant sections
    top_indices = similarities.argsort(descending=True)[:top_k]

    relevant_sections = []

    for index in top_indices:
        score = float(similarities[index])

        # Ignore very weak matches
        if score >= 0.25:
            relevant_sections.append(sections[int(index)])

    return "\n\n---\n\n".join(relevant_sections)