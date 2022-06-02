import React, {useCallback, useEffect, useState} from 'react';
import Modal from "../ui/Modal";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setShowCompleteBankIdRegistration} from "../../redux/actions/authPopupWindows";
import Button from 'components/ui/Button'
import {emailRegExp} from "../../utils/vadidationSchemas";
import {useRouter} from "next/router";
import {signUpWithBankId} from "../../redux/actions/user";
import useAuthErrorHandler from "../../customHooks/useAuthErrorHandler";
import {HOME_ROUTE} from "../../constants/routesConstant";
import CaptchaPrivacyBlock from "../CaptchaPrivacyBlock";
import {getMembershipAgreementDocument} from "../../redux/reducers/documents";

const CompleteBankIdRegistrationPopup = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const router = useRouter()
    const documentUrl = useSelector(getMembershipAgreementDocument)

    const [isAgree, setIsAgree] = useState(false)


    const errorHandlerHook = useAuthErrorHandler()
    const emailError = Array.isArray(errorHandlerHook?.emailError) ? errorHandlerHook?.emailError[0] : errorHandlerHook?.emailError

    const[showError, setShowError] = useState(false)
    const [email,setEmail] = useState('')

    useEffect(()=>{
        if(emailError){
            setShowError(true)
        }
    },[emailError])

    useEffect(()=>{
       return () => {

           if(emailError){
               errorHandlerHook._clearErrors()
           }
       }


    },[])

    const _signUpWithBankId = useCallback((data) => {
        dispatch(signUpWithBankId(data));
    }, [dispatch]);

    const _setShowCompleteBankIdRegistration= useCallback((data) => {
        dispatch(setShowCompleteBankIdRegistration(data));
    }, [dispatch]);

    const handleClose = () => {
        _setShowCompleteBankIdRegistration(false)
        router.push(HOME_ROUTE)
        errorHandlerHook?._clearErrors()
    }
    const handleChange = (e) => {
        setEmail(e?.target?.value)
        if(showError){
            setShowError(false)
        }
        if(emailError){
            errorHandlerHook.clearAuthErrorFromApi('email')
        }
    }
    const handleSubmit = () => {
        if(emailRegExp.test(email)){
            _signUpWithBankId({email:email.toLowerCase(), action: router, is_agree: isAgree})

        }else{
            setShowError(true)
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
            bodyClassName="quiz_error_body complete_bank_id_popup_body"
            dialogClassName='quiz_error_dialog'
        >

            <h2 className='complete_bank_id_popup_title'>{t("complete_bank_id_registration.title")}</h2>
           <div>
               <input
                   className={showError ? 'complete_bank_id_popup_input complete_bank_id_popup_input_warning' : 'complete_bank_id_popup_input'}
                   type='text'
                   placeholder={t("complete_bank_id_registration.email_placeholder")}
                   value={email}
                   onChange={handleChange}
               ></input>
               {showError && <p className='complete_bank_id_popup_error'>{emailError || t("complete_bank_id_registration.error")}</p>}
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
            <CaptchaPrivacyBlock className='complete_bank_id_popup_captcha'/>
            <Button
                className='complete_bank_id_popup_button'
                colorStyle='dark-green'
                onClick={handleSubmit}
                disabled={!isAgree}
            >{t("complete_bank_id_registration.button")}</Button>

        </Modal>
    );
}

export default CompleteBankIdRegistrationPopup;