from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Patient(BaseModel):
    id: int
    name: str
    phone: str
    age: int
    gender: str
    address: Optional[str]
    created_at: datetime
