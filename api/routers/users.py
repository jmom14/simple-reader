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
async def get_users(db: Session = Depends(get_db)):

    return services.get_users(db=db)


@router.get("/me/", response_model=schemas.User)
async def me(user: Annotated[schemas.User, Depends(services.get_current_active_user)]):
    return user


@router.put("/{user_id}", response_model=schemas.User)
async def update_user(user_id: str, user_update: schemas.UserUpdate, user: Annotated[schemas.User, Depends(services.get_current_active_user)], db: Session = Depends(get_db)):
    db_user = services.get_user_by_id(db=db, id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated = await services.update_user(db=db, db_user=db_user, user_update=user_update.model_dump())
    return updated
