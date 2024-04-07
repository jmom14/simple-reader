from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Reading, User
import boto3
import schemas
import os


AWS_SIMPLE_READER_BUCKET = os.environ.get('AWS_SIMPLE_READER_BUCKET')
AWS_BOOKS_OBJECT = os.environ.get('AWS_BOOKS_OBJECT')

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    region_name=os.environ.get('AWS_REGION'),
)


def upload_reading(user_id, file, filename):
    url = f"https://{AWS_SIMPLE_READER_BUCKET}.s3.us-west-1.amazonaws.com/{AWS_BOOKS_OBJECT}/{user_id}/{filename}"
    try:
        response = s3_client.put_object(
            Bucket=AWS_SIMPLE_READER_BUCKET,
            Key=f"{AWS_BOOKS_OBJECT}/{user_id}/{filename}",
            Body=file
        )
        return {"success": True, "url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
def get_readings(db: Session, user_id: str):
    return db.query(Reading).filter(Reading.user_id == user_id).all()


def create_reading(db: Session, reading, file, user: User):
    new_reading = Reading(
        title=reading.title,
        author=reading.author,
        cover_image_file=reading.cover_image_file,
        file=file,
        user=user
    )
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)
    return new_reading