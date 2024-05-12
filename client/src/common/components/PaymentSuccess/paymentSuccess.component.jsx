import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Appointment Booked Successfully!
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        Your appointment has been successfully booked.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Please check your email for confirmation details.
      </p>
      <p className="text-lg text-gray-700">
        If you have any questions or need to make changes, please contact us.
      </p>
    </div>
  );
};

export default PaymentSuccess;
