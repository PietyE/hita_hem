import {
    GET_FAQ_CATEGORIES,
    SET_FAQ_CATEGORIES,
    SET_FAQ_FETCHING,
    FAQ_SEARCH,
    SAVE_FAQ_SEARCH,
    GET_ONE_CATEGORY,
    SAVE_ONE_CATEGORY,
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