import React, {useCallback, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getDocumentsSelector} from "../../redux/reducers/documents";
import {signUpWithSocials} from "../../redux/actions/user";
import {setShowCompleteSocialsRegistration} from "../../redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import CaptchaPrivacyBlock from "../CaptchaPrivacyBlock";
import Button from "../ui/Button";

const CompleteSocialsRegistrationPopup = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const documentUrl = useSelector(getDocumentsSelector)

    const [isAgree, setIsAgree] = useState(false)

    const _signUpWithSocials= useCallback(
        (values) => {
            dispatch(signUpWithSocials(values));
        },
        [dispatch]
    );

    const _setShowCompleteSocialsRegistration= useCallback((data) => {
        dispatch(setShowCompleteSocialsRegistration(data));
    }, [dispatch]);

    const handleClose = () => {
        _setShowCompleteSocialsRegistration(false)
    }

    const handleSubmit = () => {
        if(isAgree){
            _signUpWithSocials(isAgree)
        }
    }
    const handleChangeAgreement = () => {
        setIsAgree(!isAgree)
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="quiz_error_modal complete_bank_id_popup_modal"
            bodyClassName="quiz_error_body complete_bank_id_popup_body complete_socials_popup_body"
            dialogClassName='quiz_error_dialog'
        >

            <h2 className='complete_bank_id_popup_title'>{t("complete_socials_registration.title")}</h2>
            <div className='complete_socials_registration_checkbox_container'>

                <label className = "sign_up_checkbox">
                    <input
                        name = "is_agree"
                        type = "checkbox"
                        className = "sign_up_agreement_checkbox"
                        checked={isAgree}
                        onChange={handleChangeAgreement}
                    />
                    <span className = "checkmark"/>
                    <span className = "sign_up_password_label">
                {t("auth.sign_up.agreement_text")}
              </span>
                </label>
                <a
                    target = "_blank"
                    rel = "noopener noreferrer"
                    href = {documentUrl?.file || documentUrl?.url}
                    className = "sign_up_password_link"
                >
                    {t("auth.sign_up.agreement_link")}
                </a>
            </div>
            <CaptchaPrivacyBlock className='complete_socials_popup_captcha'/>
            <Button
                className='complete_bank_id_popup_button'
                colorStyle='dark-green'
                onClick={handleSubmit}
                disabled={!isAgree}
            >{t("complete_bank_id_registration.button")}</Button>

        </Modal>
    );
}

export default CompleteSocialsRegistrationPopup;