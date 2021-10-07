import {
  GET_RAISE_PAGE,
  SET_RAISE_PAGE,
  SEND_FORM,
  SET_IS_FETCHING_RAISE_PAGE,
} from "constants/actionsConstant";

export const getRaisePage = (payload) => ({
  type: GET_RAISE_PAGE,
  payload,
});
export const setRaisePage = (payload) => ({
  type: SET_RAISE_PAGE,
  payload,
});
export const sendForm = (payload) => ({
  type: SEND_FORM,
  payload,
});

export const setIsFetchingRaisePage = (payload) => ({
  type: SET_IS_FETCHING_RAISE_PAGE,
  payload,
});
