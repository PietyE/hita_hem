import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import { aboutUs } from "../reducers/aboutUs";
import { language } from "../reducers/language";
import { homePage } from "../reducers/homePage";
import { companies } from "../reducers/companies";
import { user } from "../reducers/user";
import { authPopupWindows } from "../reducers/authPopupWindows";
import { launchingSoon } from "../reducers/launchingSoon";
import { raisePage } from "../reducers/raisePage";
import { notification } from "../reducers/notification";
import { errors } from "../reducers/errors";
import { documents } from "../reducers/documents";

import rootSaga from "../sagas/index";

function rootReducer(state = {}, action) {
  switch (action.type) {
    case HYDRATE: {
      if (state?.user?.isFirstHydrate) {
        return { ...state };
      }
      return { ...state, ...action.payload };
    }

    default: {
      const combineReducer = combineReducers({
        aboutUs,
        language,
        homePage,
        companies,
        user,
        authPopupWindows,
        launchingSoon,
        raisePage,
        notification,
        errors,
        documents,
      });
      return combineReducer(state, action);
    }
  }
}

const bindMiddleware = (middleware) => {
  // if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV !== "production") {
  //   const { composeWithDevTools } = require("redux-devtools-extension");
  //   return composeWithDevTools(applyMiddleware(...middleware));
  // }
  return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
