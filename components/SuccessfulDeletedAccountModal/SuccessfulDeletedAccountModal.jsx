import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { setShowSuccessfulDeletedAccount } from "redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import Icon from "./images/icon.svg";

const SuccessfulDeletedAccountModal = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSuccessfulDeletedAccount(false));
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={true}
      keyboard={false}
      centered={true}
      className="successful_investment_modal_container"
      bodyClassName="successful_investment_modal_dialog_container"
    >
      <div className="successful_investment_icon_container">
        <Image src={Icon} alt={Icon ? 'icon' : ' '} />
      </div>
      <h2 className="successful_investment_title">
        {" "}
        {t("successfulDeletedAccount.title")}
      </h2>
    </Modal>
  );
};

export default SuccessfulDeletedAccountModal;
