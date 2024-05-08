from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Translation(Base):
    __tablename__ = 'translations'
  
    id = Column(Integer, primary_key=True, index=True, unique=True, autoincrement=True)
    language_from = Column(String(), nullable=False)
    language_from_code = Column(String(), nullable=False)
    language_to = Column(String(), nullable=False)
    language_to_code = Column(String(), nullable=False)
    text_from = Column(String(), nullable=False)
    text_to = Column(String(), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    reading_id = Column(Integer, ForeignKey('readings.id'))
    reading = relationship("Reading", back_populates="translations")

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="translations")