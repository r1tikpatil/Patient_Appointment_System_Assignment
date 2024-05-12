import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { addAppointment } from "../../APIs/appointmentApis";
import { currentTime } from "../../utils/helperFunctions";

const AddAppointment = () => {
  const params = useParams();
  const navigation = useNavigate();

  const patientId = params.id;

  const [dateTime, setDateTime] = useState("");
  const [amount, setAmount] = useState();

  useEffect(() => {
    const time = currentTime();
    setDateTime(time);
  }, []);

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        patientId,
        date: dateTime,
        amount,
      };
      const res = await addAppointment(data);
      if (res.success) {
        setDateTime("");
        setAmount(0);
        setTimeout(() => {
          navigation("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
      <div className="flex flex-col space-y-4">
        <label htmlFor="datetime" className="text-lg font-semibold">
          Date & Time
        </label>
        <input
          id="datetime"
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <label htmlFor="amount" className="text-lg font-semibold">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          placeholder="0"
          onChange={handleAmountChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          Add Appointment
        </button>
      </div>
    </div>
  );
};

export default AddAppointment;
