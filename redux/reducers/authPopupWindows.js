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
    default:
      return state;
  }
};
