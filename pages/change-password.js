import React, {useCallback, useEffect, useRef} from 'react';
import Modal from "../components/ui/Modal";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import useAuthErrorHandler from "../customHooks/useAuthErrorHandler";
import {
    getCanChangePasswordSelector,
    getIsSignInUserSelector,
    isSuccessfulResponseFromApiSelector
} from "../redux/reducers/user";
import {changePassword, setResponseFromApi} from "../redux/actions/user";
import * as yup from "yup";
import {passwordRegExp} from "../utils/vadidationSchemas";
import {FormikFormComponent,FormikComponent} from "components/ui/FormikComponent";
import InputComponent from "../components/ui/InputComponent";
import Button from "../components/ui/Button";
import {useRouter} from "next/router";
import {HOME_ROUTE} from "../constants/routesConstant";
import {recaptcha} from "../utils/recaptcha";
import CaptchaPrivacyBlock from "../components/CaptchaPrivacyBlock";

const ChangePassword = () => {
    const history = useRouter();

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const errorHandlerHook = useAuthErrorHandler()
    const formikRef = useRef();
    const isSuccessfulResponseFromApi = useSelector(isSuccessfulResponseFromApiSelector)
    const canChangePassword = useSelector(getCanChangePasswordSelector)
    const isAuth = useSelector(getIsSignInUserSelector);

    useEffect(()=>{
        if(!canChangePassword){
            history.push(HOME_ROUTE)
        }

    },[canChangePassword])

    useEffect(()=>{
        if(isSuccessfulResponseFromApi){
            formikRef?.current?.resetForm()
            dispatch(setResponseFromApi(false))
        }
    },[isSuccessfulResponseFromApi,dispatch ])

    // const handleShowResetPass = () => {
    //     dispatch(setShowResetPassword(true));
    // };
    const _changePassword = useCallback(
        (data) => {
            dispatch(changePassword(data));
        },
        [dispatch]
    );

    const initialValuesPassword = {
        old_password: '',
        new_password1: "",
        new_password2: "",
    };
    const accountSettingsResetPasswordSchema = yup.object({
        old_password: yup.string().max(128, `${t("errors.long_error_part1")} 128 ${t("errors.long_error_part2")}`).required(t("errors.password_required")),
        new_password1: yup.string().max(128, `${t("errors.long_error_part1")} 128 ${t("errors.long_error_part2")}`).matches(passwordRegExp, t("errors.password_example")).required(t("errors.new_password_required")),
        new_password2: yup
            .string().required(t("errors.confirm_password_required")).max(128, `${t("errors.long_error_part1")} 128 ${t("errors.long_error_part2")}`)
            .when('new_password1', {
                is: password => (password && password.length > 0 ? true : false),
                then: yup.string().oneOf([yup.ref('new_password1')], t("errors.password_match"))
            })
    })
    const onSubmitPassword = (values) => {
        recaptcha('change_password', _changePassword, values)
        // _changePassword(values);


    };

    const handleClose =() => {
        history.push(HOME_ROUTE);
    }
    return (
        <>
            { canChangePassword && isAuth &&(
        <Modal
            show={true}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            className="auth_modal"
            dialogClassName="auth_modal_dialog"
            bodyClassName="auth_modal_container"
            centered={true}
            // isFetchIndicator={isFetching}
        >
            <h3 className="account_settings_form_title change_email_title">
                {t("profile_page.reset_password.title")}
            </h3>
            <FormikComponent
                innerRef={formikRef}
                initialValues={initialValuesPassword}
                validationSchema={accountSettingsResetPasswordSchema}
                onSubmit={onSubmitPassword}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ values, errors, touched, setFieldValue, setValues, setFieldError }) => {
                    return (
                        <FormikFormComponent className="auth_form">
                            <InputComponent
                                type="password"
                                labelClassName=" auth_container"
                                label={t("profile_page.reset_password.password_label")}
                                inputClassName="auth_input"
                                errorClassName="profile_form_warning_text"
                                iconClassName="profile_account_icon_eye"
                                inputName="old_password"
                                values={values}
                                setFieldValue={setFieldValue}
                                setFieldError={setFieldError}
                                touched={touched}
                                errors={errors}
                                errorFromApi={ errorHandlerHook?.oldPasswordError }
                                clearError={errorHandlerHook?.clearAuthErrorFromApi}
                            />

                            <InputComponent
                                type="password"
                                labelClassName=" auth_container"
                                label={t("change_password_page.new_password")}
                                inputClassName="auth_input"
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
                                labelClassName="change_email_password_container auth_container"
                                label={t("change_password_page.confirm_password")}
                                inputClassName="auth_input"
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

                            <div className="account_settings_buttons_container change_email_buttons_container">
                                <Button
                                    type="submit"
                                    colorStyle="dark-violet"
                                    // disabled={!isValid}
                                    className="account_settings_button_save change_email_button"
                                >
                                    {t("change_email_page.button_submit")}
                                </Button>
                            </div>
                        </FormikFormComponent>
                    );
                }}
            </FormikComponent>
            <CaptchaPrivacyBlock/>
        </Modal>)
            }
            </>

    );
}

export default ChangePassword;