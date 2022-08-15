import React, {useCallback} from 'react';
import {useTranslation} from "react-i18next";
import Button from "../../components/ui/Button";
import {setShowCompleteChangeAccountType} from "../../redux/actions/authPopupWindows";
import {useDispatch} from "react-redux";

const ChangeProfileType = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const _setShowCompleteChangeAccountType = useCallback(() => {
        dispatch(setShowCompleteChangeAccountType(true));
    }, [dispatch]);

    return (
        <section className='account_settings_change_block'>
            <div className='account_settings_form_text_wrapper '>

                <h2 className="account_settings_form_title">
                    {t("profile_page.changeProfileType.title")}
                </h2>
                <p>{t("profile_page.changeProfileType.description")}</p>

            </div>
            <div className='account_settings_form_button_wrapper'>
                <Button
                    type="submit"
                    colorStyle="dark-violet"
                    className="account_settings_button_save"
                    onClick={_setShowCompleteChangeAccountType}
                >
                    {t("profile_page.changeProfileType.change_button")}
                </Button>
            </div>
        </section>

    );
}

export default ChangeProfileType;