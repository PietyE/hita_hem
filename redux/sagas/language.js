import { takeEvery, call } from "redux-saga/effects";
import Cookies from "js-cookie";

import { CHANGE_LANGUAGE } from "constants/actionsConstant";

function* setLangWorker({ payload }) {
  try {
    // if (typeof window !== "undefined" && localStorage) {
    //   yield call([localStorage, "setItem"], "language", payload);
    // }

    //Cookies.set("i18next", payload);
    yield call([Cookies, "set"], "i18next", payload);

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
