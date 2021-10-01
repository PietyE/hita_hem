import * as yup from 'yup';

// const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
//eslint-disable-next-line
export const phoneRegExp = /^\+(\d{2})([0-9 \.\/\?(?)]{6,11})(\d{1})$/
export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
//eslint-disable-next-line
const urlRegExp = /^(http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
//eslint-disable-next-line
export const personalIdRegExp =  /^([a-zA-Z\d]{1})([+/a-z A-Z\d-\.,]{6,11})([a-zA-z1\d]{1})$/
// const FILE_SIZE = 3145728;
// const SUPPORTED_FORMATS = [
//   'image/jpg',
//   'image/jpeg',
//   'image/png'
// ];

// export const personalDetailsCreateSchema = yup.object({
//   address: yup.object().shape({
//     country: yup.string().required('Country is a required field'),
//     city: yup.string().max(256).required('City is a required field'),
//     address: yup.string().max(400).required('Address is a required field'),
//   }),
//   first_name: yup.string().max(100).required('First name is a required field'),
//   second_name: yup.string().max(100).required('Last name is a required field'),
//   is_agree: yup.bool().oneOf([true]),
//   day: yup.number().required('Day is a required field'),
//   month: yup.number().required('Month is a required field'),
//   year: yup.number().required('Year is a required field'),
//   personal_id: yup.string().matches(personalIdRegExp, 'example 12345678-1234').required('Personal ID is a required field'),
//   phone_number: yup.string().matches(phoneRegExp, 'example +49 1234567890').required('Phone number is a required field'),
// })
// export const personalDetailsUpdateSchema = yup.object({
//   address: yup.object().shape({
//     country: yup.string(),
//     city: yup.string().max(256).test('city', '"City" cannot be empty', val => val?.length),
//     address: yup.string().max(400).test('address', '"Address" cannot be empty', val => val?.length),
//   }),
//   first_name: yup.string().max(100).test('first_name', '"First name" cannot be empty', val => val?.length),
//   second_name: yup.string().max(100).test('second_name', '"Last name" cannot be empty', val => val?.length),
//   day: yup.number('Day is a required field'),
//   month: yup.number('Month is a required field'),
//   year: yup.number('Year is a required field'),
//   personal_id: yup.string().matches(personalIdRegExp, 'example 12345678-1234').test('personal_id', '"Personal ID" cannot be empty', val => val),
//   phone_number: yup.string().matches(phoneRegExp, 'example +49 1234567890').test('phone_number', '"Phone number" cannot be empty', val => val?.length),
// })


// export const accountSettingsResetEmailSchema = yup.object({
//   email: yup.string().email('example test@test.com').max(80).required('Email is a required field'),
//   password: yup
//       .string().max(128)
//       .required('Password is a required field'),
// })

// export const accountSettingsResetPasswordSchema = yup.object({
//   old_password: yup
//       .string().max(128)
//       .required('Password is a required field'),
//   new_password1: yup.string().max(128).matches(passwordRegExp, 'Password must have at least 8 characters that include at least 1 uppercase character, 1 number and 1 special character in (!@#$%^&*)').required('New password is a required field'),
//   new_password2: yup
//       .string().required('Confirm password is a required field').max(128)
//       .when('new_password1', {
//         is: password => (password && password.length > 0 ? true : false),
//         then: yup.string().oneOf([yup.ref('new_password1')], "Password doesn't match")
//       })
// })

// export  const signInSchema = yup.object({
//   email: yup.string().email('example test@test.com').max(80).required('Email is a required field'),
//   password: yup
//       .string().max(128)
//       .required('Password is a required field'),
// })
// export const signUpSchema = yup.object({
//   email: yup.string().email('example test@test.com').max(80).required('Email is a required field'),
//   password: yup
//       .string().max(128)
//       .matches(passwordRegExp, 'Password must have at least 8 characters that include at least 1 uppercase character, 1 number and 1 special character in (!@#$%^&*)')
//       .required('Password is a required field'),
//   is_agree: yup.bool().oneOf([true])
// })
// export  const resetPasswordSchema = yup.object({
//   email: yup.string().email('example test@test.com').max(80).required('Email is a required field'),
// })



// export const raiseForm1 = yup.object({
//   first_name: yup.string().min(1).max(80).required('First name is a required field'),
//   second_name: yup.string().min(1).max(80).required('Last name is a required field'),
//   email: yup.string().email('example test@test.com').max(80).required('Email is a required field'),
//   phone: yup.string().matches(phoneRegExp, 'example +49 1234567890').required('Phone number is a required field'),
//   country: yup.string().required('Country is a required field'),
// })

// export const raiseForm2 = yup.object({
//   company_name: yup.string().min(2).max(200).required('Company name is a required field'),
//   company_form: yup.string().max(200).required('Form of the company is a required field'),
//   role: yup.string().max(200).required('Role in the company is a required field'),
//   share_price: yup.number().typeError('Company % for shares must be a number').required('Company % for shares is a required field').min(0,'Company % for shares must be >= 0'),
//   revenue: yup.number().min(0,'Revenue must be >= 0').typeError('Revenue  must be a number'),
//   amount: yup.number().typeError('Amount must be a number').required('Amount you want to raise is a required field').min(0,'Amount must be >= 0'),
// })

// export const raiseForm3 = yup.object({
//   website: yup.string().url('example https://accumeo.com'),
//   video_preview: yup.string().url('example https://youtube.com/.....'),
//   social_one: yup.string().url('example https://facebook.com/...')
//       .when('followers_count_one', {
//         is: (el => el && el >= 0 ? true : false),
//         then: yup.string().url().required('Fill out this social media field'),
//       }),
//   followers_count_one: yup.number().typeError('Number of followers must be a number').min(0,'Number of followers must be >= 0'),
//   social_two: yup.string().url('example https://twitter.com/...').when('followers_count_two', {
//     is: (el => el && el >= 0 ? true : false),
//     then: yup.string().url().required('Fill out this social media field'),
//   }),
//   followers_count_two: yup.number().typeError('Number of followers must be a number').min(0,'Number of followers must be >= 0'),
//   social_three: yup.string().url('example https://linkedin.com/...').when('followers_count_three', {
//     is: (el => el && el >= 0 ? true : false),
//     then: yup.string().url().required('Fill out this social media field'),
//   }),
//   followers_count_three: yup.number().typeError('Number of followers must be a number').min(0,'Number of followers must be >= 0'),
// })

export const raiseForm4 = yup.object({
  is_agree: yup.bool().oneOf([true]),
  comments: yup.string(),
  documents: '',
})