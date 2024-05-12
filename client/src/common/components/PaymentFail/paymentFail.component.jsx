import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="text-lg text-gray-700 mb-4">
        Oops! Something went wrong while processing your payment.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Please try again later or contact support for assistance.
      </p>
    </div>
  );
};

export default PaymentFailed;
