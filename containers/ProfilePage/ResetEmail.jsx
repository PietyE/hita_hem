import React, {useCallback} from 'react';
import Button from "components/ui/Button";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {makeRequestForChangingEmail} from "redux/actions/user";

const ResetEmail = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const _makeRequestForChangingEmail = useCallback(
        () => {
            dispatch(makeRequestForChangingEmail());
        },
        [dispatch]
    );
    return (
        <section className='account_settings_change_block'>
            <div className='account_settings_form_text_wrapper'>

            <h1 className = "account_settings_form_title">
                {t("profile_page.reset_email.title")}
            </h1>
            <p>{t("change_email_page.text")}</p>
            </div>
            <div className='account_settings_form_button_wrapper'>
                <Button
                    type = "submit"
                    colorStyle = "dark-green"
                    className = "account_settings_button_save"
                    onClick={_makeRequestForChangingEmail}
                >
                    {t("change_email_page.button_change")}
                </Button>
            </div>
        </section>

    );
};

export default ResetEmail;
