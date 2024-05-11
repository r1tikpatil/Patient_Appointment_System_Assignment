from pydantic import BaseModel


class PatientSchema(BaseModel):
    firstName: str
    lastName: str
    email: str
    gender: str
    phoneNumber: str
    address: str
