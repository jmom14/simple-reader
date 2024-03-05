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


@router.get("/", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):

    return services.get_users(db=db)


@router.get("/me/", response_model=schemas.User)
async def read_users_me(current_user: Annotated[schemas.User, Depends(services.get_current_active_user)]):
    return current_user
