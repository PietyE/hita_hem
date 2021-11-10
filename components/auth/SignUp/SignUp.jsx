import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Modal from "components/ui/Modal";
import Button from "../../ui/Button";
import { setShowSignIn, setShowSignUp } from "redux/actions/authPopupWindows";
import { signUp } from "redux/actions/user";
import InputComponent from "../../ui/InputComponent";
import { useTranslation } from "react-i18next";
import { getIsFetchingAuthSelector } from "redux/reducers/user";
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'
import * as yup from "yup";
import {passwordRegExp} from "../../../utils/vadidationSchemas";
import {recaptcha} from "../../../utils/recaptcha";
import {getMembershipAgreementDocument} from "../../../redux/reducers/documents";
import {getQuiz} from "../../../redux/actions/user";

const SignUp = ({ show }) => {
  const dispatch = useDispatch();
  const errorHandlerHook = useAuthErrorHandler()
  const { t } = useTranslation();
  const documentUrl = useSelector(getMembershipAgreementDocument);
  const isFetching = useSelector(getIsFetchingAuthSelector);
  const initialValues = {
    email: "",
    password: "",
    is_agree: false,
  };

  const handleClose = () => {
    dispatch(setShowSignUp(false));
    errorHandlerHook?._clearErrors()
  };
  const handleShowSignIn = () => {
    dispatch(setShowSignUp(false));
    dispatch(setShowSignIn(true));
    errorHandlerHook?._clearErrors()
  };
  const _signUp = useCallback(
    (values) => {
      dispatch(signUp(values));
    },
    [dispatch]
  );
  const _showQuiz = useCallback(
      () => {
        dispatch(getQuiz());
      },
      [dispatch]
  );
  const onSubmit = (values) => {
    _showQuiz()
    // recaptcha('sign_up',_signUp,{email: `${values.email.toLowerCase()}`, password: `${values.password}`,is_agree: `${values.is_agree}`, answers:[]})
    // _signUp({
    //   email: `${values.email.toLowerCase()}`,
    //   password: `${values.password}`,
    //   is_agree: `${values.is_agree}`,
    // });
  };
  const signUpSchema = yup.object({
    email: yup.string().email(t("errors.email_example")).max(80).required(t("errors.email_required")),
    password: yup
        .string().max(128)
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
      <h1 className="sign_up_title mb-4">{t("auth.sign_up.title")}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
        // validateOnMount
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, touched, errors, setFieldValue, setFieldError }) => (
          <Form className="auth_form">
            <InputComponent
              labelClassName="auth_login_container auth_container"
              label={t("auth.sign_up.email_label")}
              inputClassName="auth_input"
              inputName="email"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              touched={touched}
              errors={errors}
              errorFromApi={errorHandlerHook?.emailError}
              clearError={errorHandlerHook?.clearAuthErrorFromApi}
              placeholder={t("auth.sign_up.email_placeholder")}
            />
            <InputComponent
              type="password"
              labelClassName="auth_password_container auth_container"
              label={t("auth.sign_up.password_label")}
              inputClassName="auth_input"
              inputName="password"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              touched={touched}
              errors={errors}
              errorFromApi={errorHandlerHook?.passwordError}
              clearError={errorHandlerHook?.clearAuthErrorFromApi}
              placeholder={t("auth.sign_up.password_placeholder")}
              iconClassName="auth_password_eye"
            />
            <label className="sign_up_checkbox">
              <Field
                name="is_agree"
                type="checkbox"
                className={
                  touched.is_agree && errors.is_agree
                    ? "sign_up_agreement_checkbox_warning"
                    : "sign_up_agreement_checkbox"
                }
              />
              <span className="checkmark" />
              <span className="sign_up_password_label">
                {t("auth.sign_up.agreement_text")}
              </span>
            </label>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={documentUrl?.file || documentUrl?.url}
              className="sign_up_password_link"
            >
              {t("auth.sign_up.agreement_link")}
            </a>
            <Button
              type="submit"
              colorStyle={"dark-green"}
              className="auth_button"
              disabled={!values.is_agree}
            >
              {t("auth.sign_up.button")}
            </Button>
            <p className="auth_footer_text">
              {t("auth.sign_up.footer_text")}
              <span onClick={handleShowSignIn} className="auth_footer_link">
                {t("auth.sign_up.sign_up_link")}
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignUp;
