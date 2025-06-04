from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from gtts import gTTS
import openai
import os
import uuid
from typing import Optional
from dotenv import load_dotenv

# Initialize FastAPI app
app = FastAPI()
load_dotenv()

# Serve the audio folder as static files
app.mount("/audio", StaticFiles(directory="audio"), name="audio")

# Configure CORS
origins = [
    "http://localhost:4200",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the Message model
class Message(BaseModel):
    text: str
    conversation_id: Optional[str] = None  # For maintaining conversation context

def generate_audio(text: str) -> str:
    """Generate audio file from text using gTTS and save it to the audio folder."""
    # Ensure the audio folder exists
    audio_folder = os.path.join(os.getcwd(), "audio")
    if not os.path.exists(audio_folder):
        os.makedirs(audio_folder)

    # Generate a unique filename for the audio file
    filename = f"{uuid.uuid4()}.mp3"
    filepath = os.path.join(audio_folder, filename)

    # Use gTTS to generate the audio file
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(filepath)

    return filepath  # Return the path to the saved audio file

async def get_gpt_response(prompt: str, conversation_id: Optional[str] = None) -> str:
    """Get response from GPT with Australian context."""
    try:
        system_prompt = """You are an AI assistant named "Bruce" with a strong Australian personality. 
        Respond to all questions using Australian slang and vernacular. Be friendly, casual, and 
        humorous like a true blue Aussie. Use terms like 'mate', 'g'day', 'no worries', 
        'fair dinkum', and 'she'll be right' frequently."""
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return "Strewth! I'm having a bit of a technical hiccup. Try again later, mate!"

@app.post("/chat")
async def chat(message: Message):
    """Handle chat requests."""
    try:
        # Get GPT response
        gpt_response = await get_gpt_response(message.text, message.conversation_id)
        
        # Generate and save the audio file
        filepath = generate_audio(gpt_response)
        filename = os.path.basename(filepath)

        # Construct the full audio URL
        base_url = "http://127.0.0.1:8000"  # Replace with your backend's URL if deployed
        audio_url = f"{base_url}/audio/{filename}"

        # Return text and audio URL as JSON
        return {
            "text": gpt_response,
            "conversation_id": message.conversation_id or str(uuid.uuid4()),
            "audio_url": audio_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)