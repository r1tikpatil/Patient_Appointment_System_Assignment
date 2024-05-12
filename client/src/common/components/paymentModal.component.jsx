import React, { useRef } from "react";

const PaymentModel = ({ closeModal, amount }) => {
  const modalStyles = {
    bg: "absolute inset-0 bg-black opacity-50",
    content:
      "relative flex flex-col justify-center items-center bg-white p-4 shadow-lg h-80 w-80 rounded-xl",
  };
  const modalRef = useRef(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className={modalStyles.bg}></div>

      <div className={modalStyles.content} ref={modalRef}>
        <h2 className="text-lg font-bold mb-4 text-center">Make Repayment</h2>
        <label className="block mb-2 text-center">
          <div className="rounded py-2 px-3 w-full font-semibold">
            amount: {amount} ₹
          </div>
        </label>
        <button
          className="bg-pink-500 hover:bg-pink-700 w-max text-white font-bold py-2 px-4 rounded shadow mt-2"
          //   onClick={handlePaymentSubmit}
        >
          Do Repay
        </button>
        <span
          className="modal-close text-xl font-medium absolute bottom-0 mb-8 cursor-pointer"
          onClick={closeModal}
        >
          &times; close
        </span>
      </div>
    </div>
  );
};

export default PaymentModel;
