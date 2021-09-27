import { takeEvery, call, put } from "redux-saga/effects";

import api from "api";
import { GET_ABOUT_US, SET_EMAIL } from "constants/actionsConstant";
import {
  setAboutUS,
  addEmail,
  setIsFetchingAboutUs,
} from "redux/actions/aboutUs";
import { setError } from "../actions/errors";
import {setSuccessfulSubscribe} from '../actions/authPopupWindows';


function* aboutUsWorker() {
  try {
    yield put(setIsFetchingAboutUs(true));
    const { aboutAs } = api;
    const res = yield call([aboutAs, "get"]);
    const { data, status } = res;
    if (data && status === 200) {
      yield put(setAboutUS(data));
    }
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setIsFetchingAboutUs(false));
  }
}

function* sendEmail({ payload }) {
  try {
    yield put(setIsFetchingAboutUs(true));
    const { addEmail } = api;
    yield call([addEmail, "addEmail"], `email=${payload}`);
    yield put(setSuccessfulSubscribe(true))
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setIsFetchingAboutUs(false));
  }
}

export function* aboutUsWatcher() {
  yield takeEvery(GET_ABOUT_US, aboutUsWorker);
  yield takeEvery(SET_EMAIL, sendEmail);
}
