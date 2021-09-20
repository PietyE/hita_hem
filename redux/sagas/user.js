import { takeEvery, call, put, select } from "redux-saga/effects";
import i18n from "i18next";
import Cookies from "js-cookie";

import {
  BOOTSTAP_ACTION,
  SIGN_IN,
  SIGN_UP,
  CREATE_PROFILE,
  CHANGE_PROFILE,
  LOG_OUT,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  DELETE_ACCOUNT,
} from "constants/actionsConstant";
import { setSelectedLanguage } from "redux/actions/language";
import {
  setAccount,
  setAuth,
  setToken,
  setProfile,
  setFetchingUsers,
} from "redux/actions/user";
import { setNotificationMessage } from "../actions/notification";
import {
  setShowSignIn,
  setShowSignUp,
  setShowSuccessfulSignUp,
  setShowSuccessfulResetPassword,
  setShowResetPassword,
  setShowSuccessfulDeletedAccount,
  setShowConfirmationOfAccountDeleting,
} from "../actions/authPopupWindows";
import { getUserIdSelector } from "../reducers/user";
import { setError } from "../actions/errors";
import api from "api";
import { getDocumentsWorker } from "./documents";

const { auth } = api;

export function* bootstarpWorker({ payload: cook }) {
  try {
    yield put(setFetchingUsers(true));

    const systemLang = cook.i18next || i18n.language;

    !!cook.i18next && i18n.changeLanguage(systemLang);

    yield call([api, "setLanguage"], systemLang);

    yield put(setSelectedLanguage(systemLang));

    Cookies.set("i18next", systemLang);

    const auth_data = yield call([localStorage, "getItem"], "auth_data");

    if (auth_data) {
      const data = JSON.parse(auth_data);
      const { expiration_timestamp, key: token, user: id } = data;
      const nowTime = Math.floor(new Date().getTime() / 1000);

      if (token && expiration_timestamp && nowTime < expiration_timestamp) {
        yield call([api, "setToken"], token);

        const response = yield call([auth, "getUser"], id);
        if (response.status !== 200) {
          yield put(setAuth(false));
          return;
        }
        if (response?.data?.profile?.date_of_birth) {
          const profileCopy = prepareProfile(response.data.profile);
          yield put(setProfile(profileCopy));
        } else {
          yield put(setProfile(response.data.profile));
        }

        yield put(setToken(token));
        yield put(setAccount(response.data));
        yield put(setAuth(true));
      } else {
        yield put(setAuth(false));
      }
    } else {
      yield put(setAuth(false));
    }

    yield call(getDocumentsWorker);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* signUp({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    const response = yield call([auth, "signUp"], payload);
    if (response.status === 201) {
      yield put(setShowSignUp(false));
      yield put(setShowSuccessfulSignUp(true));
    }
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
    if (error?.response?.status === 400) {
      yield put(setNotificationMessage(error.response.data.email[0]));
    }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* signIn({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    const response = yield call([auth, "signIn"], payload);
    const { data, status } = response;
    if (status !== 200) {
      throw new Error();
    }
    const { user, token } = data;
    yield put(setAccount(user));
    if (user?.profile?.date_of_birth) {
      const profileCopy = prepareProfile(user.profile);
      yield put(setProfile(profileCopy));
    } else {
      if (user?.profile) {
        yield put(setProfile(user.profile));
      }
    }

    yield put(setToken(token));
    yield put(setAuth(true));
    yield call([api, "setToken"], token.key);
    const authData = JSON.stringify(token);
    yield call([localStorage, "setItem"], "auth_data", authData);
    yield put(setShowSignIn(false));
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );

    if (error?.response?.status === 400) {
      yield put(setNotificationMessage(error.response.data.user[0]));
    }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* logout() {
  try {
    yield put(setFetchingUsers(true));
    const response = yield call([auth, "logOut"]);
    if (response.status !== 200) {
      throw new Error();
    }
    yield call(clean);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* createUserProfile({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "createProfile"], payload.profile);

    if (payload.image) {
      yield call([auth, "changeAvatar"], payload.image);
    }

    yield call(getProfileFromApi);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* changeUserProfile({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changeProfile"], payload.profile);
    if (payload.image) {
      yield call([auth, "changeAvatar"], payload.image);
    }

    yield call(getProfileFromApi);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* resetUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "resetPassword"], { email: payload });
    yield put(setShowResetPassword(false));
    yield put(setShowSuccessfulResetPassword(true));
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
    if (error?.response?.status === 400) {
      yield put(setNotificationMessage(error.response.data.user[0]));
    }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* changeUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changePassword"], payload);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* changeUserEmail({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changeEmail"], payload);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

export function* getProfileFromApi() {
  try {
    yield put(setFetchingUsers(true));

    let projectId = yield select(getUserIdSelector);
    const response = yield call([auth, "getUser"], projectId);
    if (response.status !== 200) {
      yield put(setAuth(false));
      return;
    }
    if (response?.data?.profile?.date_of_birth) {
      const profileCopy = prepareProfile(response.data.profile);
      yield put(setProfile(profileCopy));
    } else {
      yield put(setProfile(response.data.profile));
    }
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

export function* deleteUserAccount() {
  try {
    yield put(setFetchingUsers(true));
    let userId = yield select(getUserIdSelector);
    yield call([auth, "deleteUser"], userId);
    yield put(setShowConfirmationOfAccountDeleting(false));
    yield put(setShowSuccessfulDeletedAccount(true));
    yield call(clean);
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* clean() {
  yield put(setAccount({}));
  yield put(setToken({}));
  yield put(setProfile({}));
  yield put(setAuth(false));
  yield call([api, "deleteToken"]);
  yield call([localStorage, "removeItem"], "auth_data");
}

const prepareProfile = (data) => {
  const profileCopy = JSON.parse(JSON.stringify(data));
  const dateArr = profileCopy.date_of_birth.split("-");
  delete profileCopy.date_of_birth;
  profileCopy.day = Number(dateArr[2]);
  profileCopy.month = Number(dateArr[1]);
  profileCopy.year = Number(dateArr[0]);
  return profileCopy;
};

export function* userWorker() {
  yield takeEvery(BOOTSTAP_ACTION, bootstarpWorker);
  yield takeEvery(SIGN_UP, signUp);
  yield takeEvery(SIGN_IN, signIn);
  yield takeEvery(LOG_OUT, logout);
  yield takeEvery(CREATE_PROFILE, createUserProfile);
  yield takeEvery(CHANGE_PROFILE, changeUserProfile);
  yield takeEvery(RESET_PASSWORD, resetUserPassword);
  yield takeEvery(CHANGE_PASSWORD, changeUserPassword);
  yield takeEvery(CHANGE_EMAIL, changeUserEmail);
  yield takeEvery(DELETE_ACCOUNT, deleteUserAccount);
}
