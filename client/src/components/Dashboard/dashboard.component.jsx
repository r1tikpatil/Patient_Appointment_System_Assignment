import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllPatients } from "../../APIs/patientApis";
import AddPatientModal from "../../common/components/addPatientModal.component";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAllPatients = async () => {
    setLoading(true);
    try {
      const res = await getAllPatients();
      if (res.success) setAllPatientsList(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleAddAppointment = (id) => {
    navigate(`/addAppointment/${id}`);
  };

  const handleAddPatient = () => {
    openModal();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-20 max-w-[80%]">
        <div className=" my-4 flex justify-between">
          <span className="text-2xl">Patient List</span>
          <button
            onClick={handleAddPatient}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Patient
          </button>
        </div>
        {isModalOpen && <AddPatientModal closeModal={closeModal} />}
        {!loading ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allPatientsList.map((patient) => (
                  <tr key={patient.patientId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{`${patient.firstName} ${patient.lastName}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleAddAppointment(patient.patientId)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Add Appointment
                      </button>
                      <button
                        onClick={() => handleClick(patient.patientId)}
                        className="text-indigo-600 hover:text-indigo-900 ml-2"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>loading...</>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
