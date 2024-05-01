from sqlalchemy import select
from sqlalchemy.orm import Session
from models import Note, Reading


def get_notes(db: Session, user_id, reading_id = None):
    q = select(
            Note.id,
            Note.cfi,
            Note.text,
            Note.note, 
            Note.created_at,
            Note.reading_id,
            Note.user_id,
            Reading.title.label("reading_title")
        ) \
        .join(Note.reading) \
        .filter(Note.user_id==user_id)
    
    if reading_id:
        q = q.filter(Note.reading_id==reading_id)

    items = db.execute(q)
    return [item._asdict() for item in items]


def create_note(db: Session, note, reading_id, user_id):
    new_note = Note(
        cfi=note.cfi,
        text=note.text,
        note=note.note,
        reading_id=reading_id,
        user_id=user_id
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note
