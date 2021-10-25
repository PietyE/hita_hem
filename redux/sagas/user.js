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
  REQUEST_FOR_CHANGING_EMAIL,
  REQUEST_FOR_CHANGING_PASSWORD,
  CHECK_TOKEN, CLEAN_AUTH_DATA,
    GET_QUIZ, CHECK_QUIZ_ANSWERS,
  GET_PROFILE_FROM_API,
} from "constants/actionsConstant";
import { setSelectedLanguage } from "redux/actions/language";
import {
  setAccount,
  setAuth,
  setToken,
  setProfile,
  setFetchingUsers, setCanChangeEmail, cleanAuthData, setCanChangePassword, setQuiz,
} from "redux/actions/user";
import {
  setShowSignIn,
  setShowSignUp,
  setShowSuccessfulSignUp,
  setShowSuccessfulResetPassword,
  setShowResetPassword,
  setShowSuccessfulDeletedAccount,
  setShowConfirmationOfAccountDeleting,
  setShowRequestForChange,
  setShowInvalidTokenModal,
  setShowChangeEmailOrPassword,
  setChangeEmailOrPasswordText,
  setShowQuiz,
} from "../actions/authPopupWindows";
import { getUserIdSelector } from "../reducers/user";
import {setAuthError, setProfileError, clearErrors} from "../actions/errors";
import { setQuizErrors, setQuizIsPassed, setResponseFromApi} from "../actions/user";
import api from "api";
import { getDocumentsWorker } from "./documents";

const { auth } = api;

export function* bootstarpWorker({ payload: initLang }) {
  try {
    yield put(setFetchingUsers(true));

    const systemLang = initLang || i18n.language;

    yield call([api, "setLanguage"], systemLang);

    yield put(setSelectedLanguage(systemLang));

    if (!initLang) {
      yield call([Cookies, "set"], "NEXT_LOCALE", systemLang);
    }

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
    yield put(clearErrors())

  } catch (error) {
    yield put(
      setAuthError({ status: error.response.status, data: error.response.data })
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
    yield put(clearErrors())

  } catch (error) {
    yield put(
      setAuthError({ status: error.response.status, data: error.response.data })
    );
    // if(error?.response?.status === 400){
    //     yield put(setNotificationMessage(error.response?.data?.email[0]))
    // }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* signIn({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    const response = yield call([auth, "signIn"], payload);
    const { data } = response;
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
    yield put(clearErrors())
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
    // if (error?.response?.status === 400) {
    //   if (error?.response?.data?.user) {
    //     yield put(setNotification(true));
    //     yield put(setNotificationTitle(error?.response?.data?.user[0]));
    //     yield put(setNotificationMessage("Check your email or password"));
    //   }
      // else {
      //   yield put(
      //     setAuthError({
      //       status: error.response.status,
      //       auth: error.response.data,
      //     })
      //   );
      // }
    // }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* logout() {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "logOut"]);
    yield call(clean);
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
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
    yield put(clearErrors())

  } catch (error) {
    yield put(
      yield put(
        setProfileError({
          status: error.response.status,
          data: error.response.data,
        })
      )
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
    } else if(payload.image === null){
      yield call([auth, "deleteAvatar"]);

    }

    yield call(getProfileFromApi);
    yield put(clearErrors())

  } catch (error) {
    yield put(
      yield put(
        setProfileError({
          status: error.response.status,
          data: error.response.data,
        })
      )
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
    yield put(clearErrors())

  } catch (error) {
    yield put(
      setAuthError({ status: error.response.status, data: error.response.data })
    );
    // if(error?.response?.status === 400){
    //     yield put(setNotificationMessage(error.response.data.user[0]))
    // }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* changeUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changePassword"], payload);
    yield put(setChangeEmailOrPasswordText('Your password has been successfully updated.'))
    yield put(setShowChangeEmailOrPassword(true))
    yield put(setCanChangePassword(false))
    yield put(clearErrors())
    yield put(cleanAuthData())
  } catch (error) {
    yield put(
      yield put(
        setAuthError({
          status: error.response.status,
          data: error.response.data,
        })
      )
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* changeUserEmail({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changeEmail"], payload);
    yield put(setResponseFromApi(true));
    yield put(setChangeEmailOrPasswordText('Your mail has been successfully updated.'))
    yield put(setShowChangeEmailOrPassword(true))
    yield put(setCanChangeEmail(false))
    yield put(clearErrors())
    yield put(cleanAuthData())
  } catch (error) {
      yield put(
        setAuthError({
          status: error?.response?.status,
          data: error?.response?.data,
        })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

export function* getProfileFromApi() {
  try {
    yield put(setFetchingUsers(true));
    let userId = yield select(getUserIdSelector);
    const response = yield call([auth, "getUser"], userId);
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
    if(response?.data?.quiz){
      yield put(setQuizIsPassed(response.data.quiz));
    }
  } catch (error) {
    yield put(
      setAuthError({ status: error.response.status, data: error.response.data })
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
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForChangingEmail() {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForChangingEmail"]);
    yield put(setShowRequestForChange(true));
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForChangingPassword() {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForChangingPassword"]);
    yield put(setShowRequestForChange(true));
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForCheckingToken({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForCheckingToken"], payload?.key);
    if(payload?.type === 'email'){
      yield put(setCanChangeEmail(true))
    }else if(payload?.type === 'password'){
      yield put(setCanChangePassword(true))
    }
  } catch (error) {
    if(error?.response?.status === 404){
      yield put(setShowInvalidTokenModal(true))
    }else{
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
      );
    }

  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForQuiz() {
  try {
    yield put(setFetchingUsers(true));
    const res = yield call([auth, "requestForQuiz"]);
    yield put(setQuiz(res?.data))
    yield put(setShowQuiz(true))
  } catch (error) {
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
      );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForCheckingQuiz({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "checkQuizAnswers"], payload);
    yield call(getProfileFromApi)
  } catch (error) {
    if(error?.response?.data?.answers){
      yield put(setQuizErrors(error?.response?.data?.answers))
    }else{
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
      );
    }


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
  yield put(clearErrors())
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
  yield takeEvery(REQUEST_FOR_CHANGING_EMAIL, requestForChangingEmail);
  yield takeEvery(REQUEST_FOR_CHANGING_PASSWORD, requestForChangingPassword);
  yield takeEvery(CHECK_TOKEN, requestForCheckingToken)
  yield takeEvery(CLEAN_AUTH_DATA, clean)
  yield takeEvery(GET_QUIZ, requestForQuiz)
  yield takeEvery(CHECK_QUIZ_ANSWERS, requestForCheckingQuiz)
  yield takeEvery(GET_PROFILE_FROM_API, getProfileFromApi)

}

