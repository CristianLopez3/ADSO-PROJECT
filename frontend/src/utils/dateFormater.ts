type Mix = string | number;

export const formatedDate = (datetime: string) => {
  const date = new Date(datetime);
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} de ${monthNames[monthIndex]} del ${year}`;
};

export const formatedHour = (datetime: string) => {
  const date = new Date(datetime);
  let hours: Mix = date.getHours();
  let minutes: Mix = date.getMinutes();
  // let seconds: Mix = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? '0'+ seconds : seconds;

  return `${hours}:${minutes} ${ampm}`;
};


export const  currentFormatedDate = (timestamp: number): string => {
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day < 10 ? '0' : ''}${day},  ${year}`;
}