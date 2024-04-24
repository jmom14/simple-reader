from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Response
from typing_extensions import Annotated
from database import get_db
from sqlalchemy.orm import Session
import services
import schemas 
from typing import List


router = APIRouter(
  prefix="/api/notes", 
  tags=["notes"], 
  responses={404: {"description": "Not found"}}
)

@router.get("/{reading_id}", response_model=List[schemas.Note])
async def read_notes(
    reading_id: int,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    return services.get_notes(db=db, user_id=user.id, reading_id=reading_id)


@router.post("/", response_model=schemas.Note)
async def create_note(
    note: schemas.NoteCreate,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    new_note = services.create_note(
        db=db, 
        note=note, 
        user_id=user.id,
        reading_id=note.reading_id
    )
    return new_note