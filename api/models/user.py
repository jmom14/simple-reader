from sqlalchemy import Column, Integer, String, Boolean
from typing import Union
from . import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    is_disabled = Column(Boolean, default=True)
