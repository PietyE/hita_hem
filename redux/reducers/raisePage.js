import {
  SET_IS_FETCHING_RAISE_PAGE,
  SET_RAISE_PAGE,
    SET_SCROLL_TO_FORM,
} from "constants/actionsConstant";
const initialState = {
  raisePageContent: {
    raise_opportunities_title: "",
    raise_opportunities_description: "",
    platform_advantages_title: "",
    extra_features_title: "",
    image: '',
    headers: [],
    opportunities: [],
    platform: [],
    extra: [],
    seo:{},
  },
  scrollToForm: false,
  isFetching: false,
};

export const raisePage = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_RAISE_PAGE:
      return { ...state, raisePageContent: actions.payload };
    case SET_IS_FETCHING_RAISE_PAGE:
      return { ...state, isFetching: actions.payload };
    case SET_SCROLL_TO_FORM:
      return { ...state, scrollToForm: actions.payload };
    default:
      return state;
  }
};
const sortedByIndexPosts = (data) => data.sort((a, b) => a.index - b.index);

export const getRaisePageHeadersSelector = (state) =>
  sortedByIndexPosts(state.raisePage.raisePageContent.headers);
export const getRaisePageRaiseOpportunitiesTitleSelector = (state) =>
  state.raisePage.raisePageContent.raise_opportunities_title;
export const getRaisePageRaiseOpportunitiesDescriptionSelector = (state) =>
  state.raisePage.raisePageContent.raise_opportunities_description;
export const getRaisePagePlatformAdvantagesTitleSelector = (state) =>
  state.raisePage.raisePageContent.platform_advantages_title;
export const getRaisePageExtraFeaturesTitleSelector = (state) =>
  state.raisePage.raisePageContent.extra_features_title;
export const getRaisePagePlatformSelector = (state) =>
  sortedByIndexPosts(state.raisePage.raisePageContent.platform);
export const getRaisePageExtraSelector = (state) =>
  sortedByIndexPosts(state.raisePage.raisePageContent.extra);
export const getRaisePageOpportunitiesSelector = (state) =>
  sortedByIndexPosts(state.raisePage.raisePageContent.opportunities);
export const getIsFetchingRaisePageSelector = (state) =>
  state.raisePage.isFetching;
export const getRaisePageImageSelector = (state) =>
    state.raisePage.raisePageContent.images;

export const getRaisePageSeoSelector = (state) =>
    state.raisePage.raisePageContent.seo;

export const getScrollToFormSelector = (state) =>
    state.raisePage.scrollToForm;