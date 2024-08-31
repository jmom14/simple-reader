from fastapi import APIRouter, Depends, File
from database import get_db
from sqlalchemy.orm import Session
import services
import schemas
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from database import get_db
from pydantic import TypeAdapter
from typing import List
from exception import TranslationError


router = APIRouter(
    prefix="/api/translation",
    tags=["translation"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_translations(
    reading_id: int,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    q = services.get_translations(db=db, user_id=user.id, reading_id=reading_id)
    items = TypeAdapter(List[schemas.Translation]).validate_python(q)
    return items


@router.post("/")
async def create_translation(
    translation: schemas.TranslationCreate,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    new_translate = services.create_translation(
        db, translation, user.id, translation.reading_id
    )
    return new_translate


@router.get("/translate", response_model=schemas.SimpleTranslation)
async def translate(text: str, lang_to: str):

    try:
        response = services.translate(text, lang_to)
    except Exception as e:
        raise TranslationError

    return response
