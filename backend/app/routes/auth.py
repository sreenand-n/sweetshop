from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = register_user(db, data)
    return user


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, data.email, data.password)
    return {
        "access_token": result["access_token"],
        "token_type": "bearer",
        "user": UserResponse.from_orm(result["user"])
    }
