import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowSuccessfulQuizMessage} from "../../redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import Image from "next/image";
import IconCup from "../SuccessfulResetPassword/images/icon.svg";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";

const SuccessfulQuizMessage = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setShowSuccessfulQuizMessage(false));
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
                {t("successful_quiz_message.title")}
            </h2>
            <span className="successful_investment_text">
        {t("successful_quiz_message.text")}
      </span>
        </Modal>
    );
}

export default SuccessfulQuizMessage;