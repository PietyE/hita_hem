import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from 'react-redux';
import Modal from "../../ui/Modal";
import { Form, Formik } from "formik";
import Button from "../../ui/Button";
import { setShowResetPassword } from "redux/actions/authPopupWindows";
import { resetPassword } from "redux/actions/user";
import InputComponent from "../../ui/InputComponent";
import { resetPasswordSchema } from "utils/vadidationSchemas";
import SpinnerStyled from '../../ui/Spinner';
import {getIsFetchingAuthSelector} from 'redux/reducers/user';

const ResetPassword = ({ show }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingAuthSelector)

  const _resetPassword = useCallback(
    (data) => {
      dispatch(resetPassword(data));
    },
    [dispatch]
  );

  const onClose = () => {
    dispatch(setShowResetPassword(false));
  };

  const onSubmit = (values) => {
    _resetPassword(values.email.toLowerCase());
  };

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
        validateOnMount
      >
        {({ touched, errors, values, setFieldValue, isValid }) => (
          <Form className="auth_form">
            <InputComponent
              labelClassName="auth_login_container auth_container"
              label={t("auth.resetPasswordPopup.label")}
              inputClassName="auth_input"
              inputName="email"
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              placeholder={t("auth.resetPasswordPopup.placeholder")}
            />
            <Button
              type="submit"
              colorStyle={"dark-green"}
              className="auth_button"
              disabled={!isValid}
            >
              {t("auth.resetPasswordPopup.button")}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;
