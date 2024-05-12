import React, { useRef, useState } from "react";
import { addPatient } from "../../APIs/patientApis";

const modalStyles = {
  bg: "absolute inset-0 bg-black opacity-50",
  content:
    "relative flex flex-col justify-center items-center bg-white p-4 shadow-lg  w-80 rounded-xl",
};

const defaulValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: "",
  address: "",
  email: "",
};

const AddPatientModal = ({ closeModal }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState(defaulValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    for (const key in formData) {
      if (formData[key] === "") {
        alert("All fields are required.");
        return;
      }
    }
    try {
      const res = await addPatient(formData);
      if (res.success) {
        setFormData(defaulValues);
        closeModal();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenderChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 1);
    if (value === "M" || value === "F") {
      setFormData({
        ...formData,
        gender: value,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className={modalStyles.bg}></div>

      <div className={modalStyles.content} ref={modalRef}>
        <div
          onClick={closeModal}
          className="text-3xl right-3 absolute top-2 cursor-pointer rotate-45 text-red-700"
        >
          +
        </div>
        <h2 className="text-lg font-bold mb-4 text-center">Add Patient</h2>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          maxLength={10}
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleGenderChange}
          placeholder="Gender (M/F)"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />

        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default AddPatientModal;
