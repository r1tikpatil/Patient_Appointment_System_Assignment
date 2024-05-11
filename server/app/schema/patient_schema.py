from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PatientSchema(BaseModel):
    firstName: str
    lastName: str
    email: str
    gender: str
    phoneNumber: str
    address: str
    appointment: Optional[datetime] = None
