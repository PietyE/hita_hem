import React from 'react';
import Modal from "../ui/Modal";
import {useTranslation} from "react-i18next";
import IconCookie from './cookie.svg'
import {useDispatch, useSelector} from "react-redux";
import {setShowCookiePopup} from "../../redux/actions/authPopupWindows";
import Image from "next/image";
import ButtonStyled from "../ui/Button";
import { getPrivacyPolicyDocument } from "redux/reducers/documents";
import Cookies from "js-cookie";
import {getUserIdSelector} from "../../redux/reducers/user";


function CookieModal({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const documentUrl = useSelector(getPrivacyPolicyDocument);
    // const userId = useSelector(getUserIdSelector)
    const handleClose = () => {

        // if(userId){
        //     const cookies = Cookies.get("cookie-agreed-user");
        //     const jsonPrs = cookies? JSON.parse(cookies) : []
        //     jsonPrs.push(userId)
        //     const jsonStr = JSON.stringify(jsonPrs)
        //     Cookies.set('cookie-agreed-user', jsonStr)
        //
        // }else{
            Cookies.set('cookie-agreed', Date.now(), { expires: 100 })

        // }
        dispatch(setShowCookiePopup(false));
    };
    return (
        <Modal
        show={show}
        backdrop={true}
        keyboard={false}
        centered={true}
        className="successful_investment_modal_container cookie_modal_container"
        bodyClassName="cookie_modal_dialog_container"
    >
            <div className='cookie_icon_wrapper'>
                <Image  src={IconCookie} alt="cup" />
            </div>
            <p className='cookie_text'>{t("cookie.text")} <a
                    className='cookie_link'
                    target="_blank"
                    rel="noopener noreferrer"
                    href={documentUrl?.file || documentUrl?.url}
                >
                {t("cookie.link")}
            </a></p>
            <ButtonStyled onClick={handleClose} colorStyle='red-without-border' className='cookie_btn'>{t("cookie.button")}</ButtonStyled>
    </Modal>
    );
}

export default CookieModal;