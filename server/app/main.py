from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import patient_router, appointment_router

app = FastAPI()

# allow cors
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"msg": "Welcome to Patient Appointment System service"}


# initialize patient router
app.include_router(patient_router.router, prefix="/patient", tags=["Patient"])

# initialize appointment router
app.include_router(
    appointment_router.router, prefix="/appointment", tags=["Appointment"]
)
