export const validateEmail = (email) => {
  //eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  return re.test(email);
};

export const validateCampaignNumber = (number) => {
  //eslint-disable-next-line
  const re =/^([A-Z]{1,3}[0-9]{1,10}|[0-9]{5,13}|[0-9]{1,6}[A-Z]{1,1}|[A-Z]{1,3}[0-9]{1,6}[A-Z]{1,2}|[0-9]{3}\s[0-9]{2}\s[0-9]{3})$/;
  return re.test(number);
};

//eslint-disable-next-line
export const urlRegExp =
    /^(http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const checkingAndEditingLink = link => {
  if (link.trim().slice(0,4) === 'http'){
    return link
  }else{
    return `https://${link}`
  }
}

export const validateUrl = (url) => {
  return urlRegExp.test(url);
};

export const checkCurrentResolution = () => {
  if (typeof window !== "undefined") {
    if (screen.width > 1280) {
      return 1920;
    }
    if (screen.width > 1024 && screen.width <= 1280) {
      return 1280;
    }
    if (screen.width > 768 && screen.width <= 1024) {
      return 1024;
    }
    if (screen.width > 480 && screen.width <= 768) {
      return 768;
    }
    if (screen.width <= 480) {
      return 480;
    }
  }
  return 1920;
};

export const chooseCorrectResolution = (imageList) => {
  const imageSize = checkCurrentResolution();
  for (let key in imageList) {
    if (Number(key.replace(/\D/g, "")) === Number(imageSize)) {
      return imageList[key]
        ? imageList[key]
        : imageList[Object.keys(imageList)[0]];
    }
  }
};

export const convertStatusToText = (status, language='en') => {
  switch (status) {
    case 1:
      return language === 'en'?"UPCOMING":"KOMMANDE";
    case 2:
      return language === 'en'?"COMPLETED":"AVSLUTAD";
    case 3:
      return "LIVE";
    case 4:
      return  language === 'en'?"SUCCESSFULLY CLOSED":"Stängt";
    default:
      return null;
  }
};

export const createYearList = () => {
  let currentYear = new Date().getFullYear();
  const years = [];
  let lastYear = 1920;
  while (currentYear > lastYear) {
    years.push(currentYear--);
  }
  return years;
};

export const getDays = (month) => {
  let startDay = 1;
  let days = [];
  if (
    month === "January" ||
    month === "March" ||
    month === "May" ||
    month === "July" ||
    month === "August" ||
    month === "October" ||
    month === "December" ||
    month === "1" ||
    month === "3" ||
    month === "5" ||
    month === "7" ||
    month === "8" ||
    month === "10" ||
    month === "12"
  ) {
    while (startDay <= 31) {
      days.push(startDay++);
    }
    return days;
  }
  if (
    month === "April" ||
    month === "June" ||
    month === "September" ||
    month === "November" ||
    month === "4" ||
    month === "6" ||
    month === "9" ||
    month === "11"
  ) {
    while (startDay <= 30) {
      days.push(startDay++);
    }
    return days;
  }
  if (month === "February" || month === "2") {
    while (startDay <= 28) {
      days.push(startDay++);
    }
    return days;
  }
};

export const months = [
  { id: 1, month: "January", monthSw: 'Januari'},
  { id: 2, month: "February", monthSw: 'Februari' },
  { id: 3, month: "March", monthSw: 'Mars' },
  { id: 4, month: "April", monthSw: 'April' },
  { id: 5, month: "May", monthSw: 'Maj' },
  { id: 6, month: "June", monthSw: 'Juni' },
  { id: 7, month: "July", monthSw: 'Juli' },
  { id: 8, month: "August", monthSw: 'Augusti' },
  { id: 9, month: "September", monthSw: 'September' },
  { id: 10, month: "October", monthSw: 'Oktober' },
  { id: 11, month: "November", monthSw: 'November' },
  { id: 12, month: "December", monthSw: 'December' },
];
