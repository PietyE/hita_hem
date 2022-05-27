import React, {useCallback} from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";
import Button from "../ui/Button";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
    setShowCompleteChangeAccountType,
} from "../../redux/actions/authPopupWindows";

const CompleteChangeAccountTypePopup = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const _setShowCompleteChangeAccountType = useCallback(() => {
        dispatch(setShowCompleteChangeAccountType(false));
    }, [dispatch]);

    const handleClose = () => {
        _setShowCompleteChangeAccountType()
    }
    return (
        <Modal
            show={show}
            onHide={_setShowCompleteChangeAccountType}
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
                {t("complete_change_account_type.title")}
            </h2>
            <span className="deleting_account_text deleting_account_text_first">
        {t("complete_change_account_type.description")}
      </span>
            <span className="deleting_account_text">
        {t("complete_change_account_type.description2")}
      </span>
            <div className="deleting_account_button_wrapper">
                <Button
                    className="data_loss_warning_button"
                    colorStyle="dark-green"
                    onClick={handleClose}
                >
                    {t("complete_change_account_type.button")}
                </Button>
                <Button
                    className="data_loss_warning_button"
                    colorStyle="dark-green"
                    onClick={handleClose}
                >
                    {t("complete_change_account_type.back_button")}
                </Button>
            </div>
        </Modal>
    );
}

export default CompleteChangeAccountTypePopup;