from pydantic import BaseModel
from datetime import datetime, time, timedelta
from typing import Optional
from uuid import UUID
from typing import List


class UserBase(BaseModel):
    username:str
    hashed_password: str

    class Config:
        orm_mode = True
        schema_extra={
            "example":{
                "username":"dele",
                "hashed_password": "pass"

            }
        }


class UserCreate(UserBase):
    pass


class ShowCurrentUser(UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True  # Add this line to support from_orm


