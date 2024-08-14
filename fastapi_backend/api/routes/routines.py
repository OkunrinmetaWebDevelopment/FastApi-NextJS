from pydantic import BaseModel
from fastapi import APIRouter, status,Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from db_models.models import Routine,Workout
from auth.user import get_current_user
from core import config

router = APIRouter(
    prefix='/routines',
    tags=['routines']
)

class RoutineBase(BaseModel):
    name: str
    description: Optional[str] = None
    
class RoutineCreate(RoutineBase):
    workouts: List[int] = []
    
@router.get("/")
def get_routines(db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    return db.query(Routine).options(joinedload(Routine.workouts)).filter(Routine.user_id == user.id).all()

@router.post("/")
def create_routine(routine: RoutineCreate, db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    db_routine = Routine(name=routine.name, description=routine.description, user_id=user.id)
    for workout_id in routine.workouts:
        workout = db.query(Workout).filter(Workout.id == workout_id).first()
        if workout:
            db_routine.workouts.append(workout)
    db.add(db_routine)
    db.commit()
    db.refresh(db_routine)
    db_routines = db.query(Routine).options(joinedload(Routine.workouts)).filter(Routine.id == db_routine.id).first()
    return db_routines

@router.delete('/')
def delete_routine(routine_id: int, db: Session = Depends(config.get_db), user=Depends(get_current_user)):
    db_routine = db.query(Routine).filter(Routine.id == routine_id).first()
    if db_routine:
        db.delete(db_routine)
        db.commit()
    return db_routine