import {
    SET_FAQ_CATEGORIES,
    SET_FAQ_FETCHING,
    SAVE_FAQ_SEARCH,
    SAVE_ONE_CATEGORY,
    SET_CURRENT_CATEGORY,
    SET_CURRENT_QUESTION,
} from "constants/actionsConstant";


const initialState = {
    categories: [],
    search_results: null,
    one_category: [],
    isFetching: false,
    currentCategory: '',
    currentQuestion: '',
}

export const getFaqCategoriesSelector = state => state?.faq?.categories;
export const getFaqSearchResultsSelector = state => state?.faq?.search_results;
export const getOneCategorySelector = state => state?.faq?.one_category;
export const getCurrentCategorySelector = state => state?.faq?.currentCategory;
export const getCurrentQuestionSelector = state => state?.faq?.currentQuestion;


export const faq = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_FAQ_CATEGORIES:
            return {...state, categories: actions.payload};
        case SET_FAQ_FETCHING:
            return {...state, isFetching: actions.payload};
        case SAVE_FAQ_SEARCH:
            return {...state, search_results: actions.payload};
        case SAVE_ONE_CATEGORY:
            return {...state, one_category: actions.payload};
        case SET_CURRENT_QUESTION:
            return {...state, currentQuestion: actions.payload};
        default:
            return state;
    }
};