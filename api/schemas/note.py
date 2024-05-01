from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    cfi: str
    text: str
    note: str
    reading_id: str


class Note(BaseModel):
    id: int
    cfi: str
    text: str
    note: str
    created_at: datetime
    reading_id: int
    user_id: int
    reading_title: str
