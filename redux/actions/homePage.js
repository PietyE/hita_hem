import {
  GET_HOME_PAGE,
  SET_HOME_PAGE,
  SET_IS_FETCHING_HOME_PAGE,
} from "constants/actionsConstant";

export const getHomePage = (payload) => ({
  type: GET_HOME_PAGE,
  payload,
});
export const setHomePage = (payload) => ({
  type: SET_HOME_PAGE,
  payload,
});

export const setIsFetchingHomePage = (payload) => ({
  type: SET_IS_FETCHING_HOME_PAGE,
  payload,
});
//
// export const getUpcomingCampaigns = (payload) => ({
//     type: GET_UPCOMING_CAMPAIGNS,
//     payload,
// })
//
