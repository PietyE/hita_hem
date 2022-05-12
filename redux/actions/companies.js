import {
  GET_COMPANIES_LIST,
  GET_COMPANY_BY_SLAG,
  SET_COMPANIES_LIST,
  SET_COMPANY_BY_ID,
  CLEAR_COMPANY,
  SET_IS_FETCHING_COMPANIES,
  SET_ERROR_404_COMPANIES,
  SET_SELECTED_TAB,
  SET_INVEST_COMPANIES_LIST,
  SET_FILTER,
  GET_COMPANIES_HEADER_LIST,
  ADD_POST,
  GET_POSTS,
  SET_POSTS,
  ADD_FAQ_ANSWER,
  RESET_COMPANY_TAB,
  RESET_COMPANY_LIST,
  IS_MORE_COMPANIES,
  MAKE_PAYMENT,
  SET_IS_REDIRECT,
  GET_COMPANY_BY_NAME,
  GET_SEARCH_CAMPAIGNS,
  SET_SEARCH_CAMPAIGNS,
  CLEAN_SEARCH_CAMPAIGNS,
  SET_CAMPAIGN_SEARCH_QUERY,
  SET_CAMPAIGN_OFFSET,
  GET_INVEST_PAGE_SEO,
  SET_INVEST_PAGE_SEO,
  GET_SEARCH_PAGE_SEO,
  SET_SEARCH_PAGE_SEO
} from "constants/actionsConstant";

export const setSelectedTab = (payload) => ({
  type: SET_SELECTED_TAB,
  payload,
});

export const setError404 = (payload) => ({
  type: SET_ERROR_404_COMPANIES,
  payload,
});

export const getCompaniesList = (payload) => ({
  type: GET_COMPANIES_LIST,
  payload,
});

export const getCompaniesHeaderList = (payload) => ({
  type: GET_COMPANIES_HEADER_LIST,
  payload,
});

export const getCompanyBySlag = (payload) => ({
  type: GET_COMPANY_BY_SLAG,
  payload,
});

export const setCompaniesList = (payload) => ({
  type: SET_COMPANIES_LIST,
  payload,
});
export const setInvestCompaniesList = (payload) => ({
  type: SET_INVEST_COMPANIES_LIST,
  payload,
});

export const setCompanyById = (payload) => ({
  type: SET_COMPANY_BY_ID,
  payload,
});

export const clearCompany = () => ({
  type: CLEAR_COMPANY,
});

export const setIsFetchingCompany = (payload) => ({
  type: SET_IS_FETCHING_COMPANIES,
  payload,
});

export const setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
});

export const addFaqPost = (payload) => ({
  type: ADD_POST,
  payload,
});
export const getFaqPosts = (payload) => ({
  type: GET_POSTS,
  payload,
});
export const setFaqPosts = (payload) => ({
  type: SET_POSTS,
  payload,
});

export const addFaqAnswer = (payload) => ({
  type: ADD_FAQ_ANSWER,
  payload,
});

export const resetCompanyTab = (payload) => ({
  type: RESET_COMPANY_TAB,
  payload,
});
export const resetCompanyList = (payload) => ({
  type: RESET_COMPANY_LIST,
  payload,
});
export const isMoreCampaignsOnTheApi = (payload) => ({
  type: IS_MORE_COMPANIES,
  payload,
});
export const makePayment = (payload) => ({
  type: MAKE_PAYMENT,
  payload,
});

export const setRedirect = (payload) => ({
  type: SET_IS_REDIRECT,
  payload,
});

export const getCompanyByName = (payload) => ({
  type: GET_COMPANY_BY_NAME,
  payload,
});

export const searchCampaigns = (payload) => ({
  type: GET_SEARCH_CAMPAIGNS,
  payload,
});

export const saveSearchedCampaigns = (payload) => ({
  type: SET_SEARCH_CAMPAIGNS,
  payload,
});

export const cleanSearchedCampaigns = (payload) => ({
  type: CLEAN_SEARCH_CAMPAIGNS,
  payload,
});

export const setCampaignSearchQuery = (payload) => ({
  type: SET_CAMPAIGN_SEARCH_QUERY,
  payload,
});

export const setCampaignOffset = (payload) => ({
  type: SET_CAMPAIGN_OFFSET,
  payload,
});

export const setInvestPageSeo = (payload) => ({
  type: SET_INVEST_PAGE_SEO,
  payload,
});

export const getInvestPageSeo = (payload) => ({
  type: GET_INVEST_PAGE_SEO,
  payload,
});

export const setSearchPageSeo = (payload) => ({
  type: SET_SEARCH_PAGE_SEO,
  payload,
});

export const getSearchPageSeo = (payload) => ({
  type: GET_SEARCH_PAGE_SEO,
  payload,
});