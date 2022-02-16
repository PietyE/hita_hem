import {ERROR,
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
  SET_PROFILE_ZIP_ERROR,
  SET_PROFILE_EMAIL_ERROR,
  SET_PROFILE_AVATAR_ERROR,
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
} from 'constants/actionsConstant';
export const setError = (payload) => ({
  type: ERROR,
  payload,
})
export const setAuthError = (payload) => ({
  type: SET_AUTH_ERROR,
  payload,
})
export const setProfileError = (payload) => ({
  type: SET_PROFILE_ERROR,
  payload,
})
export const setRaiseError = (payload) => ({
  type: SET_RAISE_ERROR,
  payload,
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
})
export const clearAuthEmailError = () => ({
  type: SET_AUTH_EMAIL_ERROR,
})
export const clearAuthPasswordError = () => ({
  type: SET_AUTH_PASSWORD_ERROR,
})
export const clearAuthUserError = () => ({
  type: SET_AUTH_USER_ERROR,
})
export const clearAuthOldPasswordError = () => ({
  type: SET_AUTH_OLD_PASSWORD_ERROR,
})
export const clearAuthNewPassword1Error = () => ({
  type: SET_AUTH_NEW_PASSWORD1_ERROR,
})
export const clearAuthNewPassword2Error = () => ({
  type: SET_AUTH_NEW_PASSWORD2_ERROR,
})
/////////////////PROFILE////////////////////////////
export const setFirstNameError = () => ({
  type: SET_PROFILE_FIRST_NAME_ERROR,
})
export const setSecondNameError = () => ({
  type: SET_PROFILE_SECOND_NAME_ERROR,
})
export const setDateOfBirthError = () => ({
  type: SET_PROFILE_DATE_OF_BIRTH_ERROR,
})
export const setCountryError = () => ({
  type: SET_PROFILE_COUNTRY_ERROR,
})
export const setCityError = () => ({
  type: SET_PROFILE_CITY_ERROR,
})
export const setAddressError = () => ({
  type: SET_PROFILE_ADDRESS_ERROR,
})
export const setPersonalIdError = () => ({
  type: SET_PROFILE_PERSONAL_ID_ERROR,
})
export const setPhoneError = () => ({
  type: SET_PROFILE_PHONE_ERROR,
})
export const setZipError = () => ({
  type: SET_PROFILE_ZIP_ERROR,
})
export const setAvatarError = () => ({
  type: SET_PROFILE_AVATAR_ERROR,
})

export const setProfileEmailError = () => ({
  type: SET_PROFILE_EMAIL_ERROR,
})



//////////////RAISE FORM////////////////////////////
export const setRaiseFirstNameError = () => ({
  type: SET_FORM1_FIRST_NAME_ERROR,
})
export const setRaiseSecondNameError = () => ({
  type: SET_FORM1_SECOND_NAME_ERROR,
})
export const setRaiseEmailError = () => ({
  type: SET_FORM1_EMAIL_ERROR,
})
export const setRaisePhoneError = () => ({
  type: SET_FORM1_PHONE_ERROR,
})
export const setRaiseCountryError = () => ({
  type: SET_FORM1_COUNTRY_ERROR,
})
export const setRaiseCompanyNameError = () => ({
  type: SET_FORM2_COMPANY_NAME_ERROR,
})
export const setRaiseCompanyFormError = () => ({
  type: SET_FORM2_COMPANY_FORM_ERROR,
})
export const setRaiseRoleError = () => ({
  type: SET_FORM2_ROLE_ERROR,
})
export const setRaiseSharePriceError = () => ({
  type: SET_FORM2_SHARE_PRICE_ERROR,
})
export const setRaiseRevenueError = () => ({
  type: SET_FORM2_REVENUE_ERROR,
})
export const setRaiseAmountError = () => ({
  type: SET_FORM2_AMOUNT_ERROR,
})
export const setRaiseWebsiteError = () => ({
  type: SET_FORM3_WEBSITE_ERROR,
})
export const setRaiseVideoPreviewError = () => ({
  type: SET_FORM3_VIDEO_PREVIEW_ERROR,
})
export const setRaiseSocialOneError = () => ({
  type: SET_FORM3_SOCIAL_ONE_ERROR,
})
export const setRaiseSocialTwoError = () => ({
  type: SET_FORM3_SOCIAL_TWO_ERROR,
})
export const setRaiseSocialThreeError = () => ({
  type: SET_FORM3_SOCIAL_THREE_ERROR,
})
export const setRaiseFollowersOneError = () => ({
  type: SET_FORM3_FOLLOWERS_ONE_ERROR,
})
export const setRaiseFollowersTwoError = () => ({
  type: SET_FORM3_FOLLOWERS_TWO_ERROR,
})
export const setRaiseFollowersThreeError = () => ({
  type: SET_FORM3_FOLLOWERS_THREE_ERROR,
})

