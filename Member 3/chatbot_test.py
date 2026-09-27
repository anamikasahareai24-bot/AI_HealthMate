import os
import json
from google import genai
from chatbot.retriever import retrieve_knowledge

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

CACHE_FILE = "chatbot/cache.json"


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

# Current conversation memory
conversation_history = []


def ask_healthbot(question):

    cache_key = " ".join(question.strip().lower().split())

    # Cache check only for standalone/repeated questions
    if not conversation_history and cache_key in response_cache:
        print("\n[Cached response - No API call]")
        return response_cache[cache_key]

    # RAG
    medical_info = retrieve_knowledge(question)

    # Previous conversation
    history_text = ""

    if conversation_history:
        history_text = "\nPrevious conversation:\n"

        for message in conversation_history:
            history_text += f"{message['role']}: {message['content']}\n"

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

SAFETY RULES:
- Answer in English, Hindi, or Hinglish according to the user's language.
- Keep answers short, simple and beginner-friendly.
- Use previous conversation to understand follow-up questions.
- Provide general health information only.
- Never diagnose the user.
- Never claim that the user definitely has a disease.
- Never prescribe medicines.
- Never provide medicine dosages or personalized medication schedules.
- For prescribed medicines, advise following the prescription or asking a qualified healthcare professional.
- Do not recommend a specific doctor as the "best".
- You may explain which type of specialist generally handles a condition.
- For serious or emergency symptoms, advise appropriate professional medical care.
""",

        input=prompt
    )

    answer = response.output_text

    # Save conversation memory
    conversation_history.append({
        "role": "User",
        "content": question
    })

    conversation_history.append({
        "role": "AI_HealthMate",
        "content": answer
    })

    # Save standalone answers to cache
    if not conversation_history[:-2]:
        response_cache[cache_key] = answer
        save_cache(response_cache)

    return answer


while True:

    question = input("\nYou: ")

    if question.strip().lower() == "exit":
        print("HealthBot: Goodbye! Stay healthy. 😊")
        break

    if not question.strip():
        print("HealthBot: Please enter a question.")
        continue

    try:
        answer = ask_healthbot(question)
        print("\nHealthBot:", answer)

    except Exception as e:
        print("\nHealthBot: I'm unable to connect right now. Please try again later.")
        print("Error:", e)