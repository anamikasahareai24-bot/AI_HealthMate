import os
import json
from google import genai
from chatbot.retriever import retrieve_knowledge

CACHE_FILE = "chatbot/cache.json"

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as file:
                return json.load(file)
        except (json.JSONDecodeError, OSError):
            return {}
    return {}


def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as file:
        json.dump(cache, file, ensure_ascii=False, indent=4)


response_cache = load_cache()


def get_healthbot_response(question, conversation_history=None):

    if conversation_history is None:
        conversation_history = []

    cache_key = " ".join(question.strip().lower().split())

    # Use cache only for a new conversation
    if not conversation_history and cache_key in response_cache:
        return response_cache[cache_key]

    # Retrieve relevant information from local RAG
    medical_info = retrieve_knowledge(question)

    history_text = ""

    if conversation_history:
        history_text = "\nPrevious conversation:\n"

        for message in conversation_history:
            history_text += (
                f"{message['role']}: {message['content']}\n"
            )

    if medical_info:
        prompt = f"""
Use the following medical information as reference.

Medical information:
{medical_info}

{history_text}

Current user question:
{question}
"""
    else:
        prompt = f"""
{history_text}

Current user question:
{question}
"""

    response = client.interactions.create(
        model="gemini-3.6-flash",

        system_instruction="""
You are AI_HealthMate, a health information assistant.

Rules:
- Answer in English, Hindi, or Hinglish according to the user's language.
- Keep answers short, simple and beginner-friendly.
- Use previous conversation when answering follow-up questions.
- Use provided medical information when available.
- Give general health information only.
- Never diagnose the user.
- Never claim that the user definitely has a disease.
- Never prescribe medicines.
- Never provide medicine dosages or personalized medication schedules.
- For prescribed medicines, advise following the prescription or asking a qualified healthcare professional.
- Do not recommend a specific doctor as the "best".
- You may explain which type of specialist generally handles a condition.
- For serious symptoms, advise seeking professional medical care.
- For emergency symptoms, advise immediate emergency medical help.
""",

        input=prompt
    )

    answer = response.output_text

    # Save standalone question-answer in cache
    if not conversation_history:
        response_cache[cache_key] = answer
        save_cache(response_cache)

    return answer