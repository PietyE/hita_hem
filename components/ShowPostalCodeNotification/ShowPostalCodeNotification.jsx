import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setShowPostalCodeNotification} from "../../redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/icon.svg";
import {setActiveTab} from "../../redux/actions/user";
import {getUserIdSelector} from "../../redux/reducers/user";
import {useRouter} from "next/router";

function ShowPostalCodeNotification({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const usersId = useSelector(getUserIdSelector)
    const history = useRouter();

    const handleClose = () => {
        dispatch(setShowPostalCodeNotification(false));
    };
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setActiveTab('personal_details'))
        history.push(`/users/[usersId]/profile`, `/users/${usersId}/profile`)
        handleClose()
    }
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
                <Image src={Icon} alt={Icon ? 'warning icon' : ' '} />
            </div>
            <span className="successful_investment_text">
               {t("showPostalCodeNotification.text")}<a className='successful_investment_link' onClick={handleClick}>{t("showPostalCodeNotification.link")}</a>.

      </span>
        </Modal>
    );
}

export default ShowPostalCodeNotification;