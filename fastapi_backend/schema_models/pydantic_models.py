from pydantic import BaseModel, Field
from typing import List
from uuid import UUID


class FileUplodBase(BaseModel):
    file_name:str
    file_id: str

class FileUploadBaseDb(FileUplodBase):
    id:int
    class config:
        orm_mode=True
