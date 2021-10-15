import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/icon.svg";
import {useTranslation} from "react-i18next";
import {setShowInvalidTokenModal} from "redux/actions/authPopupWindows";
import {getUserIdSelector} from "redux/reducers/user";
import {useRouter} from "next/router";
import {HOME_ROUTE} from "../../constants/routesConstant";
import {setActiveTab} from "../../redux/actions/user";

const InvalidTokenModal = ({show}) => {
    const { t } = useTranslation();
    const history = useRouter();

    const dispatch = useDispatch()
    const userId = useSelector(getUserIdSelector)
    const handleClose = () => {
        dispatch(setShowInvalidTokenModal(false))
        history.push(HOME_ROUTE)

    }
    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/users/${userId}/profile`)
        dispatch(setShowInvalidTokenModal(false))
        dispatch(setActiveTab('account_settings'))
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
            <h2 className='successful_investment_title'>Ooops...</h2>
            <p className='successful_investment_text'>{t("invalid_token.text1")} <a onClick={handleClick} className='modal_link'>{t("invalid_token.link")}</a> {t("invalid_token.text2")}</p>

        </Modal>
    );
}

export default InvalidTokenModal;