from fastapi import APIRouter, Depends
from typing import Annotated, Union
from utils.auth import User, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token, fake_users_db

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get("/me/", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@router.get("/me/items/")
async def read_own_items(current_user: Annotated[User, Depends(get_current_active_user)]):
    return [{"item_id": "Foo", "owner": current_user.username}]