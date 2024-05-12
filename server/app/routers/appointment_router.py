from fastapi import APIRouter, Depends
from app.utils.database import get_db
from sqlalchemy.orm import Session
from app.services.appointment_service import AppointmentService
from app.schema.appointment_schema import AppointmentSchema, CreateCheckoutSessionSchema

router = APIRouter()


@router.get("/{patient_id}")
async def get_appointment(patient_id: int, db: Session = Depends(get_db)):
    return AppointmentService.get_all_appointment(patient_id, db)


@router.post("/")
async def create_appointment(
    appointment_detail: AppointmentSchema, db: Session = Depends(get_db)
):
    return AppointmentService.create_appointment(appointment_detail, db)


@router.post("/make_payment")
async def make_payment(checkout_session_detail: CreateCheckoutSessionSchema):
    return AppointmentService.make_payment(checkout_session_detail)
