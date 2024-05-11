from fastapi import HTTPException, status
from app.models.patient_model import Patient
from app.schema.response_schema import ResponseSchema
from sqlalchemy.exc import SQLAlchemyError


class PatientService:
    def add_patient(db):
        try:
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )
