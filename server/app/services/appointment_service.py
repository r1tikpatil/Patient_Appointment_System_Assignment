from fastapi import HTTPException, status
from app.models.appointment_model import Appointment
from app.models.patient_model import Patient
from app.schema.response_schema import ResponseSchema
from sqlalchemy.exc import SQLAlchemyError
from app.config.env import env
import stripe

stripe.api_key = env.STRIPE_SECRET_KEY


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

    def make_payment(checkout_session_detail):
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "inr",
                            "product_data": {
                                "name": "Patient Appointment System",
                            },
                            "unit_amount": checkout_session_detail.amount * 100,
                        },
                        "quantity": 1,
                    },
                ],
                mode="payment",
                success_url=f"http://localhost:3000/success-payment/{checkout_session_detail.appointment_id}",
                cancel_url="http://localhost:3000/fail-payment",
            )
            return ResponseSchema(
                status=200,
                success=True,
                message="success",
                data={"session_id": session.id},
            )
        except stripe.error.CardError as e:
            raise HTTPException(status_code=e.http_status, detail=str(e))
        except stripe.error.StripeError as e:
            raise HTTPException(status_code=e.http_status, detail=e._message)

    def update_payment_status(appointment_id, db):
        try:
            appointment = (
                db.query(Appointment).filter_by(appointmentId=appointment_id).first()
            )
            if not appointment:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No appointment exist",
                )
            appointment.isPaid = True
            db.commit()
            return ResponseSchema(
                status=200,
                message="Payment status updated successfully!",
                success=True,
            )
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=e.args[0]
            )
