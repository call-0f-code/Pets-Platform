from groq import Groq
from dotenv import load_dotenv
load_dotenv ()
import os
client=Groq(api_key=os.getenv("groq_key"))

def diet_plan(species, breed, age, weight):
    try:
        responce = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are a professional pet nutritionist.
                    Give a complete diet plan based on info provided.
                    Do NOT ask follow up questions.
                    Always assume weight is in kg.
                    Provide:
                    1. Daily calories needed
                    2. Recommended foods
                    3. Foods to avoid
                    4. Meal schedule
                    5. Portion size per meal"""
                },
                {
                    "role": "user",
                    "content": f"species={species}, breed={breed}, age={age}, weight={weight}kg"
                }
            ]
        )
        reply=responce.choices[0].message.content
        return reply
    except Exception as e:
        print("error in diet controller",e)
        return "sorry unable to generate diet plan right now "
    
