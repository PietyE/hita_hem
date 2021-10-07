import {
  GET_ABOUT_US,
  SET_ABOUT_US,
  SET_EMAIL,
  SET_IS_FETCHING_ABOUT_US,
} from "constants/actionsConstant";

export const getAboutUs = () => ({
  type: GET_ABOUT_US,
});

export const setAboutUS = (payload) => ({
  type: SET_ABOUT_US,
  payload,
});

export const addEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const setIsFetchingAboutUs = (payload) => ({
  type: SET_IS_FETCHING_ABOUT_US,
  payload,
});
