import { ERROR } from "constants/actionsConstant";

export const setError = (payload) => ({
  type: ERROR,
  payload,
});
