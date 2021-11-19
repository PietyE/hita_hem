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
  REQUEST_FOR_RESET_PASSWORD,
  CHECK_TOKEN, CLEAN_AUTH_DATA,
    GET_QUIZ, CHECK_QUIZ_ANSWERS,
  GET_PROFILE_FROM_API,
  CHECK_TOKEN_FOR_RESET_PASSWORD,
  CHECK_ACTIVATION_TOKEN,
} from "constants/actionsConstant";
import { setSelectedLanguage } from "redux/actions/language";
import {
  setAccount,
  setAuth,
  setToken,
  setProfile,
  setFetchingUsers, setCanChangeEmail, cleanAuthData, setCanResetPassword, setCanChangePassword, setQuiz, getQuiz,
} from "redux/actions/user";
import {
  setShowSignIn,
  setShowSignUp,
  setShowSuccessfulSignUp,
  setShowSuccessfulResetPassword,
  setShowResetPassword,
  setShowSuccessfulDeletedAccount,
  setShowConfirmationOfAccountDeleting,
  setShowInvalidTokenModal,
  setShowChangeEmailOrPassword,
  setChangeEmailOrPasswordText,
  setShowQuiz,
  setShowQuizError,
  setShowCookiePopup,
  setShowDenyDeletingAccount,
  setShowRequestForChangeEmail,
  setShowRequestForChangePassword, setShowFirstLoginPopup,
} from "../actions/authPopupWindows";
import {getUserIdSelector} from "../reducers/user";
import {setAuthError, setProfileError, clearErrors} from "../actions/errors";
import { setQuizErrors, setQuizIsPassed, setResponseFromApi} from "../actions/user";
import api from "api";
import { getDocumentsWorker } from "./documents";
import {getSelectedLangSelector} from "../reducers/language";
import {intercomStart} from "../../utils/intercom";

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
      const { expiration_timestamp, key: token } = data;
      const nowTime = Math.floor(new Date().getTime() / 1000);

      if (token && expiration_timestamp && nowTime < expiration_timestamp) {
        yield call([api, "setToken"], token);

        const response = yield call([auth, "getSelf"]);
        if (response?.status !== 200) {
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

    // const userId = yield select(getUserIdSelector)

 // if(userId) {
 //   const idToCheck = yield call([Cookies, "get"], "cookie-agreed-user")
 //   isCookieAccepted = idToCheck? idToCheck?.includes(userId) : false
 // }else{
  const isCookieAccepted =  !!(yield call([Cookies, "get"], "cookie-agreed"))
 // }

    if(!isCookieAccepted){
      yield put(setShowCookiePopup(true))
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
    const response = yield call([auth, "signUp"], {token:payload.token, data: payload.data});
    if (response.status === 201) {
      yield put(setShowSignUp(false));
      yield put (setShowQuiz(false));
      yield put(setShowSuccessfulSignUp(true));
    }
    yield put(clearErrors())

  } catch (error) {
    if(error?.response?.data?.questions){
      yield put(setQuizErrors(error?.response?.data?.questions))
      yield put(setShowQuizError(true))
    }else{
      if(error?.response?.data?.email || error?.response?.data?.password){
        yield put(setShowQuiz(false))
      }
      yield put(
          setAuthError({ status: error.response.status, data: error.response.data })
      );
    }
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* signIn({ payload }) {
  try {
    yield put(setFetchingUsers(true));

    const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
    const session_key = session_key_from_LS || new Date().getTime();

    const response = yield call([auth, "signIn"], {token:payload.token, data: payload.data, session_key: session_key,});

    if(!session_key_from_LS){
      yield call([localStorage, "setItem"], "x_session_key", session_key);
    }

    const { data } = response;
    const { user, token } = data;
    yield put(setAccount(user));

      // const idToCheck = yield call([Cookies, "get"], "cookie-agreed-user")
     // const isCookieAccepted = idToCheck? idToCheck?.includes(user?.id) : false
    //
    // if(!isCookieAccepted){
    //   yield put(setShowCookiePopup(true))
    // }
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
    const authData = JSON.stringify({key:token.key, expiration_timestamp:token.expiration_timestamp});
    yield call([localStorage, "setItem"], "auth_data", authData);

    yield put(setShowSignIn(false));
    yield put(clearErrors())
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* logout({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "logOut"], {token: payload.token});
    yield call(clean);
    // window.Intercom('shutdown')
    // intercomStart()
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
    yield call([auth, "createProfile"], {token:payload.token, data: payload.data.profile});

    if (payload.data.image) {
      yield call([auth, "changeAvatar"], payload.data.image);
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
    yield call([auth, "changeProfile"], {token:payload.token, data: payload.data.profile});
    if (payload.data.image) {
      yield call([auth, "changeAvatar"], payload.data.image);
    } else if(payload.data.image === null){
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

function* requestForResetUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForResetPassword"], {token:payload.token, data: { email: payload.data }});
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

function* resetUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "resetPassword"], {token:payload.token, data: payload.data});
    const language = yield select(getSelectedLangSelector)
    yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your password has been successfully updated.' : 'Ditt lösenord har uppdaterats.'))
    yield put(setShowChangeEmailOrPassword(true))
    yield put(setCanResetPassword(false))
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

function* changeUserPassword({ payload }) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "changePassword"], {token:payload.token, data: payload.data});
    const language = yield select(getSelectedLangSelector)
    yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your password has been successfully updated.' : 'Ditt lösenord har uppdaterats.'))
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
    yield call([auth, "changeEmail"], {token:payload.token, data: payload.data});
    yield put(setResponseFromApi(true));
    const language = yield select(getSelectedLangSelector)
    yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your mail has been successfully updated.' : 'Din mail har updateras.'))
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
    const response = yield call([auth, "getSelf"]);
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
    if(error?.response?.status === 400 && error?.response?.data?.delete){
      yield put(setShowConfirmationOfAccountDeleting(false));
      yield put(setShowDenyDeletingAccount(true))
    }else{
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
      );
    }

  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForChangingEmail({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForChangingEmail"], {token: payload.token});
    yield put(setShowRequestForChangeEmail(true));
  } catch (error) {
    yield put(
        setAuthError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* requestForChangingPassword({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForChangingPassword"],{token: payload.token});
    yield put(setShowRequestForChangePassword(true));
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
    yield call([auth, "requestForTokenVerification"], payload?.key);
    if(payload?.type === 'email'){
      yield put(setCanChangeEmail(true))
    }else if(payload?.type === 'password'){
      yield put(setCanChangePassword(true))
    }
    // else if(payload.type === 'reset-password'){
    //   yield put(setCanResetPassword(true))
    // }
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
    yield call([auth, "checkQuizAnswers"], {token:payload.token, data: payload.data});
    yield call(getProfileFromApi)
  } catch (error) {
    if(error?.response?.data?.questions){
      yield put(setQuizErrors(error?.response?.data?.questions))
      yield put(setShowQuizError(true))
    }else{
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
      );
    }


  } finally {
    yield put(setFetchingUsers(false));
  }
}

function* passwordResetTokenVerificationRequest({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestForPasswordResetTokenVerification"], payload);
    yield put(setCanResetPassword(true))
    yield call([api, "setToken"], payload?.key);
  } catch (error) {
    if(error?.response?.status === 401 || error?.response?.status === 404){
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




function* activationTokenVerificationRequest({payload}) {
  try {
    yield put(setFetchingUsers(true));
    yield call([auth, "requestActivationTokenVerification"], payload);
    yield put(setShowFirstLoginPopup(true))
  } catch (error) {
      yield put(
          setAuthError({ status: error?.response?.status, data: error?.response?.data })
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
  yield put(clearErrors())
  const initLang = yield select(getSelectedLangSelector)
  window.Intercom('shutdown')
  intercomStart(initLang)
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
  yield takeEvery(REQUEST_FOR_RESET_PASSWORD, requestForResetUserPassword);
  yield takeEvery(CHANGE_PASSWORD, changeUserPassword);
  yield takeEvery(CHANGE_EMAIL, changeUserEmail);
  yield takeEvery(DELETE_ACCOUNT, deleteUserAccount);
  yield takeEvery(REQUEST_FOR_CHANGING_EMAIL, requestForChangingEmail);
  yield takeEvery(REQUEST_FOR_CHANGING_PASSWORD, requestForChangingPassword);
  yield takeEvery(CHECK_TOKEN, requestForCheckingToken)
  yield takeEvery( CHECK_TOKEN_FOR_RESET_PASSWORD, passwordResetTokenVerificationRequest)
  yield takeEvery(CLEAN_AUTH_DATA, clean)
  yield takeEvery(GET_QUIZ, requestForQuiz)
  yield takeEvery(CHECK_QUIZ_ANSWERS, requestForCheckingQuiz)
  yield takeEvery(GET_PROFILE_FROM_API, getProfileFromApi)
  yield takeEvery(CHECK_ACTIVATION_TOKEN, activationTokenVerificationRequest)



}

