from pydantic import BaseModel
from typing import Union
from schemas.auth import Token


class User(BaseModel):
    id: int
    email: str
    first_name: Union[str, None] = None
    last_name: Union[str, None] = None
    is_disabled: bool

    class Config:
        from_attributes = True

class UserPrivate(User):
    password: str


class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserToken(BaseModel):
    user: User
    token: Token
