import apiRequest from "./common/apiCall";

export const getAllPatients = async () => {
  const res = await apiRequest("GET", "patient/patients");
  return res;
};

export const getPatientsDetail = async (id) => {
  const res = await apiRequest("GET", `patient/${id}`);
  return res;
};

export const addPatient = async (data) => {
  const res = await apiRequest("POST", `patient/`, data);
  return res;
};
