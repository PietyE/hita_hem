import { takeEvery, call, put } from "redux-saga/effects";

import { GET_RAISE_PAGE, SEND_FORM } from "constants/actionsConstant";
import { setRaisePage, setIsFetchingRaisePage } from "redux/actions/raisePage";
import {setShowRaiseError, setShowSuccessfulCampaignRegistration} from "../actions/authPopupWindows";
import api from "api";
import {setRaiseError, setError} from '../actions/errors';

const { raisePage } = api;

function* raisePageWorker() {
  try {
    yield put(setIsFetchingRaisePage(true));
    const res = yield call([raisePage, "get"]);
    const { data, status } = res;
    if (data && status === 200) {
      yield put(setRaisePage(data));
    }
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setIsFetchingRaisePage(false));
  }
}

function* sendForm({ payload }) {
  try {
    yield put(setIsFetchingRaisePage(true));
    const res = yield call([raisePage, "sendFormData"], payload);
    if (res.status === 201) {
      yield put(setShowSuccessfulCampaignRegistration(true));
    }
  } catch (error) {
    yield put(setShowRaiseError(true))
    yield put(
        yield put(setRaiseError({status:error?.response?.status, data:error?.response?.data}))
    );
  } finally {
    yield put(setIsFetchingRaisePage(false));
  }
}

export function* raisePageWatcher() {
  yield takeEvery(GET_RAISE_PAGE, raisePageWorker);
  yield takeEvery(SEND_FORM, sendForm);
}
