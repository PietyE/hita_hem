import React from "react";
import Button from "components/ui/Button";
import { setShowSignIn, setShowSignUp } from "redux/actions/authPopupWindows";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CampaignTabSignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleShowSignIn = () => {
    dispatch(setShowSignIn(true));
  };
  const handleShowSignUp = () => {
    dispatch(setShowSignUp(true));
  };
  return (
    <div className="campaigns_tab_sign-up_container">
      <h2 className="campaigns_tab_sign-up_title">
        {t("company_page.tab_sign_up.title")}
      </h2>
      <p className="campaigns_tab_sign-up_text">
        {t("company_page.tab_sign_up.text")}
      </p>
      <Button
        colorStyle="dark-green"
        className="campaigns_tab_sign-up_button"
        onClick={handleShowSignUp}
      >
        {t("company_page.tab_sign_up.sign_up")}
      </Button>
      <p className="campaigns_tab_sign-up_text campaigns_tab_sign-up_bottom ">
        {t("company_page.tab_sign_up.footer_text")}
        <span onClick={handleShowSignIn} className="campaigns_tab_sign-up_link">
          {t("company_page.tab_sign_up.log_in")}
        </span>
      </p>
    </div>
  );
};

export default CampaignTabSignUp;
