from pydantic import BaseModel, model_validator
from typing import Any, Optional
import json


class Reading(BaseModel):
    id: int
    title: str
    author: str
    file: str


class ReadingCreate(BaseModel):
    title: str
    author: str
    cover_image_file: Optional[str] = None

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


