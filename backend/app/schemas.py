from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int
    gender: str

class ShowUser(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: int
    gender: str

    class Config:
        from_attributes = True  # For Pydantic v2
