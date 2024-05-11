from fastapi import HTTPException, status
from app.models.patient_model import Patient
from app.schema.response_schema import ResponseSchema
from sqlalchemy.exc import SQLAlchemyError


class PatientService:
    def add_patient(patient_detail, db):
        try:
            patient = db.query(Patient).filter_by(email=patient_detail.email).first()

            # Check if any patient found
            if patient:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Patient already exist with the given emailId",
                )
            else:
                # Dump assets data into a dictionary
                item_dict = patient_detail.model_dump()

                patient_details_model = Patient(**item_dict)

                db.add(patient_details_model)
                db.commit()

            return ResponseSchema(
                status=200,
                message="Patient added successfully!",
                success=True,
                data=patient_detail.dict(),
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )

    def get_all_patient(db):
        try:
            patients = db.query(Patient).all()
            patients_data = [patient.dict() for patient in patients]

            return ResponseSchema(
                status=200,
                message="Patients fetched successfully!",
                success=True,
                data=patients_data,
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )

    def get_patient_detail(id, db):
        try:
            patient_detail = db.query(Patient).filter_by(patientId=id).first()

            # Check if any patient found
            if not patient_detail:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Patient doest not exist",
                )
            else:
                return ResponseSchema(
                    status=200,
                    message="Patient detail fetched successfully!",
                    success=True,
                    data=patient_detail.dict(),
                )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )
