import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from 'react-redux';
import Modal from "../../ui/Modal";
import { Form, Formik } from "formik";
import Button from "../../ui/Button";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { makeRequestForResetPassword } from "redux/actions/user";
import InputComponent from "../../ui/InputComponent";
import SpinnerStyled from '../../ui/Spinner';
import {getIsFetchingAuthSelector} from 'redux/reducers/user';
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'

import useTranslateFormErrors from "../../../customHooks/useTranslateFormErrors";
import * as yup from "yup";

const ResetPassword = ({ show }) => {
  const { t } = useTranslation();
  const errorHandlerHook = useAuthErrorHandler()
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingAuthSelector)

  const _makeRequestForResetPassword= useCallback(
    (data) => {
      dispatch(makeRequestForResetPassword(data));
    },
    [dispatch]
  );

  const onClose = () => {
    dispatch(setShowResetPassword(false));
    errorHandlerHook?._clearErrors()
  };

  const onSubmit = (values) => {
    _makeRequestForResetPassword(values.email.toLowerCase());

  };
  const resetPasswordSchema = yup.object({
    email: yup.string().email(t("errors.email_example")).max(80).required(t("errors.email_required")),
  })
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop={true}
      keyboard={false}
      centered={true}
      className="auth_modal"
      dialogClassName="auth_modal_dialog"
      bodyClassName="auth_modal_container"
    >
      {isFetching && <SpinnerStyled/>}

      <h1 className="sign_up_title">{t("auth.resetPasswordPopup.title")}</h1>
      <p className="reset_password_text">
        {t("auth.resetPasswordPopup.description")}
      </p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ touched, errors, values, setFieldValue, setFieldError, setFieldTouched }) => {
          useTranslateFormErrors(errors, touched,setFieldTouched)
         return (
              <Form className = "auth_form">
                <InputComponent
                    labelClassName = "auth_login_container auth_container"
                    label = {t("auth.resetPasswordPopup.label")}
                    inputClassName = "auth_input"
                    inputName = "email"
                    values = {values}
                    setFieldValue = {setFieldValue}
                    setFieldError = {setFieldError}
                    touched = {touched}
                    errors = {errors}
                    errorFromApi = {errorHandlerHook?.userError || errorHandlerHook?.emailError}
                    clearError = {errorHandlerHook?.clearAuthErrorFromApi}
                    placeholder = {t("auth.resetPasswordPopup.placeholder")}
                />
                <Button
                    type = "submit"
                    colorStyle = {"dark-green"}
                    className = "auth_button"
                >
                  {t("auth.resetPasswordPopup.button")}
                </Button>
              </Form>
          )
        }}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;
