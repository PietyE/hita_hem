import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Formik, Form } from "formik";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { changePassword, setResponseFromApi } from "redux/actions/user";
// import { accountSettingsResetPasswordSchema } from "utils/vadidationSchemas";
import { useTranslation } from "react-i18next";
import useAuthErrorHandler from 'customHooks/useAuthErrorHandler'
import {isSuccessfulResponseFromApiSelector} from 'redux/reducers/user';
import * as yup from "yup";
import {passwordRegExp} from "../../utils/vadidationSchemas";

const AccountSettingsResetPassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const errorHandlerHook = useAuthErrorHandler()
  const formikRef = useRef();
  const isSuccessfulResponseFromApi = useSelector(isSuccessfulResponseFromApiSelector)

  useEffect(()=>{
    if(isSuccessfulResponseFromApi){
      formikRef?.current?.resetForm()
      dispatch(setResponseFromApi(false))
    }
  },[isSuccessfulResponseFromApi,dispatch ])

  const handleShowResetPass = () => {
    dispatch(setShowResetPassword(true));
  };
  const _changePassword = useCallback(
    (data) => {
      dispatch(changePassword(data));
    },
    [dispatch]
  );

  const initialValuesPassword = {
    old_password: "",
    new_password1: "",
    new_password2: "",
  };
  const accountSettingsResetPasswordSchema = yup.object({
    old_password: yup
        .string().max(128)
        .required(t("errors.password_required")),
    new_password1: yup.string().max(128).matches(passwordRegExp, t("errors.password_example")).required(t("errors.new_password_required")),
    new_password2: yup
        .string().required(t("errors.confirm_password_required")).max(128)
        .when('new_password1', {
          is: password => (password && password.length > 0 ? true : false),
          then: yup.string().oneOf([yup.ref('new_password1')], t("errors.password_match"))
        })
  })
  const onSubmitPassword = (values) => {
    _changePassword(values);
  };
  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValuesPassword}
        validationSchema={accountSettingsResetPasswordSchema}
        onSubmit={onSubmitPassword}
        // validateOnMount
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, errors, touched, setFieldValue, setValues, setFieldError }) => {
          return (
            <Form className="account_settings_form_password">
              <h3 className="account_settings_form_title">
                {t("profile_page.reset_password.title")}
              </h3>

              <span
                onClick={handleShowResetPass}
                className="account_settings_forgot_link"
              >
                {t("profile_page.reset_password.forgot_password")}
              </span>
              <InputComponent
                type="password"
                labelClassName="account_settings_form_label"
                label={t("profile_page.reset_password.password_label")}
                inputClassName="account_settings_form_input"
                errorClassName="profile_form_warning_text"
                iconClassName="profile_account_icon_eye"
                inputName="old_password"
                autoComplete="new-password"
                  // values={values}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                touched={touched}
                errors={errors}
                errorFromApi={errorHandlerHook?.oldPasswordError }
                clearError={errorHandlerHook?.clearAuthErrorFromApi}
              />

              <InputComponent
                type="password"
                labelClassName="account_settings_form_label"
                label={t("profile_page.reset_password.new_password_label")}
                inputClassName="account_settings_form_input"
                errorClassName="profile_form_warning_text"
                iconClassName="profile_account_icon_eye"
                inputName="new_password1"
                values={values}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                touched={touched}
                errors={errors}
                errorFromApi={ errorHandlerHook?.newPassword1Error }
                clearError={errorHandlerHook?.clearAuthErrorFromApi}
              />

              <InputComponent
                type="password"
                labelClassName="account_settings_form_label"
                label={t("profile_page.reset_password.confirm_password_label")}
                inputClassName="account_settings_form_input"
                iconClassName="profile_account_icon_eye"
                errorClassName="profile_form_warning_text"
                inputName="new_password2"
                values={values}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                touched={touched}
                errors={errors}
                errorFromApi={errorHandlerHook?.newPassword2Error }
                clearError={errorHandlerHook?.clearAuthErrorFromApi}
              />

              <div className="account_settings_buttons_container">
                <Button
                  colorStyle="link"
                  className="account_settings_button_cancel"
                  onClick={() => setValues(initialValuesPassword)}
                >
                  {t("profile_page.reset_password.button_cancel")}
                </Button>
                <Button
                  type="submit"
                  colorStyle="dark-green"
                  // disabled={!isValid}
                  className="account_settings_button_save"
                >
                  {t("profile_page.reset_password.button_save")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AccountSettingsResetPassword;
