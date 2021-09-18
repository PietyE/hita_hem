import { takeEvery, call } from "redux-saga/effects";
import { SET_LANGUAGE, CHANGE_LANGUAGE } from "constants/actionsConstant";

function* setLangWorker({ payload }) {
  try {
    if (typeof window !== "undefined" && localStorage) {
      yield call([localStorage, "setItem"], "language", payload);
    }

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  } catch (error) {
    //to do
  }
}

export function* langWatcher() {
  yield takeEvery(CHANGE_LANGUAGE, setLangWorker);
}
