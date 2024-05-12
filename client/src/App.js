import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/dashboard.component";
import AddAppointment from "./components/AddAppointment/addAppointment.component";
import PatientDetail from "./components/PatientDetail/patientDetail.component";
import Error from "./common/components/ErrorScreen/error.component";

const App = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />

      <Route path="/addAppointment/:id" element={<AddAppointment />} />
      <Route path="/detail/:id" element={<PatientDetail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
