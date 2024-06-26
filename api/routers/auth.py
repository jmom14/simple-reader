from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate_user, create_access_token
from schemas.auth import Token
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db
from sqlalchemy.orm import Session
from exception import UserNotRegisteredError, IncorrectPasswordError
from fastapi.responses import RedirectResponse
from utils.helper import json_to_params

import schemas
import os
import services
import httpx


AUTH_URL = os.environ.get("AUTH_URL")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
REDIRECT_URI = os.environ.get("REDIRECT_URI")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
TOKEN_URL = os.environ.get("TOKEN_URL")
USERINFO_URL = os.environ.get("USERINFO_URL")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES"))


router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


def get_token(email: str):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(data={"sub": email}, expires_delta=access_token_expires)
    return Token(access_token=token, token_type="bearer")


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    try:
        user = authenticate_user(
            db=db, email=form_data.username, password=form_data.password
        )
    except UserNotRegisteredError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not registered",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except IncorrectPasswordError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return get_token(user.email)


@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db=db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = get_token(user.email)
    return {"token": token.access_token, "user": user}


@router.post("/signup")
async def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = services.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = services.create_user(db=db, user=user)
    token = get_token(new_user.email)
    return {"token": token.access_token, "user": new_user}


@router.get("/google")
async def login():
    authorization_url = f"{AUTH_URL}?client_id={GOOGLE_CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=email&response_type=code"
    return RedirectResponse(authorization_url)


@router.get("/google/callback")
async def login_callback(code: str, scope: str, db: Session = Depends(get_db)):

    token_params = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient() as client:
        token_response = await client.post(TOKEN_URL, data=token_params)

    token_data = token_response.json()
    access_token = token_data["access_token"]

    async with httpx.AsyncClient() as client:
        user_response = await client.get(
            USERINFO_URL, headers={"Authorization": f"Bearer {access_token}"}
        )

    user_info = user_response.json()
    email = user_info["email"]
    user = services.get_user_by_email(db=db, email=email)

    if not user:
        user = services.create_social_user(db=db, email=email)

    token = get_token(user.email)
    token_obj = {"token": token.access_token}

    redirect_url = "http://localhost:3000?" + json_to_params(token_obj)
    return RedirectResponse(url=redirect_url)
