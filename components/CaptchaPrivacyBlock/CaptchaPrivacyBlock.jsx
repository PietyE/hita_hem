import React from 'react';
import {useTranslation} from "react-i18next";

const CaptchaPrivacyBlock = ({className}) => {
    const { t } = useTranslation();

    return (
        <p className={`captcha_text ${className}`}>
            {t("privacy_policy.text1")}
            <a
                className='captcha_link'
                href="https://policies.google.com/privacy"
                target = "_blank"
                rel = "noopener noreferrer"
            >
                {t("privacy_policy.link1")}
            </a>
            {t("privacy_policy.text2")}
            <a
                className='captcha_link'
                href="https://policies.google.com/terms"
                target = "_blank"
                rel = "noopener noreferrer"
            >
                {t("privacy_policy.link2")}
            </a>
            {t("privacy_policy.text3")}
        </p>
    );
}

export default CaptchaPrivacyBlock;