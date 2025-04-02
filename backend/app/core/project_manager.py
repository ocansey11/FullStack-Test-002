# app/core/project_manager.py
import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


def get_all_project_files():
    return sorted(DATA_DIR.glob("project_*.json"))


def generate_new_project_id() -> str:
    files = get_all_project_files()
    if not files:
        return "project_1"
    last = files[-1].stem
    last_num = int(last.split("_")[1])
    return f"project_{last_num + 1}"


def get_message_path(project_id: str) -> Path:
    return DATA_DIR / f"{project_id}.json"


def load_messages(project_id: str) -> list:
    path = get_message_path(project_id)
    if path.exists():
        with path.open("r") as f:
            return json.load(f)
    return []


def save_messages(project_id: str, messages: list):
    path = get_message_path(project_id)
    with path.open("w") as f:
        json.dump(messages, f, indent=2)


def list_projects():
    projects = []
    for path in get_all_project_files():
        with path.open("r") as f:
            messages = json.load(f)
            preview = next((m["content"] for m in messages if m["role"] == "user"), "Untitled")
            projects.append({
                "id": path.stem,
                "preview": preview[:60] + ("..." if len(preview) > 60 else "")
            })
    return projects
