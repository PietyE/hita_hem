import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import Image from "next/image";

import Button from "components/ui/Button";
import IconAttention from "public/images/attention.svg";
import { validateEmail } from "utils/utils";
import { addEmail } from "redux/actions/aboutUs";

const SubscrebeFormSection = ({ content = [], onShowSubscripeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const _addEmail = useCallback(
    (email) => {
      dispatch(addEmail(email));
    },
    [dispatch]
  );

  const handleClickSubscripe = () => {
    if (validateEmail(email)) {
      _addEmail(email);
      setEmail("");
      onShowSubscripeModal(true);
    } else {
      setShowWarning(true);
    }
  };

  const handleChangeEmail = (e) => {
    if (showWarning || email === "") {
      setShowWarning(false);
    }
    setEmail(e.target.value);
  };

  return (
    <div className="subscribe_form_section">
      <h2 className="subscribe_form_section_title">{content}</h2>
      <h4 className="subscribe_form_section_subtitle">
        {t("about_us_page.subscribe_title")}
      </h4>
      <InputGroup className="subscribe_form_section_from">
        <FormControl
          // placeholder= {showWarning?'Please fill the form':"Enter your email address"}
          placeholder={t("about_us_page.placeholder")}
          className={
            showWarning
              ? "subscribe_form_section_input_warning"
              : "subscribe_form_section_input"
          }
          value={email}
          onChange={handleChangeEmail}
        />
        <Button
          className="subscribe_form_section_button"
          colorStyle="dark-green"
          onClick={handleClickSubscripe}
          disabled={!email}
        >
          {t("about_us_page.button")}
        </Button>
        {showWarning && (
          <Image
            src={IconAttention}
            alt="icon_attention"
            className="subscribe_form_icon"
          />
        )}
        {showWarning && (
          <p className="subscribe_form_warning_text"> example test@test.com </p>
        )}
      </InputGroup>
      <span className="subscribe_form_section_below_message">
        {t("about_us_page.text")}
      </span>
    </div>
  );
};

export default SubscrebeFormSection;
