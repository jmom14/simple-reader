from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Response
from typing_extensions import Annotated
from database import get_db
from sqlalchemy.orm import Session
from typing import List
from pydantic import TypeAdapter
from googletrans import Translator
from googletrans.constants import LANGCODES, LANGUAGES
from exception import TranslationError

router = APIRouter(
    prefix="/api/translate", 
    tags=["translate"], 
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def translate(text: str, lang_to: str):
    try:
        translator = Translator()
        translate_response = translator.translate(text, dest=lang_to)
    except Exception:
        raise TranslationError
    response = {
        'language_from': LANGUAGES[translate_response.src],
        'language_from_code': translate_response.src,
        'language_to': LANGUAGES[translate_response.dest],
        'language_to_code': translate_response.dest,
        'text_to': translate_response.text
    }
    return response