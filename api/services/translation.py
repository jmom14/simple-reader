from sqlalchemy import select
from utils.constants import LANGUAGES
from exception import TranslationError
from typing import Dict
from sqlalchemy.orm import Session
from models import Translation, User, Reading
import schemas
import uuid
import requests
import os


key = os.environ.get("AZURE_KEY")
region = os.environ.get("AZURE_REGION")


def translate(text, lang_to):
    url = "https://api.cognitive.microsofttranslator.com/translate"
    params = {
        'api-version': '3.0',
        'from': 'en',
        'to': [lang_to],
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Region': region,
        'X-ClientTraceId': str(uuid.uuid4())
    }

    body = [{
        'text': text
    }]

    try:
        request = requests.post(url, params=params, headers=headers, json=body)
        response = request.json()
        translations = response[0]['translations']
        txt = translations[0]['text']

    except Exception as e:
        print(e)
        raise TranslationError
    
    response = {
        "language_from": LANGUAGES['en'],
        "language_from_code": 'en',
        "language_to": LANGUAGES[lang_to],
        "language_to_code": lang_to,
        "text_to": txt,
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
