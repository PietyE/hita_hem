import {
  SET_AUTH,
  SET_ACCOUNT,
  SET_TOKEN,
  SET_CHANGED_PROFILE,
  SET_PROFILE,
  SET_USER_FETCHING,
  SET_TAB,
  BOOTSTAP_ACTION,
} from "constants/actionsConstant";

const initialsState = {
  activeTab: "personal_details",
  isAuth: false,
  isFetching: false,
  token: {},
  user: {},
  account: {
    id: "",
    email: "",
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
    default:
      return state;
  }
};

export const getIsSignInUserSelector = (state) => state.user.isAuth;
export const getUserSelector = (state) => state.user;
export const getUserCampaignsSelector = (state) => state.user.user?.companies;
export const getUserPaymentsSelector = (state) => state.user.user?.payments;
export const getPaymentsByCurrentCompanySelector = (state) => {
  const companyId = state.companies.companyDetail.id;
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
  const totalPayments = payments.reduce(
    (sum, { amount }) => sum + Number(amount),
    0
  );
  return totalPayments;
};

export const getUserIdSelector = (state) => state.user.account.id;
export const getProfile = (state) => state.user.user;
export const getActiveTabSelector = (state) => state.user.activeTab;
export const getIsFetchingAuthSelector = (state) => state.user.isFetching;
