import React from "react";
import { useTranslation } from "react-i18next";
import SvgIcon from "./SvgIcon";
import Modal from "components/ui/Modal";

const SuccessfullySubscribedModal = ({ isShow = false, onHide }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={isShow}
      onHide={onHide}
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
