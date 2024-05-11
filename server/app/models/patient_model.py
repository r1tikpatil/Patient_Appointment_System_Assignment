from sqlalchemy import Column, Integer, String, ARRAY, TIMESTAMP
from . import Base
from typing import Any
from app.utils.utility import to_dict


class Patient(Base):
    __tablename__ = "Patient"

    patientId = Column(Integer(), primary_key=True)
    firstName = Column(String(255))
    lastName = Column(String(255))
    email = Column(String(255))
    gender = Column(String(1))
    phoneNumber = Column(String(255))
    address = Column(String(255))
    appointmentHistory = Column(ARRAY(TIMESTAMP))

    def dict(self) -> dict[str, Any]:
        return to_dict(self)
