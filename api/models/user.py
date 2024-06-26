from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    password = Column(String, nullable=True)
    email = Column(String, nullable=False, unique=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    is_disabled = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    readings = relationship("Reading", back_populates="user")
    highlights = relationship("Highlight", back_populates="user")
    notes = relationship("Note", back_populates="user")
    translations = relationship("Translation", back_populates="user")
