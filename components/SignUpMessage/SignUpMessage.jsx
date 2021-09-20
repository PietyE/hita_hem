import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setShowSignIn, setShowSignUp } from "redux/actions/authPopupWindows";
import Button from "components/ui/Button";

const SignUpMessage = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleShowSignIn = () => {
    dispatch(setShowSignIn(true));
  };
  const handleShowSignUp = () => {
    dispatch(setShowSignUp(true));
  };

  return (
    <div className={`sign_up_message_container ${className}`}>
      <span className="sign_up_message">
        {t("sign_up_message.sign_up_text_one")}&nbsp;
        <Button colorStyle="link" onClick={handleShowSignUp}>
          {t("sign_up_message.sign_up_link")}
        </Button>
        &nbsp;
        <span>{t("sign_up_message.sign_up_text_two")}</span>
      </span>

      <span className="sign_up_message" onClick={handleShowSignIn}>
        {t("sign_up_message.sign_in_text")}&nbsp;
        <Button colorStyle="link">{t("sign_up_message.sign_in_link")}</Button>
      </span>
    </div>
  );
};

export default SignUpMessage;
