import {
    SET_NEWS_PAGE_SEO,
    SET_NEWS_PAGE_FETCHING
} from "constants/actionsConstant";


const initialState = {
    seo: {},
    isFetching: false,
};

export const getNewsPageSeoSelector = (state) => state.news.seo;
export const getNewsPageFetchingSelector = (state) => state.news.isFetching;

export const news = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_NEWS_PAGE_SEO:
            return {...state, seo: actions.payload};
        case SET_NEWS_PAGE_FETCHING:
            return {...state, isFetching: actions.payload};
        default:
            return state;
    }
};