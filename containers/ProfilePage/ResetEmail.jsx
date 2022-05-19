import React, {useCallback} from 'react';
import Button from "components/ui/Button";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {makeRequestForChangingEmail} from "redux/actions/user";
import {recaptcha} from "../../utils/recaptcha";

const ResetEmail = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const _makeRequestForChangingEmail = useCallback(
        (data) => {
            dispatch(makeRequestForChangingEmail(data));
        },
        [dispatch]
    );
    const handleChangeEmail = () => {
        recaptcha('request_for_change_email', _makeRequestForChangingEmail)
    }
    return (
        <section className='account_settings_change_block'>
            <div className='account_settings_form_text_wrapper'>

            <h2 className = "account_settings_form_title">
                {t("profile_page.reset_email.title")}
            </h2>
            <p>{t("change_email_page.text")}</p>
            </div>
            <div className='account_settings_form_button_wrapper'>
                <Button
                    type = "submit"
                    colorStyle = "dark-green"
                    className = "account_settings_button_save"
                    onClick={handleChangeEmail}
                >
                    {t("change_email_page.button_change")}
                </Button>
            </div>
        </section>

    );
};

export default ResetEmail;
