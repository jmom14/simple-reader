from sqlalchemy.orm import Session
from models import Note


def get_notes(db: Session, user_id, reading_id):
    return db.query(Note).filter(Note.user_id==user_id)\
        .filter(reading_id==reading_id)\
        .all()

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