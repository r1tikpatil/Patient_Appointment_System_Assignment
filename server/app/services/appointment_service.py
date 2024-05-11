from fastapi import HTTPException, status
from app.models.appointment_model import Appointment
from app.models.patient_model import Patient
from app.schema.response_schema import ResponseSchema
from sqlalchemy.exc import SQLAlchemyError


class AppointmentService:
    def get_all_appointment(patient_id, db):
        try:
            all_appointments = (
                db.query(Appointment).filter_by(patientId=patient_id).all()
            )
            data = [appointment.dict() for appointment in all_appointments]
            return ResponseSchema(
                status=200,
                message="Appointments fetched successfully!",
                success=True,
                data=data,
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )

    def create_appointment(appointment_detail, db):
        try:
            patient = (
                db.query(Patient)
                .filter_by(patientId=appointment_detail.patientId)
                .first()
            )

            # Check if patient found
            if not patient:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Patient doest not exist",
                )
            else:
                # Dump assets data into a dictionary
                item_dict = appointment_detail.model_dump()

                appointment_detail_model = Appointment(**item_dict)

                db.add(appointment_detail_model)
                db.commit()

            return ResponseSchema(
                status=200,
                message="Appointment added successfully!",
                success=True,
                data=appointment_detail_model.dict(),
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )
