import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Numeric, DateTime,Float,Table
from sqlalchemy.dialects.postgresql import UUID, ARRAY, TSVECTOR, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import Column
from core.base_class import Base
from db_models.db_serializer import TextPickleType



workout_routine_association = Table(
    'workout_routine', Base.metadata,
    Column('workout_id', Integer, ForeignKey('workouts.id')),
    Column('routine_id', Integer, ForeignKey('routines.id'))
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


class HashedToken(Base):
    __tablename__ = "hashed_tokens"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    hashed_token = Column(String, index=True)


class Workout(Base):
    __tablename__ = 'workouts'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String, index=True)
    description = Column(String, index=True)
    routines = relationship('Routine', secondary=workout_routine_association, back_populates='workouts')


class Routine(Base):
    __tablename__ = 'routines'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String, index=True)
    description = Column(String, index=True)
    workouts = relationship('Workout', secondary=workout_routine_association, back_populates='routines')


Workout.routines = relationship('Routine', secondary=workout_routine_association, back_populates='workouts')