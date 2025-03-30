import os
import json
from dotenv import load_dotenv

from llama_index.llms.openai import OpenAI as LlamaOpenAI
from llama_index.core.chat_engine import SimpleChatEngine
from llama_index.core.chat_engine.types import ChatMessage
from llama_index.core import Document
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.ingestion import IngestionPipeline
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.vector_stores.chroma import ChromaVectorStore
import chromadb

# Load environment variables
load_dotenv()

# Paths
message_path = "app/data/messages.json"
db_path = "app/db/alfred_chroma_db"

# Setup LLM
llm = LlamaOpenAI(model="gpt-3.5-turbo")

# Ensure messages.json exists
if not os.path.exists(message_path):
    os.makedirs(os.path.dirname(message_path), exist_ok=True)
    with open(message_path, "w") as f:
        json.dump([], f)

# Load chat history
with open(message_path, "r") as f:
    raw_messages = json.load(f)

# Convert to LlamaIndex message format
chat_history = [
    ChatMessage(role=m["role"], content=m["content"]) for m in raw_messages
]

# Setup chat engine (no retriever needed)
chat_engine = SimpleChatEngine.from_defaults(
    llm=llm,
    chat_history=chat_history
)

def process_user_message(user_message: str) -> str:
    # Run the chat engine
    response = chat_engine.chat(user_message)

    # Append new user & assistant messages
    raw_messages.append({"role": "user", "content": user_message})
    raw_messages.append({"role": "assistant", "content": str(response)})

    # Save updated messages
    with open(message_path, "w") as f:
        json.dump(raw_messages, f, indent=2)

    # --- Vector Ingestion Section ---
    latest_turns = raw_messages[-2:]
    docs = [Document(text=m["content"]) for m in latest_turns]

    embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
    db = chromadb.PersistentClient(path=db_path)
    chroma_collection = db.get_or_create_collection("alfred")
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

    pipeline = IngestionPipeline(
        transformations=[
            SentenceSplitter(chunk_size=25, chunk_overlap=0),
            embed_model
        ],
        vector_store=vector_store
    )

    pipeline.run(documents=docs)

    return str(response)
