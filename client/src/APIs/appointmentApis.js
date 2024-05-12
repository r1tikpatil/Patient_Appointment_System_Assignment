import apiRequest from "./common/apiCall";

export const addAppointment = async (data) => {
  const res = await apiRequest("POST", "appointment/", data);
  return res;
};

export const getAppointments = async (id) => {
  const res = await apiRequest("GET", `appointment/${id}`);
  return res;
};

export const checkoutSession = async (data) => {
  const res = await apiRequest("POST", `appointment/make_payment`, data);
  return res;
};
