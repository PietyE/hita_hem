import { takeEvery, put, select, call } from "redux-saga/effects";
import { getErrorSelector } from "../reducers/errors";
import { setAccount, setAuth, setProfile, setToken } from "../actions/user";
import {
  setNotification,
  setNotificationMessage,
  setNotificationTitle,
} from "../actions/notification";
import {ERROR, SET_AUTH_ERROR, SET_PROFILE_ERROR} from 'constants/actionsConstant';
import api from "../../api";

function* errorHandler() {
  const error = yield select(getErrorSelector);
  yield put(setNotification(true));
  switch (error?.status) {
    case 500:
      yield put(setNotificationTitle("Internal Server Error: 500"));
      yield put(
        setNotificationMessage(
          "The server encountered an internal error or misconfiguration and was unable to complete your request."
        )
      );
      break;
    case 401:
      yield put(setAccount({}));
      yield put(setToken({}));
      yield put(setProfile({}));
      yield put(setAuth(false));
      if (typeof window !== "undefined" && localStorage) {
        yield call([localStorage, "removeItem"], "auth_data");
      }

      yield call([api, "deleteToken"]);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      // re-login - fix next
      // yield put(setNotificationMessage('The token has expired. re-login'))
      break;
    case 400:
//////////////////временно пока приходит пустая ошибка по существующей подписке
      if(!error?.data){
        yield put(setNotificationTitle('Ooops...'))
        yield put(setNotificationMessage('Such mail already exists'))
      }else {
        yield put(setNotificationMessage(Array.isArray(error?.data?.email)? error?.data?.email[0]:error?.data?.email))

      }

      break
    default:
      return null;
  }
}

export function* errorsWatcher() {
  yield takeEvery([ERROR, SET_AUTH_ERROR, SET_PROFILE_ERROR], errorHandler);
}
