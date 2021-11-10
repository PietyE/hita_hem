import React from "react";
import {useDispatch} from "react-redux";
import ResetEmail from "./ResetEmail";
import AccountSettingsResetPassword from "./AccountSettingsResetPassword";
import { useTranslation } from "react-i18next";
import { setShowConfirmationOfAccountDeleting } from "redux/actions/authPopupWindows";
import SplitLine from "../../components/ui/SplitLine";

const AccountSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
    const handleClickDelete = () => {
      dispatch(setShowConfirmationOfAccountDeleting(true));
  };
  return (
    <section className="account_settings_container">
      <h2 className="account_settings_title">
        {t("profile_page.account.title")}
      </h2>
      <div className="account_settings_form">
        <ResetEmail />
        <SplitLine className='account_settings_split_line'/>
        <AccountSettingsResetPassword />
          <SplitLine className='account_settings_split_line'/>
          <p className="account_settings_text_delete" onClick={handleClickDelete}>
          {t("profile_page.account.text_delete")}
        </p>
        <p className="account_settings_text">
          {t("profile_page.account.text")}
        </p>
      </div>
    </section>
  );
};

export default AccountSettings;
