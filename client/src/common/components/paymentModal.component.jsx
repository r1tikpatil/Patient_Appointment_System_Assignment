import React, { useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  checkoutSession,
  updatePaymentStatus,
} from "../../APIs/appointmentApis";

const modalStyles = {
  bg: "absolute inset-0 bg-black opacity-50",
  content:
    "relative flex flex-col justify-center items-center bg-white p-4 shadow-lg w-80 rounded-xl",
};

const PaymentModel = ({ closeModal, amount, appointmentId }) => {
  const modalRef = useRef(null);

  const makePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_SECRET_KEY
    );
    const data = {
      amount,
      appointment_id: appointmentId,
    };
    const res = await checkoutSession(data);

    const result = stripePromise.redirectToCheckout({
      sessionId: res.data.session_id,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`${modalStyles.bg} bg-opacity-50 absolute inset-0`}></div>

      <div
        className={`${modalStyles.content} bg-white p-6 rounded-lg shadow-md w-80 text-center relative`}
      >
        <h2 className="text-lg font-bold mb-4">Make Repayment</h2>
        <label className="block mb-2">
          <div className="rounded py-2 px-3 w-full font-semibold bg-gray-100">
            Amount: {amount} ₹
          </div>
        </label>
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded shadow mt-4"
          onClick={makePayment}
        >
          Do Repay
        </button>
        <span
          className="modal-close text-xl font-medium absolute top-2 right-2 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default PaymentModel;
