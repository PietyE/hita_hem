import { ERROR } from "constants/actionsConstant";

const initialState = {
  status: "",
  data: {},
};

export const getErrorSelector = (state) => state.errors;

export const errors = (state = initialState, actions) => {
  switch (actions.type) {
    case ERROR:
      return {
        ...state,
        status: actions?.payload?.status || null,
        data: actions?.payload?.data || null,
      };
    default:
      return state;
  }
};
