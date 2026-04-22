from groq import Groq
from dotenv import load_dotenv
import os 

load_dotenv()
client=Groq(api_key=os.getenv("groq_key"))

def health_in(pet, breed, age):
    try:
        responce = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """Give a health report for the pet provided.
                    If info is incorrect ask for correct information.
                    Provide:
                    1. Common diseases for this breed
                    2. Age related concerns
                    3. Recommended vaccines
                    4. Exercise needs
                    5. Average lifespan"""
                },
                {
                    "role": "user",
                    "content": f"pet:{pet}, age:{age}, breed:{breed}"
                }
            ]
        )

        reply=responce.choices[0].message.content

        return reply
    except Exception as e:
        print("error in health_in",e)
        return "sorry enable to generate health insights now."
