import os
from smolagents import CodeAgent, HfApiModel
from apps.backend.agents.tools import reply_to_user, save_vital_info, comb_through_conversation
from dotenv import load_dotenv

load_dotenv()

# ✅ Load the Hugging Face API token
os.getenv("HUGGINGFACEHUB_API_TOKEN")


# ✅ Create the model using a real HuggingFace model
model = HfApiModel("mistralai/Mistral-7B-Instruct-v0.1")

# ✅ Initialize the agent with the tool and model
agent = CodeAgent(
    tools=[reply_to_user, comb_through_conversation, save_vital_info],
    model=model,
    max_steps=20
)

# message = "How are you?"
# agent.run(f"Reply nicely to the user message. {message}")