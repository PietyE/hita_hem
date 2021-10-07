import React from "react";
import { useDispatch } from "react-redux";
import Button from "components/ui/Button";
import { setShowSignUp } from "redux/actions/authPopupWindows";
import { useTranslation } from "react-i18next";

const JoinSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleShowSignUp = () => {
    dispatch(setShowSignUp(true));
  };
  return (
    <div className="join-us_container">
      <h2 className="join-us_title">{t("home_page.join_title")}</h2>
      <Button
        colorStyle="dark-green"
        className="join-us_button"
        onClick={handleShowSignUp}
      >
        <span className="join-us_button_plus">&#43;</span>{" "}
        {t("home_page.join_button")}
      </Button>
    </div>
  );
};

export default JoinSection;
