from fastapi import APIRouter, Request
from apps.backend.agents.chat_agent import agent
import json
from pathlib import Path

router = APIRouter()

@router.post("/api/ask")
async def ask_agent(request: Request):
    
    conversation_file = Path("apps/backend/agents/memory/conversation.json")

    # Load existing conversation if it exists
    if conversation_file.exists():
        with conversation_file.open("r") as file:
            conversation = json.load(file)
    else:
        conversation = [{"error"}]

    # Get the user message from the request
    user_message = await request.json()

    # Append the new message to the conversation
    conversation.append(user_message)

    # Save the updated conversation back to the file
    with conversation_file.open("w") as file:
        json.dump(conversation, file, indent=4)


    reply = agent.run("Reply nicely to the user message.")
    return {"message": f"{reply}"}
