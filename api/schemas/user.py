from pydantic import BaseModel
from typing import Union, Optional
from schemas.auth import Token


class User(BaseModel):
    id: int
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_disabled: bool

    class Config:
        from_attributes = True

class UserPrivate(User):
    password: str


class UserCreate(BaseModel):
    email: str
    password: str


class UserUpdate(BaseModel):
    first_name: str
    last_name: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserToken(BaseModel):
    user: User
    token: Token
