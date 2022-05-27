import React from 'react';
import {useTranslation} from "react-i18next";
import SocialsAuthButtons from "../../components/SocialsAuthButtons";

const ChangeProfileType = () => {
    const {t} = useTranslation();

    return (
        <div className='account_settings_change_profile_type_block '>

            <h2 className = "account_settings_form_title">
                {t("profile_page.changeProfileType.title")}
            </h2>
            <p>{t("profile_page.changeProfileType.description")}</p>
            <SocialsAuthButtons type='change_account_type'/>
        </div>
    );
}

export default ChangeProfileType;