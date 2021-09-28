import { takeEvery, call } from "redux-saga/effects";
import Cookies from "js-cookie";

import { CHANGE_LANGUAGE } from "constants/actionsConstant";

function* setLangWorker({ payload }) {
  try {
    Cookies.set("NEXT_LOCALE", payload);
    const pathname = window.location.pathname;
    let newPathName = "";
    if (payload === "en") {
      newPathName = pathname.replace(pathname.length === 3 ? "sv" : "/sv", "");
    }
    if (payload === "sv") {
      newPathName = pathname.replace("/", "/sv/");
    }
    window.location.replace(newPathName);
  } catch (error) {
    //to do
  }
}

export function* langWatcher() {
  yield takeEvery(CHANGE_LANGUAGE, setLangWorker);
}
