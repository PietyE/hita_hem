import React, {useCallback} from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
    setShowCompleteChangeAccountType,
} from "../../redux/actions/authPopupWindows";
import SocialsAuthButtons from "../SocialsAuthButtons";

const CompleteChangeAccountTypePopup = ({show}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const _setShowCompleteChangeAccountType = useCallback(() => {
        dispatch(setShowCompleteChangeAccountType(false));
    }, [dispatch]);

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
                <Image src={Icon} alt={Icon ? 'icon' : ' '}/>
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
            <SocialsAuthButtons type='change_account_type'/>
        </Modal>
    );
}

export default CompleteChangeAccountTypePopup;