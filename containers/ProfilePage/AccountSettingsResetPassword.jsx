import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { changePassword } from "redux/actions/user";
import { useDispatch } from "react-redux";
import { accountSettingsResetPasswordSchema } from "utils/vadidationSchemas";
import { useTranslation } from "react-i18next";

const AccountSettingsResetPassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
  const onSubmitPassword = (values) => {
    _changePassword(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValuesPassword}
        validationSchema={accountSettingsResetPasswordSchema}
        onSubmit={onSubmitPassword}
        validateOnMount
      >
        {({ values, errors, touched, setFieldValue, setValues, isValid }) => {
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
                // values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
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
                touched={touched}
                errors={errors}
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
                touched={touched}
                errors={errors}
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
                  disabled={!isValid}
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
