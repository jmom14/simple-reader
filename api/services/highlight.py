from sqlalchemy.orm import Session
from models import Highlight


def get_highlights(db: Session, user_id: int, reading_id: int):
    return db.query(Highlight).filter(Highlight.user_id==user_id)\
        .filter(Highlight.reading_id==reading_id)\
        .all()

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