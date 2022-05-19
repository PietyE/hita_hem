import {
    GET_FAQ_CATEGORIES,
    SET_FAQ_CATEGORIES,
    SET_FAQ_FETCHING,
    FAQ_SEARCH,
    SAVE_FAQ_SEARCH,
    GET_ONE_CATEGORY,
    SAVE_ONE_CATEGORY,
    SET_CURRENT_CATEGORY,
    SET_CURRENT_QUESTION,
    GET_QUESTION,
    SET_QUESTION,
    SET_404_IN_QUESTION,
    SET_FAQ_PAGE_SEO,
    GET_FAQ_PAGE_SEO,
} from "constants/actionsConstant";


export const getFaqCategories = (payload) => ({
    type: GET_FAQ_CATEGORIES,
    payload,
});

export const setFaqCategories = (payload) => ({
    type: SET_FAQ_CATEGORIES,
    payload,
});

export const setFaqFetching = (payload) => ({
    type: SET_FAQ_FETCHING,
    payload,
});

export const faqSearch = (payload) => ({
    type: FAQ_SEARCH,
    payload,
});

export const saveSearchResults = (payload) => ({
    type: SAVE_FAQ_SEARCH,
    payload,
});

export const getOneCategory = (payload) => ({
    type: GET_ONE_CATEGORY,
    payload,
});

export const saveOneCategory = (payload) => ({
    type: SAVE_ONE_CATEGORY,
    payload,
});

export const setCurrentCategory = (payload) => ({
    type: SET_CURRENT_CATEGORY,
    payload,
});

export const setCurrentQuestion = (payload) => ({
    type: SET_CURRENT_QUESTION,
    payload,
});

export const getQuestion = (payload) => ({
    type: GET_QUESTION,
    payload,
});

export const setQuestion = (payload) => ({
    type: SET_QUESTION,
    payload,
});

export const set404InQuestion = (payload) => ({
    type: SET_404_IN_QUESTION,
    payload,
});

export const setFaqPageSeo = (payload) => ({
    type: SET_FAQ_PAGE_SEO,
    payload,
});

export const getFaqPageSeo = (payload) => ({
    type: GET_FAQ_PAGE_SEO,
    payload,
});
