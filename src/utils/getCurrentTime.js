const monthNames = [
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
  
  export const getCurrentTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
  
    const amOrPm = hour < 12 ? "AM" : "PM";
  
    const monthName = monthNames[month];
  
    return `${hour}:${minutes}${amOrPm} - ${monthName}, ${day}, ${year}.`;
  };
  