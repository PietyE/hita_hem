import React from "react";
import Image from "next/image";
import Modal from "../ui/Modal";
import IconCup from "./images/icon.svg";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setShowSuccessfulInvestment } from "redux/actions/authPopupWindows";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";

const SuccessfulInvestmentModal = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSuccessfulInvestment(false));
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
        <Image src={IconCup} alt={Icon ? 'cup icon' : ' '} />
      </div>
      <h2 className="successful_investment_title">
        {t("successfulInvestment.title")}
      </h2>
      <span className="successful_investment_text">
        {t("successfulInvestment.text")}
      </span>
    </Modal>
  );
};

export default SuccessfulInvestmentModal;
