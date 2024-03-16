from pydantic import BaseModel
from typing import Union


class Token(BaseModel):
    token: str
    token_type: str


class TokenData(BaseModel):
    email: Union[str, None] = None