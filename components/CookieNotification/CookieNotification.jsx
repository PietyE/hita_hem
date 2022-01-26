import React from 'react';
import Image from "next/image";
import IconCookie from "../CookieModal/cookie.svg";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getPrivacyPolicyDocument} from "../../redux/reducers/documents";

function CookieNotification({setShowCookie}) {
    const { t } = useTranslation();
    const documentUrl = useSelector(getPrivacyPolicyDocument);


    const wasCookieClosed = sessionStorage.getItem('wasCookieClosed');

    const handleClick = (e) => {
        e.preventDefault()
        sessionStorage.setItem('wasCookieClosed', 'true');
        setShowCookie(false)
    }

    return (
        <>
            {!wasCookieClosed && (
                <div className='cookie_notification_container'>
                    <button className='cookie_notification_close_button'
                            onClick={handleClick}
                    >&#215;</button>
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
                </div>
            )}

            </>
    );
}

export default CookieNotification;