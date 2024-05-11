from sqlalchemy import Column, Integer, String
from . import Base
from typing import Any
from app.utils.utility import to_dict


class Patient(Base):
    __tablename__ = "Patients"

    patientId = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    gender = Column(String)
    phoneNumber = Column(String)
    address = Column(String)

    def dict(self) -> dict[str, Any]:
        return to_dict(self)
