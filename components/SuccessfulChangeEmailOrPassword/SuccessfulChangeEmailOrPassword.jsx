import React from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/success.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    setChangeEmailOrPasswordText,
    setShowChangeEmailOrPassword, setShowInvalidTokenModal,
    setShowSignIn
} from "../../redux/actions/authPopupWindows";
import {getChangeEmailOrPasswordText} from "../../redux/reducers/authPopupWindows";

const SuccessfulChangeEmailOrPassword = ({show}) => {
    // const { t } = useTranslation();
    const dispatch = useDispatch()

    const title = useSelector(getChangeEmailOrPasswordText)

    const handleClose = () => {
        dispatch(setShowChangeEmailOrPassword(false))
        dispatch(setChangeEmailOrPasswordText(''))
    }
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setShowSignIn(true))
        dispatch(setShowChangeEmailOrPassword(false))

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
            <div className="successful_investment_icon_container">
                <Image src={Icon} alt='icon'/>
            </div>
            <h2 className='successful_investment_title'>{title}</h2>
            <p className='successful_investment_text'>{t("successful_change_email_or_password.text1")} <a onClick={handleClick} className='modal_link'>{t("successful_change_email_or_password.link")}</a> {t("successful_change_email_or_password.text2")}</p>

        </Modal>
    );
}

export default SuccessfulChangeEmailOrPassword;