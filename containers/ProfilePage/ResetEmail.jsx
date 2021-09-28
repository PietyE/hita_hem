import React, {useCallback, memo, useEffect, useRef} from 'react';
import { Formik, Form } from "formik";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { useDispatch, useSelector } from "react-redux";
import { accountSettingsResetEmailSchema } from "utils/vadidationSchemas";
import { changeEmail, setResponseFromApi } from "redux/actions/user";
import { useTranslation } from "react-i18next";
import {isSuccessfulResponseFromApiSelector} from 'redux/reducers/user';
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'

const ResetEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errorHandlerHook = useAuthErrorHandler()

  const isSuccessfulResponseFromApi = useSelector(isSuccessfulResponseFromApiSelector)
  const formikRef = useRef();
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

  const onSubmitEmail = (values) => {
    _changeEmail(values);
    errorHandlerHook?._clearErrors()
  };

  return (
    <>
      <Formik
          innerRef={formikRef}
        initialValues={initialValuesEmail}
        validationSchema={accountSettingsResetEmailSchema}
        onSubmit={onSubmitEmail}
        validateOnMount
          enableReinitialize
      >
        {({ errors, touched, setFieldValue, isValid }) => {
          return (
            <Form className="account_settings_form_email">
              <h3 className="account_settings_form_title">
                {t("profile_page.reset_email.title")}
              </h3>

              <InputComponent
                labelClassName="account_settings_form_label"
                label={t("profile_page.reset_email.email_label")}
                inputClassName="account_settings_form_input"
                errorClassName="profile_form_warning_text"
                inputName="email"
                autoComplete="new-password"
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                errorFromApi={errorHandlerHook?.emailError}
                clearError={errorHandlerHook?.clearAuthErrorFromApi}
              />
              <span
                onClick={handleShowResetPass}
                className="account_settings_forgot_link"
              >
                {t("profile_page.reset_email.forgot_password")}
              </span>
              <InputComponent
                type="password"
                labelClassName="account_settings_form_label"
                label={t("profile_page.reset_email.password_label")}
                inputClassName="account_settings_form_input"
                errorClassName="profile_form_warning_text"
                iconClassName="profile_account_icon_eye"
                inputName="password"
                autoComplete="new-password"
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                errorFromApi={errorHandlerHook?.passwordError || errorHandlerHook?.userError}
                clearError={errorHandlerHook?.clearAuthErrorFromApi}
              />

              <div className="account_settings_buttons_container">
                <Button
                  colorStyle="link"
                  className="account_settings_button_cancel"
                >
                  {t("profile_page.reset_email.button_cancel")}
                </Button>
                <Button
                  type="submit"
                  colorStyle="dark-green"
                  disabled={!isValid}
                  className="account_settings_button_save"
                >
                  {t("profile_page.reset_email.button_save")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default memo(ResetEmail);
