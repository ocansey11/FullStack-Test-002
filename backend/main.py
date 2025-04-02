from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.core.schema_agent import process_user_message
from app.core.project_manager import list_projects, load_messages, generate_new_project_id, save_messages

app = FastAPI()

class ChatInput(BaseModel):
    message: str

# Enable CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📚 Get all projects
@app.get("/projects")
async def get_projects():
    return list_projects()

# 📖 Get full conversation by project ID
@app.get("/projects/{project_id}")
async def get_project(project_id: str):
    messages = load_messages(project_id)
    if not messages:
        raise HTTPException(status_code=404, detail="Project not found")
    return messages

# 💬 Add new message to existing project
@app.post("/projects/{project_id}")
async def chat_with_project(project_id: str, input: ChatInput):
    response, _ = process_user_message(input.message, project_id)
    return {"response": response, "project_id": project_id}

# 🆕 Start new project with first message
@app.post("/projects")
async def start_new_project(input: ChatInput):
    response, project_id = process_user_message(input.message, None)
    return {"response": response, "project_id": project_id}
