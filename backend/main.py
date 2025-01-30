from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # For CORS
import whisper
from huggingface_hub import InferenceClient
import os

os.environ["PATH"] += os.pathsep + "C:\\ffmpeg-7.1-essentials_build\\bin"


from dotenv import load_dotenv
load_dotenv() 

import uuid



app = FastAPI()

# Configure CORS (allow React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only! Tighten this later.
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
model = whisper.load_model("small")

# Initialize Hugging Face client
HF_API_KEY = os.getenv("HF_API_KEY")  # Use environment variable
client = InferenceClient("meta-llama/Llama-3.2-1B-Instruct", token=HF_API_KEY)

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        temp_file = f"temp_{file.filename}"
        
        with open(temp_file, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # Confirm file exists
        if not os.path.exists(temp_file):
            raise HTTPException(status_code=500, detail="Temp file not saved!")

        # Transcribe audio
        result = model.transcribe(temp_file)
        transcription = result["text"]

        # Generate LLM response
        prompt = f"Respond to this: {transcription}"
        response = client.text_generation(prompt, max_new_tokens=200)

        # Clean up temp file
        os.remove(temp_file)

        return {"transcription": transcription, "response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))