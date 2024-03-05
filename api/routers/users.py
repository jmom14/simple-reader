from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from typing import List
from typing_extensions import Annotated
import schemas 
import services

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = services.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return services.create_user(db=db, user=user)


@router.get("/", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):

    return services.get_users(db=db)


@router.get("/me/", response_model=schemas.User)
async def read_users_me(current_user: Annotated[schemas.User, Depends(services.get_current_active_user)]):
    return current_user
