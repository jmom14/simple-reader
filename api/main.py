from fastapi import FastAPI
from dotenv import load_dotenv
from routers.users import router as users_rotuer
from routers.auth import router as auth_router
from routers.reading import router as reading_router
from routers.highlight import router as highlight_router
from routers.note import router as note_router
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://epubs-simple-reader.netlify.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(users_rotuer)
app.include_router(auth_router)
app.include_router(reading_router)
app.include_router(highlight_router)
app.include_router(note_router)