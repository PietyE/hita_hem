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
} from "constants/actionsConstant";

const initialValues = {
  showSignIn: false,
  showSignUp: false,
  showResetPassword: false,
  showSuccessfulSignUp: false,
  showSuccessfulCampaignRegistration: false,
  showSuccessfulInvestment: false,
  showSuccessfulResetPassword: false,
  showSuccessfulDeletedAccount: false,
  showConfirmationOfAccountDeleting: false,
  showQuiz:false,
  showQuizError: false,
  showSuccessfulSubscribe:false,
  showRaiseError: false,
};
export const getShowSignIn = (state) => state.authPopupWindows.showSignIn;
export const getShowSignUp = (state) => state.authPopupWindows.showSignUp;
export const getShowResetPassword = (state) =>
  state.authPopupWindows.showResetPassword;
export const getShowSuccessfulSignUp = (state) =>
  state.authPopupWindows.showSuccessfulSignUp;
export const getShowSuccessfulCampaignRegistration = (state) =>
  state.authPopupWindows.showSuccessfulCampaignRegistration;
export const getShowSuccessfulInvestment = (state) =>
  state.authPopupWindows.showSuccessfulInvestment;
export const getShowSuccessfulResetPassword = (state) =>
  state.authPopupWindows.showSuccessfulResetPassword;
export const getShowSuccessfulDeletedAccount = (state) =>
  state.authPopupWindows.showSuccessfulDeletedAccount;
export const getShowConfirmationOfAccountDeleting = (state) =>
  state.authPopupWindows.showConfirmationOfAccountDeleting;
export const getShowQuiz = state =>  state.authPopupWindows.showQuiz;
export const getShowQuizError = state =>  state.authPopupWindows.showQuizError;
export const getShowSuccessfulSubscribe = state =>  state.authPopupWindows.showSuccessfulSubscribe;
export const getShowRaiseError = state =>  state.authPopupWindows.showRaiseError;



export const authPopupWindows = (state = initialValues, actions) => {
  switch (actions.type) {
    case SET_SHOW_SIGN_IN:
      return { ...state, showSignIn: actions.payload };
    case SET_SHOW_SIGN_UP:
      return { ...state, showSignUp: actions.payload };
    case SET_SHOW_RESET_PASSWORD:
      return { ...state, showResetPassword: actions.payload };
    case SET_SHOW_SUCCESSFUL_SIGN_UP:
      return { ...state, showSuccessfulSignUp: actions.payload };
    case SET_SHOW_SUCCESSFUL_CAMPAIGN_REGISTRATION:
      return { ...state, showSuccessfulCampaignRegistration: actions.payload };
    case SET_SHOW_SUCCESSFUL_INVESTMENT:
      return { ...state, showSuccessfulInvestment: actions.payload };
    case SET_SHOW_SUCCESSFUL_RESET_PASSWORD:
      return { ...state, showSuccessfulResetPassword: actions.payload };
    case SET_SHOW_SUCCESSFUL_DELETED_ACCOUNT:
      return { ...state, showSuccessfulDeletedAccount: actions.payload };
    case SET_SHOW_CONFIRMATION_OF_ACCOUNT_DELETING:
      return { ...state, showConfirmationOfAccountDeleting: actions.payload };
    case SET_SHOW_QUIZ_MODAL:
      return { ...state, showQuiz: actions.payload }
    case SET_SHOW_QUIZ_ERROR:
      return { ...state, showQuizError: actions.payload }
    case SET_SHOW_SUCCESSFUL_SUBSCRIBE:
      return { ...state, showSuccessfulSubscribe: actions.payload }
    case SET_SHOW_RAISE_ERROR:
      return { ...state, showRaiseError: actions.payload }
    default:
      return state;
  }
};
