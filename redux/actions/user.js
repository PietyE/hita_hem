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
} from "constants/actionsConstant";

export const bootstap = () => ({
  type: BOOTSTAP_ACTION,
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
