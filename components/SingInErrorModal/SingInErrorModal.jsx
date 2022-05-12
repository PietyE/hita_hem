import React from 'react';
import Modal from '../ui/Modal';
import Image from "next/image";
import Icon from 'public/images/icon.svg';
import {setShowAuthSocialAccountError} from 'redux/actions/authPopupWindows';
import {useDispatch, useSelector} from 'react-redux';
import { useTranslation } from "react-i18next";

import { getNotificationMessageSelector } from "redux/reducers/notification";
import { setNotificationMessage } from 'redux/actions/notification';

const SingInErrorModal = ({show}) => {
    const { t } = useTranslation();
    const message = useSelector(getNotificationMessageSelector);
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setShowAuthSocialAccountError(false));
        dispatch(setNotificationMessage(""));
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="sing_in_error_modal"
            bodyClassName="sing_in_error_body"
            dialogClassName='sing_in_error_dialog'
        >
            <div className="successful_investment_icon_container sing_in_error_dialog_icon_container">
                <Image src={Icon} alt={Icon ? 'icon' : ' '}/>
            </div>
            <h2 className='successful_investment_title'>{t("errors.auth_social_account_error.title")}</h2>
            <p className='successful_investment_text'>{message}</p>

        </Modal>
    );
}

export default SingInErrorModal