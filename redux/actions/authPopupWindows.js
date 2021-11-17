import {
  SET_SHOW_SIGN_IN,
  SET_SHOW_SIGN_UP,
  SET_SHOW_RESET_PASSWORD,
  SET_SHOW_SUCCESSFUL_SIGN_UP,
  SET_SHOW_SUCCESSFUL_CAMPAIGN_REGISTRATION,
  SET_SHOW_SUCCESSFUL_INVESTMENT,
  SET_SHOW_SUCCESSFUL_RESET_PASSWORD,
  SET_SHOW_SUCCESSFUL_DELETED_ACCOUNT,
  SET_SHOW_CONFIRMATION_OF_ACCOUNT_DELETING,
  SET_SHOW_QUIZ_MODAL,
  SET_SHOW_QUIZ_ERROR,
  SET_SHOW_SUCCESSFUL_SUBSCRIBE,
  SET_SHOW_RAISE_ERROR,
  // SET_SHOW_REQUEST_FOR_CHANGE,
  SET_SHOW_REQUEST_FOR_CHANGE_PASSWORD,
  SET_SHOW_REQUEST_FOR_CHANGE_EMAIL,
  SET_SHOW_INVALID_TOKEN_MODAL,
  SET_SHOW_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD,
  SET_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD_TEXT,
  SET_SHOW_DENY_DELETING_ACCOUNT,
  SET_SHOW_COOKIE,
  SET_SHOW_SUCCESSFUL_FAQ_POST,
  SET_SHOW_DATA_LOSS_WARNING,
} from "constants/actionsConstant";

export const setShowSignIn = (payload) => ({
  type: SET_SHOW_SIGN_IN,
  payload,
});

export const setShowSignUp = (payload) => ({
  type: SET_SHOW_SIGN_UP,
  payload,
});

export const setShowResetPassword = (payload) => ({
  type: SET_SHOW_RESET_PASSWORD,
  payload,
});

export const setShowSuccessfulSignUp = (payload) => ({
  type: SET_SHOW_SUCCESSFUL_SIGN_UP,
  payload,
});

export const setShowSuccessfulCampaignRegistration = (payload) => ({
  type: SET_SHOW_SUCCESSFUL_CAMPAIGN_REGISTRATION,
  payload,
});

export const setShowSuccessfulInvestment = (payload) => ({
  type: SET_SHOW_SUCCESSFUL_INVESTMENT,
  payload,
});
export const setShowSuccessfulResetPassword = (payload) => ({
  type: SET_SHOW_SUCCESSFUL_RESET_PASSWORD,
  payload,
});

export const setShowSuccessfulDeletedAccount = (payload) => ({
  type: SET_SHOW_SUCCESSFUL_DELETED_ACCOUNT,
  payload,
});

export const setShowConfirmationOfAccountDeleting = (payload) => ({
  type: SET_SHOW_CONFIRMATION_OF_ACCOUNT_DELETING,
  payload,
});

export const setShowQuiz= payload =>({
  type: SET_SHOW_QUIZ_MODAL,
  payload,
})
export const setShowQuizError= payload =>({
  type: SET_SHOW_QUIZ_ERROR,
  payload,
})

export const setSuccessfulSubscribe= payload =>({
  type: SET_SHOW_SUCCESSFUL_SUBSCRIBE,
  payload,
})

export const setShowRaiseError= payload =>({
  type: SET_SHOW_RAISE_ERROR,
  payload,
})

// export const setShowRequestForChange= payload =>({
//   type: SET_SHOW_REQUEST_FOR_CHANGE,
//   payload,
// })
export const setShowRequestForChangePassword= payload =>({
  type: SET_SHOW_REQUEST_FOR_CHANGE_PASSWORD,
  payload,
})

export const setShowRequestForChangeEmail= payload =>({
  type: SET_SHOW_REQUEST_FOR_CHANGE_EMAIL,
  payload,
})


export const setShowInvalidTokenModal= payload =>({
  type: SET_SHOW_INVALID_TOKEN_MODAL,
  payload,
})

export const setShowChangeEmailOrPassword = payload =>({
  type: SET_SHOW_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD,
  payload,
})

export const setChangeEmailOrPasswordText = payload =>({
  type: SET_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD_TEXT,
  payload,
})

export const setShowDenyDeletingAccount = payload =>({
  type: SET_SHOW_DENY_DELETING_ACCOUNT,
  payload,
})

export const setShowCookiePopup = payload =>({
  type: SET_SHOW_COOKIE,
  payload,
})

export const setShowSuccessfulFAQPopup = payload =>({
  type: SET_SHOW_SUCCESSFUL_FAQ_POST,
  payload,
})

export const setShowDataLossWarning = payload =>({
  type: SET_SHOW_DATA_LOSS_WARNING,
  payload,
})
