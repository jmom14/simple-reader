from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Response
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from database import get_db
import services
import schemas 
from typing import List
import os

EPUB_FORMAT = "application/epub+zip"

router = APIRouter(
  prefix="/api/readings", 
  tags=["readings"], 
  responses={404: {"description": "Not found"}}
)


@router.get("/", response_model=List[schemas.Reading])
async def read_readings(
  user: Annotated[schemas.User, Depends(services.get_current_active_user)],
  db: Session = Depends(get_db)
):
  return services.get_readings(db=db, user_id=user.id)


@router.post("/")
async def upload_book(
    reading: schemas.ReadingCreate,
    cover: UploadFile,
    file: UploadFile,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db)
):
    if file.content_type != EPUB_FORMAT:
        raise HTTPException(status_code=400, detail="File format is Incorrect")
    
    if not file:
      raise HTTPException(status_code=400, detail="File must not be empty")
    
    cover_url = None
    file_name, file_extension = os.path.splitext(file.filename)

    file_url = services.upload_reading(user.id, file.file, file_name ,file.filename)
    if cover:
      cover_url = services.upload_reading(user.id, cover.file, file_name , 'cover.jpeg')
    
    created_reading = services.create_reading(db=db, reading=reading, file=file_url, user=user, cover=cover_url)
    
    if created_reading == None:
        return Response(status_code=400)
        
    return Response(status_code=200)
      
      
