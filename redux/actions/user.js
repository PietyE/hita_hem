import {
  BOOTSTAP_ACTION,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  SET_ACCOUNT,
  SET_AUTH,
  SET_TOKEN,
  CREATE_PROFILE,
  SET_PROFILE,
  CHANGE_PROFILE,
  RESET_PASSWORD,
  SET_USER_FETCHING,
  SET_TAB,
  SET_CHANGED_PROFILE,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  DELETE_ACCOUNT,
  SET_RESPONSE_FROM_API,
  SET_CAN_CHANGE_EMAIL,
  REQUEST_FOR_CHANGING_EMAIL,
  REQUEST_FOR_CHANGING_PASSWORD,
  CHECK_TOKEN,
  CLEAN_AUTH_DATA,
  SET_CAN_CHANGE_PASSWORD,
    GET_QUIZ,
  SET_QUIZ,
  CHECK_QUIZ_ANSWERS,
  SET_QUIZ_ERRORS,
  SET_QUIZ_IS_PASSED,
  GET_PROFILE_FROM_API,
  SET_CAN_RESET_PASSWORD,
  REQUEST_FOR_RESET_PASSWORD,
  CHECK_TOKEN_FOR_RESET_PASSWORD,
  CHECK_ACTIVATION_TOKEN,
  CHECK_EMAIL_AND_PASSWORD,
  SIGN_IN_WITH_BANK_ID,
  REQUEST_SIGN_IN_WITH_BANK_ID,
  SET_TOKEN_FOR_QUIZ_SOCIALS_SIGN_IN,
  SET_CURRENT_PATH,
  SET_IS_BANK_ID_RESIDENT,
  SIGN_IN_WITH_GOOGLE,
  SET_IS_AUTH_ON_AND_SAVE_USER_PROFILE,
  SET_BANK_ID_KEY,
  SIGN_UP_WITH_BANK_ID,
  REQUEST_SUBSCRIBE_LIST,
  SET_SUBSCRIBE_LIST,
  CHANGE_UNSUBSCRIBE_LIST,
  SET_UNSUBSCRIBE_LIST,
  SET_SOCIALS_KEY,
  SIGN_UP_WITH_SOCIALS,
  SAVE_EMAIL,
  SET_EMAIL_LANGUAGE,
} from "constants/actionsConstant";

export const bootstap = (payload) => ({
  type: BOOTSTAP_ACTION,
  payload,
});

export const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const signIn = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const setAccount = (payload) => ({
  type: SET_ACCOUNT,
  payload,
});

export const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

export const setAuth = (payload) => ({
  type: SET_AUTH,
  payload,
});
export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});
export const setFetchingUsers = (payload) => ({
  type: SET_USER_FETCHING,
  payload,
});

export const createProfile = (payload) => ({
  type: CREATE_PROFILE,
  payload,
});

export const changeProfile = (payload) => ({
  type: CHANGE_PROFILE,
  payload,
});
export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const setChangedProfile = (payload) => ({
  type: SET_CHANGED_PROFILE,
  payload,
});

export const resetPassword = (payload) => ({
  type: RESET_PASSWORD,
  payload,
});
export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});
export const setActiveTab = (payload) => ({
  type: SET_TAB,
  payload,
});

export const deleteAccount = (payload) => ({
  type: DELETE_ACCOUNT,
  payload,
});

export const setResponseFromApi = payload => ({
  type: SET_RESPONSE_FROM_API,
  payload
})

export const setCanChangeEmail = payload => ({
  type: SET_CAN_CHANGE_EMAIL,
  payload
})

export const setCanChangePassword = payload => ({
  type: SET_CAN_CHANGE_PASSWORD,
  payload
})

export const setCanResetPassword = payload => ({
  type: SET_CAN_RESET_PASSWORD,
  payload
})

export const makeRequestForChangingEmail = payload => ({
  type: REQUEST_FOR_CHANGING_EMAIL,
  payload
})

export const makeRequestForChangingPassword = payload => ({
  type: REQUEST_FOR_CHANGING_PASSWORD,
  payload
})

export const makeRequestForResetPassword = payload => ({
  type: REQUEST_FOR_RESET_PASSWORD,
  payload
})


export const makeRequestForCheckingToken = payload => ({
  type: CHECK_TOKEN,
  payload
})

export const makeRequestForResetPasswordTokenVerification = payload => ({
  type: CHECK_TOKEN_FOR_RESET_PASSWORD,
  payload
})


export const cleanAuthData = () => ({
  type: CLEAN_AUTH_DATA,
})

export const getQuiz = (payload) => ({
  type: GET_QUIZ,
  payload,

})

export const setQuiz = payload => ({
  type: SET_QUIZ,
  payload,
})

export const checkQuizAnswers = payload => ({
  type: CHECK_QUIZ_ANSWERS,
  payload
})

export const setQuizErrors = payload => ({
  type: SET_QUIZ_ERRORS,
  payload
})

export const setQuizIsPassed = payload => ({
  type: SET_QUIZ_IS_PASSED,
  payload
})

export const fetchProfileFromApi = () => ({
  type: GET_PROFILE_FROM_API,
})

export const checkActivationToken = payload => ({
  type: CHECK_ACTIVATION_TOKEN,
  payload
})

export const checkEmailAndPassword = payload => ({
  type: CHECK_EMAIL_AND_PASSWORD,
  payload
})

export const makeRequestForSignInWithBankId = payload => ({
  type: REQUEST_SIGN_IN_WITH_BANK_ID,
  payload
})

export const signInWithBankId = payload => ({
  type: SIGN_IN_WITH_BANK_ID,
  payload
})


export const setTokenForQuizSocialsSignIn = payload => ({
  type: SET_TOKEN_FOR_QUIZ_SOCIALS_SIGN_IN,
  payload
})
export const setCurrentPath = payload => ({
  type: SET_CURRENT_PATH,
  payload
})

export const setIsBankIdResident = payload => ({
  type: SET_IS_BANK_ID_RESIDENT,
  payload
})

export const signInWithGoogle = payload => ({
  type: SIGN_IN_WITH_GOOGLE,
  payload
})

export const setIsAthOnAndSaveUserProfile = payload => ({
  type: SET_IS_AUTH_ON_AND_SAVE_USER_PROFILE,
  payload
})

export const setBIdKey = payload => ({
  type: SET_BANK_ID_KEY,
  payload
})

export const signUpWithBankId = payload => ({
  type: SIGN_UP_WITH_BANK_ID,
  payload
})

export const signUpWithSocials = payload => ({
  type: SIGN_UP_WITH_SOCIALS,
  payload
})

export const requestSubscribeList = payload => ({
  type: REQUEST_SUBSCRIBE_LIST,
  payload
})

export const setSubscribeList = payload => ({
  type: SET_SUBSCRIBE_LIST,
  payload
})

export const setUnSubscribeList = payload => ({
  type: SET_UNSUBSCRIBE_LIST,
  payload
})

export const changeUnsubscribeList = payload => ({
  type: CHANGE_UNSUBSCRIBE_LIST,
  payload
})

export const setSocialsKey = payload => ({
  type: SET_SOCIALS_KEY,
  payload
})


export const saveEmail = payload => ({
  type: SAVE_EMAIL,
  payload
})

export const setEmailLanguage = payload => ({
  type: SET_EMAIL_LANGUAGE,
  payload
})
