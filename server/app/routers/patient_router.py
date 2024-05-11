from fastapi import APIRouter, Depends
from app.utils.database import get_db
from sqlalchemy.orm import Session
from app.schema.patient_schema import PatientSchema
from app.services.patient_service import PatientService

router = APIRouter()


@router.post("/patient")
async def add_patient(patient_detail: PatientSchema, db: Session = Depends(get_db)):
    return PatientService.add_patient(patient_detail, db)
