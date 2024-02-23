from fastapi import FastAPI
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from routers.users import router as users_rotuer
from routers.auth import router as auth_router

engine = create_engine("postgresql://postgres:postgres@localhost:5432/postgres")
Session = sessionmaker(bind=engine)
session = Session()

load_dotenv()
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(users_rotuer)
app.include_router(auth_router)