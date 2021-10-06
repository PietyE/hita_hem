import React from 'react';
import Button from "components/ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const ResetEmail = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <h1 className = "account_settings_form_title">
                {t("change_email_page.text")}
            </h1>

            <Button
                type = "submit"
                colorStyle = "dark-green"
                className = "account_settings_button_save"
            >
                {t("change_email_page.button_change")}
            </Button>
        </>

    );
};

export default ResetEmail;
