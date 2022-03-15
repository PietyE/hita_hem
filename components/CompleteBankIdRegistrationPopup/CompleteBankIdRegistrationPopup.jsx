import React, {useCallback, useEffect, useState} from 'react';
import Modal from "../ui/Modal";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowCompleteBankIdRegistration} from "../../redux/actions/authPopupWindows";
import Button from 'components/ui/Button'
import {emailRegExp} from "../../utils/vadidationSchemas";
import {useRouter} from "next/router";
import {signUpWithBankId} from "../../redux/actions/user";
import useAuthErrorHandler from "../../customHooks/useAuthErrorHandler";
import {HOME_ROUTE} from "../../constants/routesConstant";

const CompleteBankIdRegistrationPopup = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const router = useRouter()

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
            _signUpWithBankId({email:email, action: router})

        }else{
            setShowError(true)
        }
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
            <input
                className='complete_bank_id_popup_input'
                type='text'
                placeholder={t("complete_bank_id_registration.email_placeholder")}
                value={email}
                onChange={handleChange}
            ></input>
            {showError && <p className='complete_bank_id_popup_error'>{emailError || t("complete_bank_id_registration.error")}</p>}
            <Button
                className='complete_bank_id_popup_button'
                colorStyle='dark-green'
                onClick={handleSubmit}
            >{t("complete_bank_id_registration.button")}</Button>

        </Modal>
    );
}

export default CompleteBankIdRegistrationPopup;