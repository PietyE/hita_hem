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