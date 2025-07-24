from app import models, schemas, crud
from fastapi import APIRouter, Depends, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, get_db
from app.models import User
from app.schemas import UserCreate, ShowUser
from app.utils import hash_password
from sqlalchemy.exc import IntegrityError

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=ShowUser)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    new_user = User(name=user.name, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User already exists")

    return new_user
