from app.database import SessionLocal
from app.models import User

db = SessionLocal()
users = db.query(User).all()
for user in users:
    print(f"ID: {user.id}, Name: {user.name}, Email: {user.email}, Age: {user.age}, Gender: {user.gender}")
db.close()
