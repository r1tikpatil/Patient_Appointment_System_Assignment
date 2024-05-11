import apiRequest from "./common/apiCall";

export const getAllPatients = async () => {
  const res = await apiRequest("GET", "patient/patients");
  return res;
};
