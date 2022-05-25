import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getCanChangeEmailSelector,
    getIsSignInUserSelector,
    isSuccessfulResponseFromApiSelector
} from "../redux/reducers/user";
import {Form, Formik} from "formik";
import InputComponent from "../components/ui/InputComponent";
import Button from "../components/ui/Button";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import useAuthErrorHandler from "../customHooks/useAuthErrorHandler";
import {changeEmail, setResponseFromApi } from "../redux/actions/user";
import {setShowResetPassword} from "../redux/actions/authPopupWindows";
import Modal from "../components/ui/Modal";
import {HOME_ROUTE} from "../constants/routesConstant";
import {useRouter} from "next/router";
import {recaptcha} from "../utils/recaptcha";
import CaptchaPrivacyBlock from "../components/CaptchaPrivacyBlock";
import {emailRegExp} from "../utils/vadidationSchemas";

function ChangeEmail() {
    const history = useRouter();

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const errorHandlerHook = useAuthErrorHandler()
    const isSuccessfulResponseFromApi = useSelector(isSuccessfulResponseFromApiSelector)
    const formikRef = useRef();
    const canChangeEmail = useSelector(getCanChangeEmailSelector)
    const isAuth = useSelector(getIsSignInUserSelector);


    useEffect(()=>{
        if(!canChangeEmail){
            history.push(HOME_ROUTE)
        }

    },[canChangeEmail])

    useEffect(()=>{
        if(isSuccessfulResponseFromApi){
            formikRef?.current?.resetForm()
            dispatch(setResponseFromApi(false))
        }
    },[isSuccessfulResponseFromApi,dispatch ])

    const handleShowResetPass = () => {
        dispatch(setShowResetPassword(true));
    };
    const _changeEmail = useCallback(
        (data) => {
            dispatch(changeEmail(data));
        },
        [dispatch]
    );



    const initialValuesEmail = {
        email: "",
        password: "",
    };
    const accountSettingsResetEmailSchema = yup.object({
        email: yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80, `${t("errors.long_error_part1")} 80 ${t("errors.long_error_part2")}`).required(t("errors.email_required")),
        password: yup
            .string().max(128, `${t("errors.long_error_part1")} 128 ${t("errors.long_error_part2")}`)
            .required(t("errors.password_required")),
    })

    const onSubmitEmail = (values) => {
        recaptcha('change_email', _changeEmail, {...values, email: values.email.toLowerCase()})
        // _changeEmail(values);
        errorHandlerHook?._clearErrors()
    };

    const handleClose =() => {
        history.push(HOME_ROUTE);
    }

    return (
        <>
        { canChangeEmail && isAuth &&(
    <Modal
        show = {true}
        onHide={handleClose}
        backdrop = {true}
        keyboard = {false}
        className = "auth_modal"
        dialogClassName = "auth_modal_dialog"
        bodyClassName = "auth_modal_container"
        centered = {true}
        // isFetchIndicator={isFetching}
    >
        <h1 className = "account_settings_form_title change_email_title">{t("profile_page.reset_email.title")}</h1>

        <Formik
            innerRef = {formikRef}
            initialValues = {initialValuesEmail}
            validationSchema = {accountSettingsResetEmailSchema}
            onSubmit = {onSubmitEmail}
            enableReinitialize
            validateOnChange = {false}
            validateOnBlur = {false}
        >
            {({errors, touched, setFieldValue, setFieldError}) => {
                return (
                    <Form className = "auth_form">
                        <InputComponent
                            labelClassName = "auth_login_container auth_container"
                            label = {t("change_email_page.new_email")}
                            inputClassName = "auth_input"
                            errorClassName = "profile_form_warning_text"
                            inputName = "email"
                            autoComplete = "new-password"
                            setFieldValue = {setFieldValue}
                            setFieldError = {setFieldError}
                            touched = {touched}
                            errors = {errors}
                            errorFromApi = {errorHandlerHook?.emailError}
                            clearError = {errorHandlerHook?.clearAuthErrorFromApi}
                        />
                        <span
                            onClick = {handleShowResetPass}
                            className = "account_settings_forgot_link"
                        >

              </span>
                        <InputComponent
                            type = "password"
                            labelClassName = "change_email_password_container auth_container"
                            label = {t("change_email_page.password")}
                            inputClassName = "auth_input"
                            errorClassName = "profile_form_warning_text"
                            iconClassName = "profile_account_icon_eye"
                            inputName = "password"
                            autoComplete = "new-password"
                            setFieldValue = {setFieldValue}
                            setFieldError = {setFieldError}
                            touched = {touched}
                            errors = {errors}
                            errorFromApi = {errorHandlerHook?.passwordError || errorHandlerHook?.userError}
                            clearError = {errorHandlerHook?.clearAuthErrorFromApi}
                        />

                        <div className = "account_settings_buttons_container change_email_buttons_container">
                            <Button
                                type = "submit"
                                colorStyle = "dark-green"
                                className = "account_settings_button_save change_email_button"
                            >
                                {t("change_email_page.button_submit")}
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
        <CaptchaPrivacyBlock/>
    </Modal>)
}
</>
    );
}

export default ChangeEmail;