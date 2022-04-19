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
    SET_IS_REDIRECT,
    SET_SEARCH_CAMPAIGNS,
    CLEAN_SEARCH_CAMPAIGNS,
} from "constants/actionsConstant";

import {companyTabConstants} from "constants/companyTabConstant";


const setFilter = (state, actions) => {
    if (Array.isArray(actions.payload)) {
        return {...state, filter: actions.payload};
    } else {
        const isContains = state.filter.find(
            (filter) => filter === actions.payload
        );
        if (!isContains) {
            return {...state, filter: [...state.filter, actions.payload]};
        } else {
            const filteredArray = state.filter.filter((el) => el !== actions.payload);
            return {...state, filter: filteredArray};
        }
    }
};

const initialState = {
    companiesList: [],
    listOfFoundCampaigns: [],
    companyDetail: {
        pk: "",
        seo: {},
        logo: "",
        logo_alter_text: " ",
        short_description: "",
        hidden_mode: false,
        website: "",
        title: "",
        description: "",
        left_date_start: '',
        left_date_end: '',
        private_mode_viewers: [],
        industry: {
            title: "",
        },
        recommended_campaign: [],
        status: "",
        country: "",
        valuation: null,
        user: {
            pk: "",
            username: "",
            email: "",
            last_login: "",
        },
        youtube_link: "",
        business_highlights: "",
        name: "",
        sub_title: '',
        header_image: "",
        header_image_list: [],
        images: [],
        image: '',
        image_alter_text: ' ',
        header_title: "",
        start_date: "",
        end_date: "",
        invested: null,
        minimum_invest_amount: null,
        goal: null,
        currency: "",
        price: null,
        percentage: null,
        social_url: [
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
        teammates: [
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
        ideas: [
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
        fininfo: [
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
    is_redirect_on: false,
    paymentDetails: {},
    isMoreCampaignsOnTheApi: false,
    faq_posts: [],
    investCompanyHeaderList: [],
    filter: [],
    isFetching: false,
    isError404: false,
    companyTabSelected: companyTabConstants.OVERVIEW,
    private_mod_viewers: [],
    private_mode: false,
};


export const getIsRedirectOnSelector = state => state?.companies?.is_redirect_on;


export const getMinimumInvestAmountSelector = state => state.companies.companyDetail.minimum_invest_amount;
export const getVideoLinkSelector = state => state.companies.companyDetail.youtube_link;

export const getCompanyListSelector = (state) => state.companies.companiesList;
export const getListOfFoundCampaignsSelector = (state) => state.companies.listOfFoundCampaigns;

export const getInvestHeaderCompanyListSelector = (state) =>
    state.companies.investCompanyHeaderList;

export const getFilterSelector = (state) => state.companies.filter;

export const getCompanyIdSelector = (state) => state.companies.companyDetail.pk;

export const getFinDocumentSelector = (state) =>
    state.companies.companyDetail.documents;

export const getCompanyTabSelected = (state) =>
    state.companies.companyTabSelected;

export const getCompanyFinInfoSelector = (state) =>
    state.companies.companyDetail.fininfo;

export const getTeatMateSetSelector = (state) =>
    state.companies.companyDetail.teammates;

export const getFaqSetSelector = (state) =>
    state.companies.companyDetail.faq_set;

export const getRecommendedCampaignsSelector = (state) =>
    state.companies.companyDetail.recommended_campaign;


export const getIsError404Selector = (state) => state.companies.isError404;

export const getIsFetchingCampaignsSelector = (state) =>
    state.companies.isFetching;

export const getAboutProjectTitleSelector = (state) =>
    state.companies.companyDetail.title;
export const getAboutProjectDescriptionSelector = (state) =>
    state.companies.companyDetail?.description;

export const getIdeaSectionContentSelector = (state) =>
    state.companies.companyDetail.ideas;

export const getHeaderImageSelector = (state) => state.companies.companyDetail.images;
export const getOverviewImageSelector = (state) => state.companies.companyDetail.image;
export const getOverviewImageAltTextSelector = (state) => state.companies.companyDetail.image_alter_text;

export const getCampaignSeoSelector = (state) =>
    state.companies.companyDetail.seo;

export const getHeaderTitleSelector = (state) =>
    state.companies.companyDetail.header_title;

export const getCompanyStatusSelector = (state) =>
    state.companies.companyDetail?.status;

export const getCompanyStatusInNumbersSelector = (state) =>
    state.companies.companyDetail?.status;

export const getCompanyLogoUrlSelector = (state) =>
    state.companies.companyDetail.logo;
export const getCompanyLogoAltTextSelector = (state) =>
    state.companies.companyDetail.logo_alter_text;
export const getCompanyNameSelector = (state) =>
    state.companies.companyDetail.name;
export const getCompanySubTitleSelector = state =>
    state.companies.companyDetail?.sub_title
export const getCompanyIndustryTitleSelector = (state) =>
    state.companies.companyDetail?.industry?.title || "";
export const getCountryTitleSelector = (state) =>
    state.companies.companyDetail?.country || "";
export const getWebSiteCompanySelector = (state) =>
    state.companies.companyDetail.website;

export const getSocialsCompanySelector = (state) => {
    return state.companies.companyDetail?.social_url?.map((s) => {
        return {name: s.social.name.toLowerCase(), url: s.url};
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

export const getCompanySlugSelector = (state) =>
    state.companies.companyDetail.slug;

export const getCampaignDataForSchemaSelector = state => {
    return {
        hidden_mode: state.companies?.companyDetail?.hidden_mode,
        logo: state.companies?.companyDetail?.logo,
        name: state.companies?.companyDetail?.name,
        country: state.companies?.companyDetail?.country,
        slug: state.companies?.companyDetail?.slug,
        social_url: state.companies?.companyDetail?.social_url,
        short_description: state.companies?.companyDetail?.short_description,
        images: state.companies?.companyDetail?.images,
        status: state.companies.companyDetail.status,
        end_date: state.companies.companyDetail.end_date,
        start_date: state.companies.companyDetail.start_date,
        currency: state.companies.companyDetail.currency,
    }
};

// export const getLeftDaysToStartSelector = (state) =>
//     state.companies.companyDetail?.left_date_start;
//
// export const getLeftDaysToEndSelector = (state) =>
//     state.companies.companyDetail?.left_date_end;
export const getLeftDate = state => state.companies?.companyDetail?.left_date;
// export const getDaysLeftSelector = (state) => {
//   const currentDate = new Date();
//   const endDate = new Date(state.companies.companyDetail.end_date);
//   const diff = endDate - currentDate;
//   return Math.floor(diff / (1000 * 3600 * 24));
// };

export const getValuationSelector = (state) =>
    state.companies.companyDetail.valuation;

export const getBusinessInvestedSelector = (state) =>
    state.companies.companyDetail.invested;
export const getBusinessGoalSelector = (state) =>
    state.companies.companyDetail.goal;
export const getBusinessShapePriceSelector = (state) =>
    state.companies.companyDetail.price;

export const getIsOwnerSelector = (state) => {
    return state.user.account.pk === state.companies.companyDetail.user;
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
        if (state?.companies?.companyDetail?.private_mode) {
            const currentUserId = state.user?.account?.pk;
            return !!state?.companies?.companyDetail.private_mode_viewers.find((el) => el === currentUserId);
        } else {
            return false;
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
            return {...state, isFetching: actions.payload};
        case SET_COMPANIES_LIST:
            return {
                ...state,
                companiesList: [...state.companiesList, ...actions.payload],
            };
        case SET_SEARCH_CAMPAIGNS:
            return {
                ...state,
                listOfFoundCampaigns: [...state.listOfFoundCampaigns, ...actions.payload],
            };
        case CLEAN_SEARCH_CAMPAIGNS:
            return {...state, listOfFoundCampaigns: actions.payload};
        case IS_MORE_COMPANIES:
            return {...state, isMoreCampaignsOnTheApi: actions.payload};
        case SET_COMPANY_BY_ID:
            return {...state, companyDetail: actions.payload};
        case CLEAR_COMPANY:
            return {...state, companyDetail: initialState.companyDetail};
        case RESET_COMPANY_TAB:
            return {...state, companyTabSelected: companyTabConstants.OVERVIEW};
        case RESET_COMPANY_LIST:
            return {...state, companiesList: []};
        case SET_ERROR_404_COMPANIES:
            return {...state, isError404: actions.payload};
        case SET_SELECTED_TAB:
            return {...state, companyTabSelected: actions.payload};
        case SET_INVEST_COMPANIES_LIST:
            return {...state, investCompanyHeaderList: actions.payload};
        case SET_FILTER:
            return setFilter(state, actions);
        case SET_POSTS:
            return {...state, faq_posts: actions.payload};
        case SET_IS_REDIRECT:
            return {...state, is_redirect_on: actions.payload};
        default:
            return state;
    }
};
