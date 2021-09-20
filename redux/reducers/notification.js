import {
  SET_NOTIFICATION_STATUS,
  SET_NOTIFICATION_MESSAGE,
  SET_NOTIFICATION_TITLE,
} from "constants/actionsConstant";

const initialState = {
  showNotification: false,
  message: "",
  title: "Something went wrong!",
};

export const getNotificationStatusSelector = (state) =>
  state.notification.showNotification;
export const getNotificationMessageSelector = (state) =>
  state.notification.message;
export const getNotificationTitleSelector = (state) => state.notification.title;

export const notification = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_NOTIFICATION_STATUS:
      return { ...state, showNotification: actions.payload };
    case SET_NOTIFICATION_MESSAGE:
      return { ...state, message: actions.payload };
    case SET_NOTIFICATION_TITLE:
      return { ...state, title: actions.payload };
    default:
      return state;
  }
};
