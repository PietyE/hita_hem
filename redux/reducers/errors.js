import {
  ERROR,
  SET_AUTH_ERROR,
  SET_PROFILE_ERROR,
  SET_RAISE_ERROR,
  CLEAR_ERRORS,
  SET_AUTH_EMAIL_ERROR,
  SET_AUTH_PASSWORD_ERROR,
  SET_AUTH_USER_ERROR,
  SET_AUTH_OLD_PASSWORD_ERROR,
  SET_AUTH_NEW_PASSWORD1_ERROR,
  SET_AUTH_NEW_PASSWORD2_ERROR,
  SET_PROFILE_FIRST_NAME_ERROR,
  SET_PROFILE_SECOND_NAME_ERROR,
  SET_PROFILE_DATE_OF_BIRTH_ERROR,
  SET_PROFILE_COUNTRY_ERROR,
  SET_PROFILE_CITY_ERROR,
  SET_PROFILE_ADDRESS_ERROR,
  SET_PROFILE_PERSONAL_ID_ERROR,
  SET_PROFILE_PHONE_ERROR,
  SET_FORM1_FIRST_NAME_ERROR,
  SET_FORM1_SECOND_NAME_ERROR,
  SET_FORM1_EMAIL_ERROR,
  SET_FORM1_PHONE_ERROR,
  SET_FORM1_COUNTRY_ERROR,
  SET_FORM2_COMPANY_NAME_ERROR,
  SET_FORM2_COMPANY_FORM_ERROR,
  SET_FORM2_ROLE_ERROR,
  SET_FORM2_SHARE_PRICE_ERROR,
  SET_FORM2_REVENUE_ERROR,
  SET_FORM2_AMOUNT_ERROR,
  SET_FORM3_WEBSITE_ERROR,
  SET_FORM3_VIDEO_PREVIEW_ERROR,
  SET_FORM3_SOCIAL_ONE_ERROR,
  SET_FORM3_SOCIAL_TWO_ERROR,
  SET_FORM3_SOCIAL_THREE_ERROR,
  SET_FORM3_FOLLOWERS_ONE_ERROR,
  SET_FORM3_FOLLOWERS_TWO_ERROR,
  SET_FORM3_FOLLOWERS_THREE_ERROR,
  SET_PROFILE_ZIP_ERROR,
  SET_PROFILE_AVATAR_ERROR,
  SET_PROFILE_EMAIL_ERROR,
  CLEAR_PROFILE_ERRORS,
} from "constants/actionsConstant";
import isEmpty from "lodash/isEmpty";

const initialState = {
//   status: "",
//   auth: {
//     password: "",
//     email: "",
//     user: "",
//     old_password: "",
//     new_password1: "",
//     new_password2: "",
//   },
//   profile: {
//     first_name: "",
//     second_name: "",
//     date_of_birth: "",
//     country: "",
//     city: "",
//     address: "",
//     personal_id: "",
//     phone_number: "",
//     payments: [],
//     companies: [],
//   },
//   raise: {
//     first_name: "",
//     second_name: "",
//     email: "",
//     phone: "",
//     country: "",
//     company_name: "",
//     company_form: "",
//     role: "",
//     share_price: "",
//     revenue: "",
//     amount: "",
//     website: "",
//     video_preview: "",
//     social_one: "",
//     social_two: "",
//     social_three: "",
//     followers_count_one: "",
//     followers_count_two: "",
//     followers_count_three: "",
//     documents: {},
//   },
};
export const getRaiseFirstNameErrorSelector = (state) =>
  state.errors?.raise?.first_name;
export const getRaiseSecondNameErrorSelector = (state) =>
  state.errors?.raise?.second_name;
export const getRaiseEmailErrorSelector = (state) => state.errors?.raise?.email;
export const getRaisePhoneSelector = (state) => state.errors?.raise?.phone;
export const getRaiseCountrySelector = (state) => state.errors?.raise?.country;
export const getRaiseCompanyNameSelector = (state) =>
  state.errors?.raise?.company_name;
export const getRaiseCompanyFormSelector = (state) =>
  state.errors?.raise?.company_form;
export const getRaiseRoleSelector = (state) => state.errors?.raise?.role;
export const getRaiseSharePriceSelector = (state) =>
  state.errors?.raise?.share_price;
export const getRaiseRevenueSelector = (state) => state.errors?.raise?.revenue;
export const getRaiseAmountSelector = (state) => state.errors?.raise?.amount;
export const getRaiseWebsiteSelector = (state) => state.errors?.raise?.website;
export const getRaiseVideoPreviewSelector = (state) =>
  state.errors?.raise?.video_preview;
export const getRaiseSocialsOneSelector = (state) =>
  state.errors?.raise?.social_one;
export const getRaiseSocialsTwoSelector = (state) =>
  state.errors?.raise?.social_two;
export const getRaiseSocialsThreeSelector = (state) =>
  state.errors?.raise?.social_three;
export const getRaiseFollowersOneSelector = (state) =>
  state.errors?.raise?.followers_count_one;
export const getRaiseFollowersTwoSelector = (state) =>
  state.errors?.raise?.followers_count_two;
export const getRaiseFollowersThreeSelector = (state) =>
  state.errors?.raise?.followers_count_three;
export const getRaiseFormDocumentsErrorSelector = (state) =>
  isEmpty(state.errors?.raise?.documents);

export const getFirstNameErrorSelector = (state) =>
  state.errors?.profile?.first_name;
export const getSecondNameErrorSelector = (state) =>
  state.errors?.profile?.second_name;
export const getDateOfBirthErrorSelector = (state) =>
  state.errors?.profile?.date_of_birth;
export const getCountryErrorSelector = (state) =>
  state.errors?.profile?.address?.country;
export const getCityErrorSelector = (state) =>
  state.errors?.profile?.address?.city;
export const getAddressErrorSelector = (state) =>
  state.errors?.profile?.address?.address;
export const getPersonalIdErrorSelector = (state) =>
  state.errors?.profile?.personal_id;
export const getPhoneErrorSelector = (state) =>
  state.errors?.profile?.companies;
export const getZipErrorSelector = (state) =>
    state.errors?.profile?.zip_code;
export const getImageErrorSelector = (state) =>
    state.errors?.profile?.image;
export const getEmailErrorSelector = (state) =>
    state.errors?.profile?.email;

export const getAuthEmailErrorSelector = (state) => state.errors?.auth?.email;
export const getAuthPasswordErrorSelector = (state) =>
  state.errors?.auth?.password;
export const getAuthOldPasswordErrorSelector = (state) =>
  state.errors?.auth?.old_password?.user || state.errors?.auth?.old_password;
export const getAuthNewPassword1ErrorSelector = (state) =>
  state.errors?.auth?.new_password1;
export const getAuthNewPassword2ErrorSelector = (state) =>
  state.errors?.auth?.new_password2;
export const getAuthUserErrorSelector = (state) => state.errors?.auth?.user;
export const getAuthConfirmPasswordErrorSelector = state => state.errors?.auth?.confirm_password

export const getErrorSelector = (state) => state.errors;

export const errors = (state = initialState, actions) => {
  switch (actions.type) {
    case CLEAR_ERRORS:
      return {};
    case ERROR:
      return {
        ...state,
        status: actions.payload.status,
        data: actions.payload.data,
      };
    case SET_RAISE_ERROR:
      return {
        ...state,
        status: actions.payload.status,
        raise: actions.payload.data,
        hideNotification: actions?.payload?.hideNotification,
      };
    case SET_PROFILE_ERROR:
      return {
        ...state,
        status: actions.payload.status,
        profile: actions.payload.data,
        hideNotification: actions?.payload?.hideNotification,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        status: actions.payload.status,
        auth: actions.payload.data,
        hideNotification: actions?.payload?.hideNotification,
      };
    case SET_AUTH_EMAIL_ERROR:
      return { ...state, auth: { ...state.auth, email: "" } };
    case SET_AUTH_PASSWORD_ERROR:
      return { ...state, auth: { ...state.auth, password: "" } };
    case SET_AUTH_OLD_PASSWORD_ERROR:
      return { ...state, auth: { ...state.auth, old_password: "" } };
    case SET_AUTH_NEW_PASSWORD1_ERROR:
      return { ...state, auth: { ...state.auth, new_password1: "" } };
    case SET_AUTH_NEW_PASSWORD2_ERROR:
      return { ...state, auth: { ...state.auth, new_password2: "" } };
    case SET_AUTH_USER_ERROR:
      return { ...state, auth: { ...state.auth, user: "" } };
    case SET_PROFILE_FIRST_NAME_ERROR:
      return { ...state, profile: { ...state.profile, first_name: "" } };
    case SET_PROFILE_SECOND_NAME_ERROR:
      return { ...state, profile: { ...state.profile, second_name: "" } };
    case SET_PROFILE_DATE_OF_BIRTH_ERROR:
      return { ...state, profile: { ...state.profile, date_of_birth: "" } };
    case SET_PROFILE_COUNTRY_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          address: { ...state.profile?.address, country: "" },
        },
      };
    case SET_PROFILE_CITY_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          address: { ...state.profile?.address, city: "" },
        },
      };
    case SET_PROFILE_ADDRESS_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          address: { ...state.profile?.address, address: "" },
        },
      };
    case SET_PROFILE_PERSONAL_ID_ERROR:
      return { ...state, profile: { ...state.profile, personal_id: "" } };
    case SET_PROFILE_PHONE_ERROR:
      return { ...state, profile: { ...state.profile, phone: "" } };
    case SET_PROFILE_ZIP_ERROR:
      return { ...state, profile: { ...state.profile, zip_code: "" } };
    case SET_PROFILE_AVATAR_ERROR:
      return { ...state, profile: { ...state.profile, image: "" } };
    case SET_PROFILE_EMAIL_ERROR:
      return { ...state, profile: { ...state.profile, email: "" } };
    case CLEAR_PROFILE_ERRORS:
      return { ...state, profile: {} };



    case SET_FORM1_FIRST_NAME_ERROR:
      return { ...state, raise: { ...state.raise, first_name: "" } };
    case SET_FORM1_SECOND_NAME_ERROR:
      return { ...state, raise: { ...state.raise, second_name: "" } };
    case SET_FORM1_EMAIL_ERROR:
      return { ...state, raise: { ...state.raise, email: "" } };
    case SET_FORM1_PHONE_ERROR:
      return { ...state, raise: { ...state.raise, phone: "" } };
    case SET_FORM1_COUNTRY_ERROR:
      return { ...state, raise: { ...state.raise, country: "" } };
    case SET_FORM2_COMPANY_NAME_ERROR:
      return { ...state, raise: { ...state.raise, company_name: "" } };
    case SET_FORM2_COMPANY_FORM_ERROR:
      return { ...state, raise: { ...state.raise, company_form: "" } };
    case SET_FORM2_ROLE_ERROR:
      return { ...state, raise: { ...state.raise, role: "" } };
    case SET_FORM2_SHARE_PRICE_ERROR:
      return { ...state, raise: { ...state.raise, share_price: "" } };
    case SET_FORM2_REVENUE_ERROR:
      return { ...state, raise: { ...state.raise, revenue: "" } };
    case SET_FORM2_AMOUNT_ERROR:
      return { ...state, raise: { ...state.raise, amount: "" } };
    case SET_FORM3_WEBSITE_ERROR:
      return { ...state, raise: { ...state.raise, website: "" } };
    case SET_FORM3_VIDEO_PREVIEW_ERROR:
      return { ...state, raise: { ...state.raise, video_preview: "" } };
    case SET_FORM3_SOCIAL_ONE_ERROR:
      return { ...state, raise: { ...state.raise, social_one: "" } };
    case SET_FORM3_SOCIAL_TWO_ERROR:
      return { ...state, raise: { ...state.raise, social_two: "" } };
    case SET_FORM3_SOCIAL_THREE_ERROR:
      return { ...state, raise: { ...state.raise, social_three: "" } };
    case SET_FORM3_FOLLOWERS_ONE_ERROR:
      return { ...state, raise: { ...state.raise, followers_count_one: "" } };
    case SET_FORM3_FOLLOWERS_TWO_ERROR:
      return { ...state, raise: { ...state.raise, followers_count_two: "" } };
    case SET_FORM3_FOLLOWERS_THREE_ERROR:
      return { ...state, raise: { ...state.raise, followers_count_three: "" } };
    default:
      return state;
  }
};
