import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { setShowConfirmationOfAccountDeleting } from "redux/actions/authPopupWindows";
import { deleteAccount } from "redux/actions/user";
import Icon from "./images/icon.svg";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const ShowConfirmationOfAccountDeletion = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const _setShowConfirmationOfAccountDeleting = useCallback(() => {
    dispatch(setShowConfirmationOfAccountDeleting(false));
  }, [dispatch]);
  const _deleteAccount = useCallback(() => {
    dispatch(deleteAccount());
  }, [dispatch]);

  return (
    <Modal
      show={show}
      onHide={_setShowConfirmationOfAccountDeleting}
      backdrop={true}
      keyboard={false}
      centered={true}
      className="deleting_account_modal_container"
      bodyClassName="deleting_account_modal_dialog_container"
    >
      <div className="deleting_account_icon_container">
        <Image src={Icon} alt={Icon ? 'icon' : ' '} />
      </div>
      <h2 className="deleting_account_title">
        {t("confirmationOfAccountDeletion.title")}
      </h2>
      <span className="deleting_account_text">
        {t("confirmationOfAccountDeletion.text")}
      </span>
      <div className="deleting_account_button_wrapper">
        <Button
          className="deleting_account_button_yes"
          colorStyle="dark-violet"
          onClick={_deleteAccount}
        >
          {t("confirmationOfAccountDeletion.button_confirm")}
        </Button>
        <Button
          className="deleting_account_button_no"
          colorStyle="dark-violet"
          onClick={_setShowConfirmationOfAccountDeleting}
        >
          {t("confirmationOfAccountDeletion.button_discard")}
        </Button>
      </div>
    </Modal>
  );
};

export default ShowConfirmationOfAccountDeletion;
