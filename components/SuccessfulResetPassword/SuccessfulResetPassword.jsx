import React from "react";
import Modal from "../ui/Modal";
import Image from "next/image";
import IconCup from "./images/icon.svg";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setShowSuccessfulResetPassword } from "../../redux/actions/authPopupWindows";

const SuccessfulResetPassword = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSuccessfulResetPassword(false));
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
        <Image src={IconCup} alt="cup" />
      </div>
      <h2 className="successful_investment_title">
        {t("successful_reset_password.title")}
      </h2>
      <span className="successful_investment_text">
        {t("successful_reset_password.text")}
      </span>
    </Modal>
  );
};

export default SuccessfulResetPassword;
