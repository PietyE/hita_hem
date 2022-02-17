import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { GoogleLogin } from 'react-google-login';
import InputComponent from "components/ui/InputComponent";
import CaptchaPrivacyBlock from "../../CaptchaPrivacyBlock";
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
import {
  setShowSignIn,
  setShowSignUp,
  setShowResetPassword,
} from "redux/actions/authPopupWindows";
import { signIn, makeRequestForSignInWithBankId, signInWithGoogle } from "redux/actions/user";
import {recaptcha} from "../../../utils/recaptcha";
import { getIsFetchingAuthSelector } from "redux/reducers/user";
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'
import * as yup from "yup";
import {emailRegExp} from "../../../utils/vadidationSchemas";
import SplitLine from "../../ui/SplitLine";
import {getAuthSocialAccountErrorSelector} from "../../../redux/reducers/errors";

const SignIn = ({ show }) => {
  const dispatch = useDispatch();
  const errorHandlerHook = useAuthErrorHandler()
  const isFetching = useSelector(getIsFetchingAuthSelector);
    const socialAccountError = useSelector(getAuthSocialAccountErrorSelector)

  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };
  const signInSchema = yup.object({
    email: yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80).required(t("errors.email_required")),
    password: yup
        .string().max(128)
        .required(t("errors.password_required")),
  })

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

  const _signInWithGoogle = useCallback(
      (values) => {
        dispatch(signInWithGoogle(values));
      },
      [dispatch]
  );

  

  const _signInWithBankId = useCallback(
      () => {
        dispatch(makeRequestForSignInWithBankId());
      },
      [dispatch]
  );

  const handleSignInWithBankId = (e) => {
    e.preventDefault()
      if(socialAccountError){
          errorHandlerHook._clearErrors()
      }
    _signInWithBankId()
  }
  
  const responseGoogle = (response) => {
      if(socialAccountError){
          errorHandlerHook._clearErrors()
      }
    _signInWithGoogle(response.tokenId)
  }

  const onSubmit = (values) => {
    recaptcha('sign_in', _signIn, {email: `${values.email.toLowerCase()}`,password: `${values.password}`,})
    // _signIn({
    //   email: `${values.email.toLowerCase()}`,
    //   password: `${values.password}`,
    // });
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
      {/*<h1 className="sign_up_title mb-4">{t("auth.sign_in.title")}</h1>*/}
      <h1 className="sign_up_title mb-4">{t("auth.sign_in.sign_in")}</h1>
      <div className='sign_in_socials_buttons_wrapper'>
<button className='sign_in_bank_id sign_in_social_button' onClick={handleSignInWithBankId}>
  BankID
</button>

        <GoogleLogin
            clientId= {process.env.NEXT_PUBLIC_GOOGLE_OAUTH}
            // buttonText="Google"
            render={renderProps => (
                <button
                    className='sign_in_google sign_in_social_button'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <span>Google</span>
                </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
        
      </div>
        {socialAccountError && (
            <p className='sign_in_socials_account_error'>{socialAccountError}</p>
        )}
      <SplitLine className='sign_in_split_line'/>
        <span className='sign_in_alt_text'>{t("auth.sign_in.alt_sign_in")}</span>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={onSubmit}
        // validateOnMount
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ touched, errors, values, setFieldValue, setFieldError }) => (
          <Form className="auth_form">
            <InputComponent
                type = "email"
              labelClassName="auth_login_container auth_container"
              label={t("auth.sign_in.email_label")}
              inputClassName="auth_input"
              inputName="email"
                autoComplete = "username"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
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
              autoComplete = "current-password"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              touched={touched}
              errors={errors}
              errorFromApi={errorHandlerHook?.passwordError}
              clearError={errorHandlerHook?.clearAuthErrorFromApi}
              placeholder={t("auth.sign_in.password_placeholder")}
              iconClassName="auth_password_eye"
            />
            <CaptchaPrivacyBlock/>
            <Button
              type="submit"
              colorStyle={"dark-green"}
              className="auth_button"
              disabled={isFetching}
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
