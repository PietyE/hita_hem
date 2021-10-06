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
              <p className="account_settings_form_title">
                {t("change_password_page.text")}
              </p>

                <Button
                  type="submit"
                  colorStyle="dark-green"
                  className="account_settings_button_save"
                >
                  {t("change_password_page.button_change")}
                </Button>
       </>
  );
};

export default AccountSettingsResetPassword;
