from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status,Depends
from sqlalchemy.orm import Session
from db_models.models import Workout
from auth.user import get_current_user
from core import config


router = APIRouter(
    prefix='/workouts',
    tags=['workouts']
)

class WorkoutBase(BaseModel):
    name: str
    description: Optional[str] = None
    
class WorkoutCreate(WorkoutBase):
    pass


@router.get('/',response_model=None)
def get_workout(workout_id: int, db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    return db.query(Workout).filter(Workout.id == workout_id).first()

@router.get('/workouts')
def get_workouts(db: Session = Depends(config.get_db) , user=Depends(get_current_user)):
    return db.query(Workout).all()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_workout(workout: WorkoutCreate, db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    db_workout = Workout(**workout.model_dump(), user_id=user.id)
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.delete("/")
def delete_workout(workout_id: int, db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    db_workout = db.query(Workout).filter(Workout.id == workout_id).first()
    if db_workout:
        db.delete(db_workout)
        db.commit()
    return db_workout