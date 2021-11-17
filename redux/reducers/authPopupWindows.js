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
  // showSuccessfulRequestForChange:false,
  showSuccessfulRequestForChangeEmail:false,
  showSuccessfulRequestForChangePassword:false,
  showInvalidTokenModal: false,
  showSuccessfulChangeEmailOrPassword:false,
  showDenyDeletingAccount:false,
  showSuccessfulFaqPopup: false,
  showDataLossWarning: false,
  text: '',
  showCookie: false,
};

export const getShowCookiePopup = state => state.authPopupWindows.showCookie;
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
// export const getShowRequestForChange = state =>  state.authPopupWindows.showSuccessfulRequestForChange;

export const getShowRequestForChangeEmail = state =>  state.authPopupWindows.showSuccessfulRequestForChangeEmail;
export const getShowRequestForChangePassword = state =>  state.authPopupWindows.showSuccessfulRequestForChangePassword;

export const getShowInvalidTokenModal = state =>  state.authPopupWindows.showInvalidTokenModal;
export const getShowSuccessfulChangeEmailOrPassword = state =>  state.authPopupWindows.showSuccessfulChangeEmailOrPassword;
export const getChangeEmailOrPasswordText = state =>  state.authPopupWindows.text;
export const getShowDenyDeletingAccount = state =>  state.authPopupWindows.showDenyDeletingAccount;
export const getShowSuccessfulFaqPopup = state =>  state.authPopupWindows.showSuccessfulFaqPopup;
export const getShowDataLossWarning = state =>  state.authPopupWindows.showDataLossWarning;




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
    // case SET_SHOW_REQUEST_FOR_CHANGE:
    //   return { ...state, showSuccessfulRequestForChange: actions.payload }
    case SET_SHOW_REQUEST_FOR_CHANGE_PASSWORD:
      return { ...state, showSuccessfulRequestForChangePassword: actions.payload }
    case SET_SHOW_REQUEST_FOR_CHANGE_EMAIL:
      return { ...state, showSuccessfulRequestForChangeEmail: actions.payload }
    case SET_SHOW_INVALID_TOKEN_MODAL:
      return { ...state, showInvalidTokenModal: actions.payload }
    case SET_SHOW_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD:
      return { ...state, showSuccessfulChangeEmailOrPassword: actions.payload }
    case SET_SHOW_SUCCESSFUL_FAQ_POST:
      return { ...state, showSuccessfulFaqPopup: actions.payload }
    case SET_SUCCESSFUL_CHANGE_EMAIL_OR_PASSWORD_TEXT:
      return { ...state, text: actions.payload }
    case SET_SHOW_DENY_DELETING_ACCOUNT:
      return { ...state, showDenyDeletingAccount: actions.payload }
    case SET_SHOW_DATA_LOSS_WARNING:
      return { ...state, showDataLossWarning: actions.payload }
    case SET_SHOW_COOKIE:
      return { ...state, showCookie: actions.payload }
    default:
      return state;
  }
};


