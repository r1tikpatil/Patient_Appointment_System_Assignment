from sqlalchemy import Column, Integer, TIMESTAMP
from . import Base
from typing import Any
from app.utils.utility import to_dict


class Appointment(Base):
    __tablename__ = "Appointment"

    appointmentId = Column(Integer, primary_key=True, autoincrement=True)
    patientId = Column(Integer)
    date = Column(TIMESTAMP)
    amount = Column(Integer)

    def dict(self) -> dict[str, Any]:
        return to_dict(self)
