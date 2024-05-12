import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPatientsDetail } from "../../APIs/patientApis";

const PatientDetail = () => {
  const params = useParams();
  const patientId = params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    handleFetchInfo();
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;
