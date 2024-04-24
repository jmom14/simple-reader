from pydantic import BaseModel
from typing import Union
from datetime import datetime

class HighlightCreate(BaseModel):
    cfi: str
    text: str
    reading_id: str


class Highlight(BaseModel):
    id: int
    cfi: str
    text: str
    created_at: datetime
    reading_id: int
    user_id: int