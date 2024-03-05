from sqlalchemy.orm import Session
from utils.auth import get_password_hash
from models.user import User
from database import get_db
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from schemas.auth import TokenData
import os
import schemas 


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

SECRET_KEY = os.environ.get('AUTH_SECRET_KEY')
ALGORITHM = os.environ.get('AUTH_ALGORITHM')


def create_user(db: Session, user: schemas.User):
    new_user = User(email=user.email, password=get_password_hash(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session):
    return db.query(User).offset(0).limit(100).all()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    db_user = get_user_by_email(db=db, email=token_data.email)
    if db_user is None:
        raise credentials_exception
    return db_user


async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.is_disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user