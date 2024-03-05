from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Union
from jose import jwt
from schemas.user import UserPrivate
from sqlalchemy.orm import Session

import os
import services


SECRET_KEY = os.environ.get('AUTH_SECRET_KEY')
ALGORITHM = os.environ.get('AUTH_ALGORITHM')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return UserPrivate(**user_dict)


def authenticate_user(db: Session, email: str, password: str):
    db_user = services.get_user_by_email(db=db, email=email)
    if not db_user:
        return False
    if not verify_password(password, db_user.password):
        return False
    return db_user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
