from pydantic import BaseModel


class SimpleTranslation(BaseModel):
    language_from: str
    language_from_code: str
    language_to: str
    language_to_code: str
    text_to: str

class Translation(BaseModel):
    id: int
    language_from: str
    language_from_code: str
    language_to: str
    language_to_code: str
    text_to: str
    text_from: str


class TranslationCreate(BaseModel):
    language_from: str
    language_from_code: str
    language_to: str
    language_to_code: str
    text_from: str
    text_to: str
    reading_id: str
