from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Note(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True, index=True, unique=True, autoincrement=True)
    cfi = Column(String(), nullable=False)
    text = Column(String(), nullable=False)
    note = Column(String(), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    reading_id = Column(Integer, ForeignKey('readings.id'))
    reading = relationship("Reading", back_populates="notes")

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="notes")