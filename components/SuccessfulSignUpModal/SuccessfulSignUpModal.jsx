import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "components/ui/Modal";
import { setShowSuccessfulSignUp } from "redux/actions/authPopupWindows";
import IconCup from "public/images/successfulSugnUpIcon.svg";
import { useTranslation } from "react-i18next";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";

const SuccessfulSignUpModal = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSuccessfulSignUp(false));
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
        <Image src={IconCup} alt={Icon ? 'cup icon' : ' '} />
      </div>
      <h2 className="successful_sign_up_title">
        {t("successful_sign_up.title")}
      </h2>
      <span className="successful_sign_up_text">
        {t("successful_sign_up.text")}
      </span>
    </Modal>
  );
};

export default SuccessfulSignUpModal;
