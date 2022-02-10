import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Modal from "components/ui/Modal";
import { setShowSuccessfulCampaignRegistration } from "redux/actions/authPopupWindows";
import IconCup from "./images/icon.svg";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";

const SuccessfullyCampaignRegistrationForm = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSuccessfulCampaignRegistration(false));
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={true}
      keyboard={false}
      className="successful_sign_up_modal_container"
      bodyClassName="successful_sign_up_modal_dialog_container"
    >
      <div className="successful_sign_up_icon_container">
        <Image src={IconCup} alt={Icon ? 'cup icon' : ' '}  />
      </div>
      <h2 className="successful_sign_up_title">
        {t("successful_campaign_registration.title")}
      </h2>
      <span className="successful_sign_up_text">
        {t("successful_campaign_registration.text")}
      </span>
    </Modal>
  );
};

export default SuccessfullyCampaignRegistrationForm;
