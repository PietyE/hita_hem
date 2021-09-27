import React from "react";
import {useDispatch} from 'react-redux';
import { useTranslation } from "react-i18next";
import SvgIcon from "./SvgIcon";
import Modal from "components/ui/Modal";
import {setSuccessfulSubscribe} from 'redux/actions/authPopupWindows';

const SuccessfullySubscribedModal = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleClose = () =>{
    dispatch(setSuccessfulSubscribe(false))
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={true}
      keyboard={false}
      className="successfully_subscribed_modal_container"
      dialogClassName="successfully_subscribed_modal_dialog_container"
    >
      <div className="circle">
        <SvgIcon />
      </div>
      <span className="text_content">{t("successful_subscribe.text")}</span>
    </Modal>
  );
};

export default SuccessfullySubscribedModal;
