from sqlalchemy import select
from googletrans.constants import LANGUAGES
from googletrans import Translator
from exception import TranslationError
from typing import Dict
from sqlalchemy.orm import Session
from models import Translation, User, Reading
import schemas


def translate(text, lang_to):
    try:
        # translator = Translator()
        translator = Translator(
            service_urls=[
                "translate.google.com",
                "translate.google.co.kr",
            ]
        )
        # translate_response = translator.translate(text, dest=lang_to)
        translate_response = translator.translate("안녕하세요.", dest="ja")
    except Exception as e:
        print(e)
        raise TranslationError
    response = {
        "language_from": LANGUAGES[translate_response.src],
        "language_from_code": translate_response.src,
        "language_to": LANGUAGES[translate_response.dest],
        "language_to_code": translate_response.dest,
        "text_to": translate_response.text,
    }
    return response


def get_translations(db: Session, user_id, reading_id=None):
    q = (
        select(
            Translation.id,
            Translation.language_from,
            Translation.language_from_code,
            Translation.language_to,
            Translation.language_to_code,
            Translation.text_from,
            Translation.text_to,
            Reading.title.label("reading_title"),
        )
        .join(Translation.reading)
        .filter(Reading.user_id == user_id)
    )

    if reading_id:
        q = q.filter(Translation.reading_id == reading_id)

    items = db.execute(q)

    return [item._asdict() for item in items]


def create_translation(
    db: Session,
    translation: schemas.TranslationCreate,
    user_id: User,
    reading_id: Reading,
):
    new_translation = Translation(
        language_from=translation.language_from,
        language_from_code=translation.language_from_code,
        language_to=translation.language_to,
        language_to_code=translation.language_to_code,
        text_from=translation.text_from,
        text_to=translation.text_to,
        user_id=user_id,
        reading_id=reading_id,
    )
    db.add(new_translation)
    db.commit()
    db.refresh(new_translation)
    return new_translation
