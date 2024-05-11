from fastapi import HTTPException, status
from app.models.appointment_model import Appointment
from app.schema.response_schema import ResponseSchema
from sqlalchemy.exc import SQLAlchemyError


class AppointmentService:
    def get_all_appointment(patient_id, db):
        try:
            return ResponseSchema(
                status=200,
                message="Appointments fetched successfully!",
                success=True,
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )

    def create_appointment(appointment_detail, db):
        try:
            return ResponseSchema(
                status=200,
                message="Appointment added successfully!",
                success=True,
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )
