const Url = `http://localhost:5001`;

const apiRequest = async (method, endpoint, data = {}) => {
  const url = `${Url}/${endpoint}`;

  let requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    const res = await response.json();
    return res;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
