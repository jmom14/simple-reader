from sqlalchemy import select
from sqlalchemy.orm import Session
from models import Highlight, Reading


def get_highlights(db: Session, user_id: int, reading_id: int = None):
    q = select(
            Highlight.id, 
            Highlight.cfi, 
            Highlight.text, 
            Highlight.user_id, 
            Highlight.created_at, 
            Highlight.reading_id, 
            Reading.title.label("reading_title")
        ) \
        .join(Highlight.reading) \
        .filter(Highlight.user_id == user_id)
    
    if reading_id:
        q = q.filter(Highlight.reading_id == reading_id)
    items = db.execute(q)
    return [item._asdict() for item in items]

def create_highlight(db: Session, highlight, reading_id, user_id):
    new_highlight = Highlight(
        cfi=highlight.cfi,
        text=highlight.text,
        reading_id=reading_id,
        user_id=user_id,
    )
    db.add(new_highlight)
    db.commit()
    db.refresh(new_highlight)
    return new_highlight