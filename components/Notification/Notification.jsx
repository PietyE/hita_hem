import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import {
  setNotification,
  setNotificationMessage,
} from "../../redux/actions/notification";
import {
  getNotificationMessageSelector,
  getNotificationTitleSelector,
} from "redux/reducers/notification";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const Notification = ({ show }) => {
  const dispatch = useDispatch();
  const message = useSelector(getNotificationMessageSelector);
  const title = useSelector(getNotificationTitleSelector);
  const language = useSelector(getSelectedLangSelector)
  const handleClose = useCallback(() => {
    dispatch(setNotification(false));
    dispatch(setNotificationMessage(""));
  }, [dispatch]);

  useEffect(() => {
    if (show) {
      setTimeout(() => handleClose(), 8000);
    }
  }, [show, handleClose]);

  let _title
  if(title){
    _title = title
  }else{
    _title = language === 'en' ? 'Error' : 'Något gick fel.'
  }
  return (
    <Alert
      variant="danger"
      show={show}
      onClose={handleClose}
      dismissible
      className="notification"
    >
      <Alert.Heading>{_title}</Alert.Heading>
      <p>{Array.isArray(message)?message[0]:message}</p>
    </Alert>
  );
};

export default Notification;
