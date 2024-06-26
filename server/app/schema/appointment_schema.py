from pydantic import BaseModel
from datetime import datetime


class AppointmentSchema(BaseModel):
    patientId: int
    date: datetime
    amount: int


class CreateCheckoutSessionSchema(BaseModel):
    amount: int
    appointment_id: int
