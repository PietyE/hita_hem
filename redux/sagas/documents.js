import { takeEvery, call, put } from "redux-saga/effects";
import { setDocuments } from "../actions/documents";
import { setError } from "../actions/errors";
import { GET_DOCUMENTS } from "constants/actionsConstant";

import api from "api";

const { documents } = api;

export function* getDocumentsWorker() {
  try {
    const result = yield call([documents, "getDocuments"]);
    yield put(setDocuments(result.data));
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  }
}

export function* aboutUsWatcher() {
  yield takeEvery(GET_DOCUMENTS, getDocumentsWorker);
}
