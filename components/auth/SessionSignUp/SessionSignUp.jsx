import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import dynamic from "next/dynamic";
import Modal from "components/ui/Modal";
import Button from "../../ui/Button";
import {setShowSessionSignUp, setShowSignIn} from "redux/actions/authPopupWindows";
import InputComponent from "../../ui/InputComponent";
import { useTranslation } from "react-i18next";
import { getIsFetchingAuthSelector } from "redux/reducers/user";
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'
import * as yup from "yup";
import {emailRegExp, passwordRegExp} from "../../../utils/vadidationSchemas";
import {getMembershipAgreementDocument} from "redux/reducers/documents";
import {checkEmailAndPassword} from "redux/actions/user";
import {getShowQuiz} from "redux/reducers/authPopupWindows";
import {recaptcha} from "../../../utils/recaptcha";
import CaptchaPrivacyBlock from "../../CaptchaPrivacyBlock";
const Quiz = dynamic(() =>
    import("components/Quiz")
);
const SessionSignUp = ({show}) => {
    const dispatch = useDispatch();
    const errorHandlerHook = useAuthErrorHandler()
    const { t } = useTranslation();
    const documentUrl = useSelector(getMembershipAgreementDocument);
    const isFetching = useSelector(getIsFetchingAuthSelector);
    const isQuizShow = useSelector(getShowQuiz)

    const initialValues = {
        email: "",
        password: "",
        is_agree: false,
    };

    const handleClose = () => {
        dispatch(setShowSessionSignUp(false));
        errorHandlerHook?._clearErrors()
    };
    const handleShowSignIn = () => {
        dispatch(setShowSessionSignUp(false));
        dispatch(setShowSignIn(true));
        errorHandlerHook?._clearErrors()
    };

    const _checkEmailAndPassword = useCallback(
        (data) => {
            dispatch(checkEmailAndPassword(data));
        },
        [dispatch]
    );
    const onSubmit = (values) => {
        recaptcha('check_email', _checkEmailAndPassword,{email: values?.email, password: values?.password})

    };
    const signUpSchema = yup.object({
        email: yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80, `${t("errors.long_error_part1")} 80 ${t("errors.long_error_part2")}`).required(t("errors.email_required")),
        password: yup
            .string().max(128, `${t("errors.long_error_part1")} 128 ${t("errors.long_error_part2")}`)
            .matches(passwordRegExp, t("errors.password_example"))
            .required(t("errors.password_required")),
        is_agree: yup.bool().oneOf([true])
    })
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            className="auth_modal"
            dialogClassName="auth_modal_dialog"
            bodyClassName="auth_modal_container"
            centered={true}
            isFetchIndicator={isFetching}
        >
            <header className='auth_session_header'>
                <h1 className='auth_session_header_title'>{t("auth.session_sign_up.header_title")}</h1>
                <p className='auth_session_header_text'>{t("auth.session_sign_up.header_text")}<span className='auth_session_header_text_accent'>{t("auth.session_sign_up.header_text_accent")}</span></p>

            </header>
            {/*<h1 className="sign_up_title mb-4">{t("auth.sign_up.title")}</h1>*/}
            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
                // validateOnMount
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ values, touched, errors, setFieldValue, setFieldError }) => {

                    return (
                        <>
                            {!!isQuizShow && <Quiz show = {isQuizShow} data = {values}/>}
                            <Form className = "auth_form">
                                <InputComponent
                                    type = "email"
                                    labelClassName = "auth_login_container auth_container"
                                    label = {t("auth.sign_up.email_label")}
                                    inputClassName = "auth_input"
                                    inputName = "email"
                                    autoComplete = "username"
                                    values = {values}
                                    setFieldValue = {setFieldValue}
                                    setFieldError = {setFieldError}
                                    touched = {touched}
                                    errors = {errors}
                                    errorFromApi = {errorHandlerHook?.emailError}
                                    clearError = {errorHandlerHook?.clearAuthErrorFromApi}
                                    placeholder = {t("auth.sign_up.email_placeholder")}
                                />
                                <InputComponent
                                    type = "password"
                                    labelClassName = "auth_password_container auth_container"
                                    label = {t("auth.sign_up.password_label")}
                                    inputClassName = "auth_input"
                                    inputName = "password"
                                    autoComplete = "new-password"
                                    values = {values}
                                    setFieldValue = {setFieldValue}
                                    setFieldError = {setFieldError}
                                    touched = {touched}
                                    errors = {errors}
                                    errorFromApi = {errorHandlerHook?.passwordError}
                                    clearError = {errorHandlerHook?.clearAuthErrorFromApi}
                                    placeholder = {t("auth.sign_up.password_placeholder")}
                                    iconClassName = "auth_password_eye"
                                />
                                <label className = "sign_up_checkbox">
                                    <Field
                                        name = "is_agree"
                                        type = "checkbox"
                                        className = {
                                            touched.is_agree && errors.is_agree
                                                ? "sign_up_agreement_checkbox_warning"
                                                : "sign_up_agreement_checkbox"
                                        }
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
                                <CaptchaPrivacyBlock/>
                                <Button
                                    type = "submit"
                                    colorStyle = {"dark-green"}
                                    className = "auth_button"
                                    disabled = {!values.is_agree}
                                >
                                    {t("auth.sign_up.button")}
                                </Button>
                                <p className = "auth_footer_text">
                                    {t("auth.sign_up.footer_text")}
                                    <span onClick = {handleShowSignIn} className = "auth_footer_link">
                {t("auth.sign_up.sign_up_link")}
              </span>
                                </p>
                            </Form>
                        </>
                    )
                }
                }
            </Formik>
        </Modal>
    );
}

export default SessionSignUp;