import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { useDispatch } from "react-redux";
import { accountSettingsResetEmailSchema } from "utils/vadidationSchemas";
import { changeEmail } from "redux/actions/user";
import { useTranslation } from "react-i18next";

const ResetEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  };

  return (
    <>
      <Formik
        initialValues={initialValuesEmail}
        validationSchema={accountSettingsResetEmailSchema}
        onSubmit={onSubmitEmail}
        validateOnMount
      >
        {({ errors, touched, setFieldValue, setValues, isValid }) => {
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
              />

              <div className="account_settings_buttons_container">
                <Button
                  colorStyle="link"
                  className="account_settings_button_cancel"
                  onClick={() => setValues(initialValuesEmail)}
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

export default ResetEmail;
