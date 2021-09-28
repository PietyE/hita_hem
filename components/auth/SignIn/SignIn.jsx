import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";

import InputComponent from "components/ui/InputComponent";
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
import {
  setShowSignIn,
  setShowSignUp,
  setShowResetPassword,
} from "redux/actions/authPopupWindows";
import { signIn } from "redux/actions/user";
import { signInSchema } from "utils/vadidationSchemas";

import { getIsFetchingAuthSelector } from "redux/reducers/user";
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'

const SignIn = ({ show }) => {
  const dispatch = useDispatch();
  const errorHandlerHook = useAuthErrorHandler()
  const isFetching = useSelector(getIsFetchingAuthSelector);

  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleClose = () => {
    dispatch(setShowSignIn(false));
    errorHandlerHook?._clearErrors()
  };
  const handleShowResetPass = () => {
    dispatch(setShowResetPassword(true));
    dispatch(setShowSignIn(false));
    errorHandlerHook?._clearErrors()
  };
  const handleShowSignIn = () => {
    dispatch(setShowSignIn(false));
    dispatch(setShowSignUp(true));
    errorHandlerHook?._clearErrors()
  };

  const _signIn = useCallback(
    (values) => {
      dispatch(signIn(values));
    },
    [dispatch]
  );

  const onSubmit = (values) => {
    _signIn({
      email: `${values.email.toLowerCase()}`,
      password: `${values.password}`,
    });
  };
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
      <h1 className="sign_up_title">{t("auth.sign_in.title")}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ touched, errors, values, setFieldValue, isValid }) => (
          <Form className="auth_form">
            <InputComponent
              labelClassName="auth_login_container auth_container"
              label={t("auth.sign_in.email_label")}
              inputClassName="auth_input"
              inputName="email"
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              errorFromApi={errorHandlerHook?.emailError}
              clearError={errorHandlerHook?.clearAuthErrorFromApi}
              placeholder={t("auth.sign_in.email_placeholder")}
            />
            <span onClick={handleShowResetPass} className="auth_forgot_link">
              {t("auth.sign_in.forgot_password_link")}
            </span>
            <InputComponent
              type="password"
              labelClassName="auth_password_container auth_container"
              label={t("auth.sign_in.password_label")}
              inputClassName="auth_input"
              inputName="password"
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              errorFromApi={errorHandlerHook?.passwordError}
              clearError={errorHandlerHook?.clearAuthErrorFromApi}
              placeholder={t("auth.sign_in.password_placeholder")}
              iconClassName="auth_password_eye"
            />
            <Button
              type="submit"
              colorStyle={"dark-green"}
              className="auth_button"
              disabled={!isValid || isFetching}
            >
              {t("auth.sign_in.button")}
            </Button>
            <p className="auth_footer_text">
              {t("auth.sign_in.footer_text")}
              <span onClick={handleShowSignIn} className="auth_footer_link">
                {t("auth.sign_in.sign_up_link")}
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignIn;
