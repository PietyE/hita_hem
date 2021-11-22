import * as yup from 'yup';

// const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
//eslint-disable-next-line
export const phoneRegExp = /^\+(\d{2})([0-9 \.\/\?(?)]{6,11})(\d{1})$/
// export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/
export const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/
//eslint-disable-next-line
export const websiteRegExp = /^(http:\/\/|https:\/\/|)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
const urlRegExp = /^(http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
//eslint-disable-next-line
export const personalIdRegExp =  /^([a-zA-Z\d]{1})([+/a-z A-Z\d-\.,]{6,11})([a-zA-z1\d]{1})$/
