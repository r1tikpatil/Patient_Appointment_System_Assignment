export const formatDateTime = (dateTimeString) => {
  const datetime = new Date(dateTimeString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDatetime = `${
    months[datetime.getMonth()]
  } ${datetime.getDate()}, ${datetime.getFullYear()} ${datetime.toLocaleTimeString()}`;

  return formattedDatetime;
};

export const currentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDateTime;
};
