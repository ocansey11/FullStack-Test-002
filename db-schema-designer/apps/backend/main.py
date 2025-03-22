from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.backend.routes import conversation
 

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  # Frontend dev server
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    print("Registered routes:")
    for route in app.routes:
        print(route.path)


@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}

app.include_router(conversation.router)