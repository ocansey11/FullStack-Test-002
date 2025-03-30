# main.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.core.schema_agent import process_user_message

app = FastAPI()

class ChatInput(BaseModel):
    message: str

@app.post("/chat")
async def chat(input: ChatInput):
    response = process_user_message(input.message)
    return {"response": response}
