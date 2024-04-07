from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Response
from typing_extensions import Annotated
from utils.epub import Epub
from sqlalchemy.orm import Session
from database import get_db
import services
import schemas 
from typing import List


EPUB_FORMAT = "application/epub+zip"

router = APIRouter(
  prefix="/api/readings", 
  tags=["readings"], 
  responses={404: {"description": "Not found"}}
)


@router.get("/")
async def read_readings(
  user: Annotated[schemas.User, Depends(services.get_current_active_user)],
  db: Session = Depends(get_db)
):
  readings = services.get_readings(db=db, user_id=user.id)
  return {"readings": readings}


@router.post("/")
async def upload_book(
    reading: schemas.ReadingCreate,
    file: UploadFile,
    user: Annotated[schemas.User, Depends(services.get_current_active_user)],
    db: Session = Depends(get_db)
):
    if file.content_type != EPUB_FORMAT:
        raise HTTPException(status_code=400, detail="File format is Incorrect")
    
    if not file:
      raise HTTPException(status_code=400, detail="File must not be empty")
    
    response = services.upload_reading(user.id, file.file, file.filename)
    if response["success"]: 
      
      created_reading = services.create_reading(db=db, reading=reading, file=response["url"], user=user)
      
      if created_reading == None:
         return Response(status_code=400)
         
      return Response(status_code=200)
      
      
