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
        <a colorStyle="link" onClick={handleShowSignIn} className='sign_up_message_link'>
          {t("sign_up_message.sign_up_link")}
        </a>
        &nbsp;
        <span>{t("sign_up_message.sign_up_text_two")}</span>
      </span>

      <span className="sign_up_message" onClick={handleShowSignUp}>
        {t("sign_up_message.sign_in_text")}&nbsp;
        <a colorStyle="link" className='sign_up_message_link'>{t("sign_up_message.sign_in_link")}</a>
      </span>
    </div>
  );
};

export default SignUpMessage;
