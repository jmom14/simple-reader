from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import os


class Reading(Base):
    __tablename__ = 'readings'

    id = Column(Integer, primary_key=True, index=True, unique=True, autoincrement=True)
    title = Column(String)
    author = Column(String)
    cover_image_file = Column(String, nullable=True)
    file = Column(String, nullable=False)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="readings")

    highlights = relationship("Highlight", back_populates="reading")
    notes = relationship("Note", back_populates="reading")
    translations = relationship("Translation", back_populates="reading")