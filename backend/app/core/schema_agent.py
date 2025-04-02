# app/core/schema_agent.py
import os
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

from app.core.project_manager import (
    generate_new_project_id,
    load_messages,
    save_messages
)

load_dotenv()

db_path = "app/db/alfred_chroma_db"

llm = LlamaOpenAI(model="gpt-3.5-turbo")

def process_user_message(user_message: str, project_id: str | None = None) -> tuple[str, str]:
    # 📁 Init project ID if needed
    if not project_id:
        project_id = generate_new_project_id()

    # 📄 Load messages
    messages = load_messages(project_id)
    if not messages:
        messages = [{
            "role": "system",
            "content": "You are an expert assistant helping users design database schemas."
        }]

    # 🧠 Build chat history for LlamaIndex
    chat_history = [ChatMessage(role=m["role"], content=m["content"]) for m in messages]

    # 💬 Chat
    chat_engine = SimpleChatEngine.from_defaults(llm=llm, chat_history=chat_history)
    response = chat_engine.chat(user_message)

    # 💾 Update & save conversation
    messages.append({"role": "user", "content": user_message})
    messages.append({"role": "assistant", "content": str(response)})
    save_messages(project_id, messages)

    # 📚 Ingest last turn into vector store
    docs = [Document(text=m["content"]) for m in messages[-2:]]

    embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
    db = chromadb.PersistentClient(path=db_path)
    chroma_collection = db.get_or_create_collection(project_id)
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

    pipeline = IngestionPipeline(
        transformations=[
            SentenceSplitter(chunk_size=25, chunk_overlap=0),
            embed_model
        ],
        vector_store=vector_store
    )

    pipeline.run(documents=docs)

    return str(response), project_id
