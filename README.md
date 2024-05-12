# Patient Appointment System

Welcome to the Patient Appointment System! This web application allows patients to schedule appointments with healthcare providers. It is built using React.js for the frontend, FastAPI for the backend, and SQL database for data storage. Additionally, it integrates Stripe for payment processing.

## Features

- **Appointment Scheduling**: Patients can conveniently schedule appointments.
- **Payment Integration**: Secure payment processing through Stripe for appointment bookings.
- **Patient Management**: Easily add patients and view their details within the system.

## Technologies Used

- **Frontend**: React.js
- **Backend**: FastAPI
- **Database**: MySQL
- **Payment Integration**: Stripe

## Setup

### Clone this repository to your local machine:

```bash
git clone https://github.com/r1tikpatil/Patient_Appointment_System_Assignment
```

### Frontend

1. Open a terminal.

2. Navigate to the client directory:

```bash
cd client
```

3. Install dependencies using

```bash
npm install
```

4. Setting up Environment Variables

Copy the `.env.example` file to create a new `.env` file:

```bash
cp .env.example .env
```

5. Edit the `.env` file and provide appropriate values for the environment variables.

6. Start the development server using `npm start`.

This will start the server on http://localhost:3000.

### Backend

1. Open a new terminal

2. Navigate to the server directory:

```bash
cd server
```

3. Create a virtual environment (recommended) using `venv` or `virtualenv`:

   ```bash
   # Using venv
   python -m venv venv

   # Activate the virtual environment
   source ./venv/Scripts/activate
   ```

4. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Setting up Environment Variables

1. Copy the `.env.example` file to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and provide appropriate values for the environment variables.

## Running the service

To run the service, use the following command:

```bash
python -m uvicorn app.main:app --reload --port 5001
```

This will start the server on http://localhost:5001.

You can now access the Swagger UI for interactive documentation at http://localhost:5001/docs.

### Database

1. Setup MySQL database.
2. Update the database configuration in `.env` with your database credentials.

### Payment Integration (Stripe)

1. Sign up for a Stripe account at https://stripe.com/.
2. Obtain your Stripe API keys.
3. Update the Stripe API keys in your frontend and backend code where necessary.
