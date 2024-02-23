from pydantic import BaseModel, ConfigDict
from typing import Union


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    first_name: Union[str, None] = None
    last_name: Union[str, None] = None
    is_active = Union[str, None] = True

class UserPrivate(User):
    hashed_password: str
