from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Response
from typing_extensions import Annotated
from database import get_db
from sqlalchemy.orm import Session
import services
import schemas 
from typing import List
from pydantic import TypeAdapter


router = APIRouter(
  prefix="/api/highlights", 
  tags=["highlights"], 
  responses={404: {"description": "Not found"}}
)

@router.get("/{reading_id}", response_model=List[schemas.Highlight])
async def read_highlights(
    reading_id: int,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    q = services.get_highlights(db=db, user_id=user.id, reading_id=reading_id)
    items = TypeAdapter(List[schemas.Highlight]).validate_python(q)
    return items


@router.post("/", response_model=schemas.Highlight)
async def create_highlight(
    highlight: schemas.HighlightCreate,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db),
):
    new_highlight = services.create_highlight(
        db=db, 
        highlight=highlight, 
        user_id=user.id, 
        reading_id=highlight.reading_id
    )
    return new_highlight