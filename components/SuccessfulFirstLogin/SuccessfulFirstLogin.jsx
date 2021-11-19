import React from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/message.svg";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowFirstLoginPopup} from "../../redux/actions/authPopupWindows";

function SuccessfulFirstLogin({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setShowFirstLoginPopup(false))
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="quiz_error_modal"
            bodyClassName="quiz_error_body"
            dialogClassName='quiz_error_dialog'
        >
            <div className="successful_investment_icon_container quiz_error_dialog_icon_container">
                <Image src={Icon} alt='icon'/>
            </div>
            <h2 className='successful_investment_title'>{t("successful_first_login.title")}</h2>
            <p className='successful_investment_text'>{t("successful_first_login.text")}</p>

        </Modal>
    );
}

export default SuccessfulFirstLogin;