import {
  SET_NOTIFICATION_STATUS,
  SET_NOTIFICATION_MESSAGE,
  SET_NOTIFICATION_TITLE,
} from "constants/actionsConstant";

export const setNotification = (payload) => ({
  type: SET_NOTIFICATION_STATUS,
  payload,
});

export const setNotificationMessage = (payload) => ({
  type: SET_NOTIFICATION_MESSAGE,
  payload,
});

export const setNotificationTitle = (payload) => ({
  type: SET_NOTIFICATION_TITLE,
  payload,
});
