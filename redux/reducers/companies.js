import {
  SET_COMPANIES_LIST,
  SET_COMPANY_BY_ID,
  CLEAR_COMPANY,
  SET_IS_FETCHING_COMPANIES,
  SET_ERROR_404_COMPANIES,
  SET_SELECTED_TAB,
  SET_INVEST_COMPANIES_LIST,
  SET_FILTER,
  SET_POSTS,
  RESET_COMPANY_TAB,
  RESET_COMPANY_LIST,
  IS_MORE_COMPANIES,
} from "constants/actionsConstant";

import { companyTabConstants } from "constants/companyTabConstant";
import {
  chooseCorrectResolution,
} from "../../utils/utils";

const setFilter = (state, actions) => {
  if (Array.isArray(actions.payload)) {
    return { ...state, filter: actions.payload };
  } else {
    const isContains = state.filter.find(
      (filter) => filter === actions.payload
    );
    if (!isContains) {
      return { ...state, filter: [...state.filter, actions.payload] };
    } else {
      const filteredArray = state.filter.filter((el) => el !== actions.payload);
      return { ...state, filter: filteredArray };
    }
  }
};

const initialState = {
  companiesList: [],
  companyDetail: {
    id: "",
    logo: "",
    short_description: "",
    website: "",
    title: "",
    description: "",
    industry: {
      title: "",
    },
    status: "",
    country: "",
    valuation: null,
    user: {
      id: "",
      username: "",
      email: "",
      last_login: "",
    },
    youtube_link: "",
    business_highlights: "",
    name: "",
    header_image: "",
    header_image_list: [],
    header_title: "",
    start_date: "",
    end_date: "",
    invested: null,
    goal: null,
    currency: "",
    price: null,
    percentage: null,
    socialurl_set: [
      {
        url: "",
        social: {
          name: "Facebook",
        },
      },
      {
        url: "",
        social: {
          name: "Instagram",
        },
      },
      {
        url: "",
        social: {
          name: "LinkedIn",
        },
      },
      {
        url: "",
        social: {
          name: "Twitter",
        },
      },
    ],
    teammate_set: [
      {
        title: "",
        description: "",
        index: 1,
      },
      {
        title: "",
        description: "",
        index: 2,
      },
      {
        title: "",
        description: "",
        index: 3,
      },
    ],
    companypageidea_set: [
      {
        title: "",
        description: "",
        index: 2,
      },
      {
        title: "",
        description: "",
        index: 3,
      },
      {
        title: "",
        description: "",
        index: 3,
      },
      {
        title: "",
        description: "",
        index: 4,
      },
    ],
    companypagefininfo_set: [
      {
        title: "",
        description: "",
        index: 1,
      },
      {
        title: "",
        description: "",
        index: 2,
      },
      {
        title: "",
        description: "",
        index: 3,
      },
    ],
    faq_set: [],
  },
  paymentDetails: {},
  isMoreCampaignsOnTheApi: true,
  faq_posts: [],
  investCompanyHeaderList: [],
  filter: [],
  isFetching: false,
  isError404: false,
  companyTabSelected: companyTabConstants.IDEA,
  private_mod_viewers: [],
  private_mode: false,
};

export const getVideoLinkSelector = state => state.companies.companyDetail.youtube_link;

export const getCompanyListSelector = (state) => state.companies.companiesList;

export const getInvestHeaderCompanyListSelector = (state) =>
  state.companies.investCompanyHeaderList;

export const getFilterSelector = (state) => state.companies.filter;

export const getCompanyIdSelector = (state) => state.companies.companyDetail.id;

export const getFinDocumentSelector = (state) =>
  state.companies.companyDetail.companydocument_set;

export const getCompanyTabSelected = (state) =>
  state.companies.companyTabSelected;

export const getCompanyFinInfoSelector = (state) =>
  state.companies.companyDetail.companypagefininfo_set;

export const getTeatMateSetSelector = (state) =>
  state.companies.companyDetail.teammate_set;

export const getFaqSetSelector = (state) =>
  state.companies.companyDetail.faq_set;

export const getIsError404Selector = (state) => state.companies.isError404;

export const getIsFetchingCampaignsSelector = (state) =>
  state.companies.isFetching;

export const getAboutProjectTitleSelector = (state) =>
  state.companies.companyDetail.title;
export const getAboutProjectDescriptionSelector = (state) =>
  state.companies.companyDetail.description;

export const getIdeaSectionContentSelector = (state) =>
  state.companies.companyDetail.companypageidea_set;

export const getHeaderImageSelector = (state) =>
  chooseCorrectResolution(state.companies.companyDetail.header_image_list);

export const getHeaderImage1Selector = (state) =>
  state.companies.companyDetail.header_image;

export const getHeaderTitleSelector = (state) =>
  state.companies.companyDetail.header_title;

export const getCompanyStatusSelector = (state) =>
    state.companies.companyDetail?.status;

export const getCompanyStatusInNumbersSelector = (state) =>
  state.companies.companyDetail?.status;

export const getCompanyLogoUrlSelector = (state) =>
  state.companies.companyDetail.logo;
export const getCompanyNameSelector = (state) =>
  state.companies.companyDetail.name;
export const getCompanyIndustryTitleSelector = (state) =>
  state.companies.companyDetail?.industry?.title || "";
export const getCountryTitleSelector = (state) =>
  state.companies.companyDetail?.country || "";
export const getWebSiteCompanySelector = (state) =>
  state.companies.companyDetail.website;

export const getSocialsCompanySelector = (state) => {
  return state.companies.companyDetail?.socialurl_set?.map((s) => {
    return { name: s.social.name.toLowerCase(), url: s.url };
  });
};

export const getBusinessHighlightSelector = (state) =>
  state.companies.companyDetail.business_highlights;

export const getBusinessStartDaySelector = (state) =>
  state.companies.companyDetail.start_date;

export const getBusinessEndDaySelector = (state) =>
  state.companies.companyDetail.end_date;
export const getBusinessCurrencySelector = (state) =>
  state.companies.companyDetail.currency;
export const getPercentageSelector = (state) =>
  state.companies.companyDetail.percentage;

export const getDaysLeftSelector = (state) => {
  const currentDate = new Date();
  const endDate = new Date(state.companies.companyDetail.end_date);
  const diff = endDate - currentDate;
  return Math.floor(diff / (1000 * 3600 * 24));
};

export const getValuationSelector = (state) =>
    state.companies.companyDetail.valuation;

export const getBusinessInvestedSelector = (state) =>
  state.companies.companyDetail.invested;
export const getBusinessGoalSelector = (state) =>
  state.companies.companyDetail.goal;
export const getBusinessShapePriceSelector = (state) =>
  state.companies.companyDetail.price;

export const getIsOwnerSelector = (state) => {
  return state.user.account.id === state.companies.companyDetail.user;
};

export const getFaqAllPostsSelector = (state) => state.companies.faq_posts;

export const getFaqUsersPostsSelector = (state) =>
  state.companies.faq_posts.filter((el) => el.question === null);

export const getIsMoreCampaignsSelector = (state) =>
  state.companies.isMoreCampaignsOnTheApi;

export const getPaymentDetailsSelector = (state) =>
  state.companies.paymentDetails;

export const canUserInvestSelector = (state) => {
  const status = state.companies.companyDetail.status;
  if (status === 1) {
    if (state.companies.companyDetail.private_mode) {
      const currentUserId = state.user?.account?.id;
      return state.companies.companyDetail.private_mode_viewers.find((el) => {
        return el.id === currentUserId;
      });
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export const getIsCompanyClosedSelector = (state) => {
  const status = state.companies.companyDetail.status;
  if (status === 2 || status === 4) return true;
  if (status === 3 || status === 1) return false;
};

export const companies = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_IS_FETCHING_COMPANIES:
      return { ...state, isFetching: actions.payload };
    case SET_COMPANIES_LIST:
      return {
        ...state,
        companiesList: [...state.companiesList, ...actions.payload],
      };
    case IS_MORE_COMPANIES:
      return { ...state, isMoreCampaignsOnTheApi: actions.payload };
    case SET_COMPANY_BY_ID:
      return { ...state, companyDetail: actions.payload };
    case CLEAR_COMPANY:
      return { ...state, companyDetail: initialState.companyDetail };
    case RESET_COMPANY_TAB:
      return { ...state, companyTabSelected: companyTabConstants.IDEA };
    case RESET_COMPANY_LIST:
      return { ...state, companiesList: [] };
    case SET_ERROR_404_COMPANIES:
      return { ...state, isError404: actions.payload };
    case SET_SELECTED_TAB:
      return { ...state, companyTabSelected: actions.payload };
    case SET_INVEST_COMPANIES_LIST:
      return { ...state, investCompanyHeaderList: actions.payload };
    case SET_FILTER:
      return setFilter(state, actions);
    case SET_POSTS:
      return { ...state, faq_posts: actions.payload };
    default:
      return state;
  }
};
