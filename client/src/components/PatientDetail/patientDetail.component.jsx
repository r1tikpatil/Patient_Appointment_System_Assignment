import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPatientsDetail } from "../../APIs/patientApis";
import { getAppointments } from "../../APIs/appointmentApis";
import { formatDateTime } from "../../utils/helperFunctions";

const PatientDetail = () => {
  const params = useParams();
  const patientId = params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointment] = useState([]);

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
          <div className="p-4">Loading...</div>
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
            <div>
              <div className="text-xl font-bold mb-2">Appointments:</div>
              <ul className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <li key={appointment.appointmentId} className="py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col justify-between items-center py-2">
                        <div className="text-lg font-semibold">
                          {formatDateTime(appointment.date)}
                        </div>
                        <div className="text-lg">
                          amount : {appointment.amount}
                        </div>
                      </div>

                      <div>
                        <span
                          className={
                            appointment.isPaid == "0"
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {appointment.isPaid == "0" ? "Pay" : "Paid"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;
