import {
  SET_HOME_PAGE,
  SET_IS_FETCHING_HOME_PAGE,
} from "constants/actionsConstant";

const initialState = {
  homePageContent: {
    upcoming: [],
    future: [],
    headers: [],
    raise_set: [],
    invest_set: [],
    seo:{},
  },
  isFetching: false,
};

const sortedByIndex = (data) => data.sort((a, b) => a.index - b.index);

export const getHomePageHeadersSelector = (state) =>
  sortedByIndex(state.homePage.homePageContent.headers);
export const getHomePageFutureSelector = (state) =>
  sortedByIndex(state.homePage.homePageContent.future);
export const getHomePageRaisesSelector = (state) =>
  sortedByIndex(state.homePage.homePageContent.raise_set);
export const getHomePageInvestSelector = (state) =>
  sortedByIndex(state.homePage.homePageContent.invest_set);
export const getHomePageUpcomingSelector = (state) =>
  sortedByIndex(state.homePage.homePageContent.upcoming).filter(el=>el.status === 1);
export const getIsFetchingHomePageSelector = (state) =>
  state.homePage.isFetching;
export const getSeoSelector = (state) =>
    state.homePage.homePageContent?.seo;

export const homePage = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_HOME_PAGE:
      return { ...state, homePageContent: actions.payload };
    case SET_IS_FETCHING_HOME_PAGE:
      return { ...state, isFetching: actions.payload };
    default:
      return state;
  }
};
