import { all, call } from "redux-saga/effects";

import { langWatcher } from "./language";
import { aboutUsWatcher } from "./aboutUs";
import { userWorker } from "./user";
import { companiesSagaWatcher } from "./companies";
import { homePageWatcher } from "./homePage";
import { launchingSoonWatcher } from "./launchingSoon";
import { raisePageWatcher } from "./raisePage";
import { errorsWatcher } from "./errors";
import { faqWatcher } from "./faq";
import { newsPageWatcher} from "./news";

export function* rootSagas() {
  yield all([
    langWatcher(),
    aboutUsWatcher(),
    call(userWorker),
    companiesSagaWatcher(),
    homePageWatcher(),
    launchingSoonWatcher(),
    raisePageWatcher(),
    errorsWatcher(),
    faqWatcher(),
    newsPageWatcher(),
  ]);
}

export default rootSagas;
