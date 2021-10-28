import React from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/icon.svg";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowDenyDeletingAccount} from "redux/actions/authPopupWindows";

const ShowDenyDeletingAccount = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setShowDenyDeletingAccount(false));
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
                <Image src={Icon} alt="warning" />
            </div>
            <h2 className="successful_investment_title">
                {t("denyDeletingAccount.title")}
            </h2>
            <span className="successful_investment_text">
        {t("denyDeletingAccount.text")}
        <a href={"mailto:" + "info@accumeo.com"}>info@accumeo.com</a>
      </span>
        </Modal>
    );
}

export default ShowDenyDeletingAccount;