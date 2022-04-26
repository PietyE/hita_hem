import {
    SET_FAQ_CATEGORIES,
    SET_FAQ_FETCHING,
    SAVE_FAQ_SEARCH,

} from "constants/actionsConstant";


const initialState = {
    categories: [],
    search_results: [],
    isFetching: false,

}

export const getFaqCategoriesSelector = state => state?.faq?.categories;
export const getFaqSearchResultsSelector = state => state?.faq?.search_results;


export const faq = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_FAQ_CATEGORIES:
            return {...state, categories: actions.payload};
        case SET_FAQ_FETCHING:
            return {...state, isFetching: actions.payload};
        case SAVE_FAQ_SEARCH:
            return {...state, search_results: actions.payload};
        default:
            return state;
    }
};