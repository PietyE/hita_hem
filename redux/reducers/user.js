import {
  SET_AUTH,
  SET_ACCOUNT,
  SET_TOKEN,
  SET_CHANGED_PROFILE,
  SET_PROFILE,
  SET_USER_FETCHING,
  SET_TAB,
  BOOTSTAP_ACTION,
  SET_RESPONSE_FROM_API,
  SET_CAN_CHANGE_EMAIL,
  SET_CAN_CHANGE_PASSWORD,
  SET_QUIZ,
  SET_QUIZ_IS_PASSED,
  SET_QUIZ_ERRORS,
    SET_CAN_RESET_PASSWORD,
  SET_TOKEN_FOR_QUIZ_SOCIALS_SIGN_IN,
  SET_CURRENT_PATH,
  SET_IS_BANK_ID_RESIDENT,
  SET_BANK_ID_KEY,
  SET_SUBSCRIBE_LIST,
} from "constants/actionsConstant";

const initialsState = {
  activeTab: "personal_details",
  canChangeEmail: false,
  canChangePassword: false,
  canResetPassword: false,
  isAuth: false,
  isFetching: false,
  isQuizPassed: false,
  isShowQuizForBankId: false,
  isSuccessfulResponseFromApi: false,
  isBankIdResident: false,
  bidSessionKey: '',
  currentPath: '',
  token: {},
  user: {},
  quizQuestions:[],
  subscribeList:[],
  quizErrors: null,
  account: {
    pk: "",
    email: "",
    quiz: false,
    social_accounts: [],
    unsubscribes: [],
  },
  isFirstHydrate: false,
};

export const user = (state = initialsState, actions) => {
  switch (actions.type) {
    case BOOTSTAP_ACTION:
      return { ...state, isFirstHydrate: true };
    case SET_AUTH:
      return { ...state, isAuth: actions.payload };
    case SET_TOKEN:
      return { ...state, token: actions.payload };
    case SET_ACCOUNT:
      return { ...state, account: actions.payload };
    case SET_USER_FETCHING:
      return { ...state, isFetching: actions.payload };
    case SET_PROFILE:
      return { ...state, user: actions.payload };
    case SET_CHANGED_PROFILE:
      return { ...state, user: actions.payload };
    case SET_TAB:
      return { ...state, activeTab: actions.payload };
    case SET_RESPONSE_FROM_API:
      return {...state, isSuccessfulResponseFromApi: actions.payload}
    case SET_CAN_CHANGE_EMAIL:
      return {...state, canChangeEmail: actions.payload}
    case SET_CAN_CHANGE_PASSWORD:
      return {...state, canChangePassword: actions.payload}
    case SET_QUIZ:
      return {...state, quizQuestions: actions.payload}
    case SET_QUIZ_IS_PASSED:
      return {...state, account:{...state.account, quiz: actions.payload}}
    case SET_QUIZ_ERRORS:
      return {...state, quizErrors: actions.payload}
    case SET_CAN_RESET_PASSWORD:
      return {...state, canResetPassword: actions.payload}
    case SET_TOKEN_FOR_QUIZ_SOCIALS_SIGN_IN:
      return {...state, tokenForQuizSocialsSignIn: actions.payload}
    case SET_CURRENT_PATH:
      return {...state, currentPath: actions.payload}
    case SET_IS_BANK_ID_RESIDENT:
      return {...state, isBankIdResident: actions.payload}
    case SET_BANK_ID_KEY:
      return {...state, bidSessionKey: actions.payload}
    case SET_SUBSCRIBE_LIST:
      return {...state, subscribeList: actions.payload}

    default:
      return state;
  }
};

export const getQuizErrorsSelector = (state) => state.user.quizErrors;
export const getQuizIsPassedSelector = (state) => state.user.account.quiz;
export const getQuiz = (state) => state.user.quizQuestions;
export const getCanChangeEmailSelector = (state) => state.user.canChangeEmail;
export const getCanChangePasswordSelector = (state) => state.user.canChangePassword;
export const getCanResetPasswordSelector = (state) => state.user.canResetPassword;
export const getSubscribeListSelector = (state) => state.user.subscribeList;


export const getTokenForQuizSocialsSignIn = (state) => state.user.tokenForQuizSocialsSignIn;
export const getCurrentPath = (state) => state?.user?.currentPath;

export const getIsBankIdResident = (state) => state?.user?.isBankIdResident || state?.user?.account?.is_bank_id_resident;
export const getIsSocialAccount = (state) => state?.user?.account?.social_accounts;

export const getUnsubscribesSelector = (state) => state?.user?.account?.unsubscribes;


export const getIsSignInUserSelector = (state) => state.user.isAuth;
export const getUserSelector = (state) => state.user;
export const getUserCampaignsSelector = (state) => state.user.user?.companies;
export const getUserPaymentsSelector = (state) => state.user.user?.payments;
export const getPaymentsByCurrentCompanySelector = (state) => {
  const companyId = state.companies.companyDetail.pk;
  let filteredPayments = [];
  if (state.user?.user?.payments?.length > 0) {
    filteredPayments = state.user?.user?.payments?.filter(
      (el) => el.company_id === companyId
    );
  }
  return filteredPayments;
};
export const getTotalPaymentsByCompanySelector = (state) => {
  const payments = getPaymentsByCurrentCompanySelector(state);
  return payments.reduce(
    (sum, { amount }) => sum + Number(amount),
    0
  );
};

export const isSuccessfulResponseFromApiSelector = state => state.user.isSuccessfulResponseFromApi
export const getIsPaymentsWasSelector = state => !!state.user?.user?.payments?.length
export const getUserIdSelector = (state) => state.user.account.pk;
export const getFullNameSelector = (state) => {
  if(state.user?.user?.first_name && state.user?.user?.second_name){
    return   state.user?.user?.first_name + ' ' + state.user?.user?.second_name
  }
}
export const getUserEmailSelector = (state) => state.user?.account?.email;

export const getProfile = (state) => state.user.user;
export const getActiveTabSelector = (state) => state.user.activeTab;
export const getIsFetchingAuthSelector = (state) => state.user.isFetching;
export const getBIdKeySelector = (state) => state.user.bidSessionKey;
