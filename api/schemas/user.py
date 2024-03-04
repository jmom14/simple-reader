from pydantic import BaseModel, ConfigDict
from typing import Union


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    first_name: str
    last_name: str
    is_disabled: bool

class UserPrivate(User):
    hashed_password: str


class UserCreate(BaseModel):
    pass
