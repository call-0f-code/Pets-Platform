# from flask import Blueprint, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from services.chat_service import load_history , save_message
import os 

load_dotenv()
client=Groq(api_key=os.getenv("groq_key"))
# print("API KEY:", os.getenv("api_key"))

# symptoms_bp=Blueprint("symptoms", __name__)



SYSTEM_PROMPT = {
    "role": "system",
    "content": """You are an expert veterinarian AI.
    ONLY answer questions related to pet health.
    Remember previous messages in the conversation.
    If not pet related say: 'I only help with pet health!'
    Always provide:
    1. Possible causes
    2. Home remedies if safe
    3. Urgency level (Low/Medium/High)
    4. Whether vet visit is needed"""
}
def check_symptoms(session_id, user_id, message):
    history=load_history(session_id, user_id)
    msg=[SYSTEM_PROMPT]+history+[{"role":"user", "content":message}]
    responce=client.chat.completions.create(
        model="llama3-70b-8192",
        messages=msg
    )

    reply=responce.choices[0].message.content
    save_message(session_id,user_id, "user", message)
    save_message(session_id,user_id, "assistant", reply)

    return reply



