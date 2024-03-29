import React, {useState, useCallback} from "react";
import {useTranslation} from "react-i18next";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {useDispatch} from "react-redux";
import Button from "components/ui/Button";
import {validateEmail} from "utils/utils";
import {addEmail} from "redux/actions/aboutUs";
import {recaptcha} from "../../utils/recaptcha";
import CaptchaPrivacyBlock from "../../components/CaptchaPrivacyBlock";

const SubscrebeFormSection = ({content = []}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    const _addEmail = useCallback(
        (email) => {
            dispatch(addEmail(email));
        },
        [dispatch]
    );

    const handleClickSubscribe = () => {
        if (validateEmail(email)) {
            recaptcha('about_us_subscribe', _addEmail, email.toLowerCase())
            // _addEmail({email, token});
            setEmail("");
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
                    className="subscribe_form_section_button g-recaptcha"
                    type='submit'
                    action='about_us_subscribe'
                    onClick={handleClickSubscribe}
                    colorStyle="dark-violet"
                    disabled={!email}
                >
                    {t("about_us_page.button")}
                </Button>
                {showWarning && (
                    <svg className="subscribe_form_icon" width="16" height="17" viewBox="0 0 16 17" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M8 0.5C3.584 0.5 0 4.084 0 8.5C0 12.916 3.584 16.5 8 16.5C12.416 16.5 16 12.916 16 8.5C16 4.084 12.416 0.5 8 0.5ZM7.2 12.5V10.9H8.8V12.5H7.2ZM7.2 4.5V9.3H8.8V4.5H7.2Z"
                              fill="#FF4D4F"/>
                    </svg>
                )}
                {showWarning && (
                    <p className="subscribe_form_warning_text">{t("errors.email_example")}</p>
                )}
            </InputGroup>
            <CaptchaPrivacyBlock className='about_us_captcha_text'/>
            <span className="subscribe_form_section_below_message">
        {t("about_us_page.text")}
      </span>
        </div>
    );
};

export default SubscrebeFormSection;
