import {
    GET_FAQ_CATEGORIES,
    SET_FAQ_CATEGORIES,
    SET_FAQ_FETCHING,
    FAQ_SEARCH,
    SAVE_FAQ_SEARCH,
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