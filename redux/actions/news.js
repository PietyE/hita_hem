import {
    GET_NEWS_PAGE_SEO,
    SET_NEWS_PAGE_SEO,
    SET_NEWS_PAGE_FETCHING,
} from "constants/actionsConstant";

export const getNewsSeo = (payload) => ({
    type: GET_NEWS_PAGE_SEO,
    payload,
});

export const setNewsSeo = (payload) => ({
    type: SET_NEWS_PAGE_SEO,
    payload,
});

export const setNewsFetching = (payload) => ({
    type: SET_NEWS_PAGE_FETCHING,
    payload,
});