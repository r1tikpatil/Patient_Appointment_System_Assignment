import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPatientsDetail } from "../../APIs/patientApis";
import { getAppointments } from "../../APIs/appointmentApis";
import { formatDateTime } from "../../utils/helperFunctions";
import PaymentModel from "../../common/components/paymentModal.component";
import Loader from "../../common/components/LoaderComponent/loader.component";

const PatientDetail = () => {
  const params = useParams();
  const patientId = params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [appointmentId, setAppointmentId] = useState(null);

  const openModal = (isPaid, amount, id) => {
    if (!isPaid) {
      setAmount(amount);
      setIsModalOpen(true);
      setAppointmentId(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFetchInfo = async () => {
    setLoading(true);
    try {
      const res = await getPatientsDetail(patientId);
      if (res.success) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleFetchAppointment = async () => {
    try {
      const res = await getAppointments(patientId);
      if (res.success) {
        setAppointment(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchInfo();
    handleFetchAppointment();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-2xl mb-4">Patient Details</div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <Loader />
        ) : (
          <div className="p-4">
            <div className="mb-4">
              <span className="font-bold">Name: </span>
              {`${data.firstName} ${data.lastName}`}
            </div>
            <div className="mb-4">
              <span className="font-bold">Gender: </span>
              {data.gender}
            </div>
            <div className="mb-4">
              <span className="font-bold">Phone Number: </span>
              {data.phoneNumber}
            </div>
            <div className="mb-4">
              <span className="font-bold">Address: </span>
              {data.address}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email: </span>
              {data.email}
            </div>
            {isModalOpen && (
              <PaymentModel
                closeModal={closeModal}
                amount={amount}
                appointmentId={appointmentId}
              />
            )}
            {appointments.length !== 0 ? (
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <div className="text-xl font-bold mb-4 text-gray-800">
                  Appointments:
                </div>
                <ul className="divide-y divide-gray-300">
                  {appointments.map((appointment) => {
                    const { appointmentId, amount, date } = appointment;
                    const isPaid = appointment.isPaid == "1";
                    return (
                      <li key={appointment.appointmentId} className="py-4">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col justify-between items-start">
                            <div className="text-lg font-semibold text-gray-700">
                              Time: {formatDateTime(date)}
                            </div>
                            <div className="text-lg text-gray-600">
                              Amount: ${amount}
                            </div>
                          </div>

                          <div
                            className={`${
                              !isPaid && "cursor-pointer"
                            } px-4 py-2 rounded ${
                              isPaid
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                            onClick={() =>
                              openModal(isPaid, amount, appointmentId)
                            }
                          >
                            <span className="text-white">
                              {isPaid ? "Paid" : "Pay Now"}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p className="font-medium">No Appointments yet!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;
