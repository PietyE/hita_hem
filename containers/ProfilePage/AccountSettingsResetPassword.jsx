import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import Button from "components/ui/Button";
import { useTranslation } from "react-i18next";
import {makeRequestForChangingPassword} from "redux/actions/user";
import {recaptcha} from "../../utils/recaptcha";

const AccountSettingsResetPassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const _makeRequestForChangingPassword = useCallback(
      (data) => {
        dispatch(makeRequestForChangingPassword(data));
      },
      [dispatch]
  );
  const handleChangePassword = () => {
      recaptcha('request_for_change_password', _makeRequestForChangingPassword)
  }
  return (
<section className='account_settings_change_block'>
    <div className='account_settings_form_text_wrapper'>
        <h2 className="account_settings_form_title">
            {t("profile_page.reset_password.title")}
        </h2>
        <p>
            {t("change_password_page.text")}
        </p>
    </div>
    <div className='account_settings_form_button_wrapper'>
        <Button
            type="submit"
            colorStyle="dark-green"
            className="account_settings_button_save"
            onClick={handleChangePassword}
        >
            {t("change_password_page.button_change")}
        </Button>
    </div>
       </section>
  );
};

export default AccountSettingsResetPassword;
