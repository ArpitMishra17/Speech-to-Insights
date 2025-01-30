#Speech to Insights

Convert audio to insights using cutting-edge AI models. This project transcribes audio files with OpenAI's Whisper and generates intelligent responses using multiple LLMs via Hugging Face.

##🚀 Features
- 🎙️ Audio-to-text conversion (Whisper ASR)

- 🧠 Multi-LLM support (Falcon, Mistral, Llama 2, Zephyr)

- 🌓 Dark/Light mode toggle

- 📁 File upload interface

- 📱 Responsive modern UI

##⚙️ Tech Stack
- Backend: Python + FastAPI + Whisper

- Frontend: React + Tailwind CSS + shadcn/ui

- AI: Hugging Face Inference API

- Tools: FFmpeg, Git

##⚡ Quick Start
```shell
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend 
cd frontend
npm install
npm run start
```
##📝 Requirements
- OpenAI Whisper (pip install git+https://github.com/openai/whisper.git)

- Hugging Face API key (in .env)