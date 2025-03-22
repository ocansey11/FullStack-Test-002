from smolagents import tool
import json
from pathlib import Path
from typing import List, Dict, Any


@tool
def reply_to_user() -> str:
    """
    Receives a user message and generates a helpful response.

    Args:
        None

    Returns:
        str: A helpful response acknowledging the user's input.
    """
    return "Reply nicely to the user message"


@tool
def save_vital_info(db_info: Dict[str, Any]) -> str:
    """
    Save the vital information from the inference of the user's message.

    Args:
        db_info (dict): The data we inferred from user interaction.

    Returns:
        str: Confirmation that the data was saved.
    """
    vital_info = {
        "entities": db_info.get("entities"),
        "db_type": db_info.get("db_type"),
        "db_name": db_info.get("db_name")
    }

    Path("memory").mkdir(parents=True, exist_ok=True)  # ensure the directory exists
    with open("memory/vital_info.json", "w") as file:
        json.dump(vital_info, file, indent=4)
    
    return "Vital info saved successfully."


@tool
def comb_through_conversation() -> List[str]:
    """
    Comb through the conversation and extract the user messages.

    Args:
        None

    Returns:
        list: A list of user messages from the conversation.
    """
    user_messages = []
    conversation_file = Path("memory/conversation.json")

    if conversation_file.exists():
        with conversation_file.open("r") as file:
            conversation = json.load(file)
    else:
        conversation = []

    for message in conversation:
        user_messages.append(message)

    return user_messages
