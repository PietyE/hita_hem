import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Formik, Form, Field} from 'formik'
import Modal from 'components/ui/Modal'
import Button from '../../ui/Button'
import {setShowSignIn, setShowSignUp} from 'redux/actions/authPopupWindows';
import {signUp} from 'redux/actions/user'
import InputComponent from '../../ui/InputComponent';
import {signUpSchema} from 'utils/vadidationSchemas';
import {useTranslation} from 'react-i18next';
import {getDocumentUrl} from 'redux/reducers/documents';

const SignUp = ({show}) => {
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const documentUrl = useSelector(getDocumentUrl)
    const initialValues = {
        email: '',
        password: '',
        is_agree: false,
    }

    const handleClose = () => {
        dispatch(setShowSignUp(false))
    }
    const handleShowSignIn = () => {
        dispatch(setShowSignUp(false))
        dispatch(setShowSignIn(true))
    }
    const _signUp = useCallback(
        (values) => {
            dispatch(signUp(values))
        },
        [dispatch]
    )
    const onSubmit = (values) => {
        _signUp({email: `${values.email.toLowerCase()}`, password: `${values.password}`, is_agree: `${values.is_agree}`})
        // dispatch(setShowSignUp(false))
    }
    return (
        <Modal
            show = {show}
            onHide = {handleClose}
            backdrop = {true}
            keyboard = {false}
            className = 'auth_modal'
            dialogClassName = 'auth_modal_dialog'
            bodyClassName = 'auth_modal_container'
            centered={true}
        >
            <h1 className = "sign_up_title">{t('auth.sign_up.title')}</h1>
            <Formik
                initialValues = {initialValues}
                validationSchema = {signUpSchema}
                onSubmit = {onSubmit}
                validateOnMount
            >
                {({values, touched, errors, setFieldValue, isValid}) => (
                    <Form className = "auth_form">
                        <InputComponent
                            labelClassName = 'auth_login_container auth_container'
                            label = {t('auth.sign_up.email_label')}
                            inputClassName = 'auth_input'
                            inputName = 'email'
                            values = {values}
                            setFieldValue = {setFieldValue}
                            touched = {touched}
                            errors = {errors}
                            placeholder = {t('auth.sign_up.email_placeholder')}
                        />
                        <InputComponent
                            type = 'password'
                            labelClassName = 'auth_password_container auth_container'
                            label = {t('auth.sign_up.password_label')}
                            inputClassName = 'auth_input'
                            inputName = 'password'
                            values = {values}
                            setFieldValue = {setFieldValue}
                            touched = {touched}
                            errors = {errors}
                            placeholder = {t('auth.sign_up.password_placeholder')}
                            iconClassName = 'auth_password_eye'
                        />
                        <label className='sign_up_checkbox'>
                            <Field
                                name = 'is_agree'
                                type = "checkbox"
                                className = {
                                    touched.is_agree && errors.is_agree
                                        ? 'sign_up_agreement_checkbox_warning'
                                        : 'sign_up_agreement_checkbox'
                                }

                            />
                            <span className = "checkmark"></span>
                            <span className = "sign_up_password_label">
                               {t('auth.sign_up.agreement_text')}
                             </span>
                        </label>
                        <a target='_blank' rel="noopener noreferrer" href='/' className = "sign_up_password_link">{t('auth.sign_up.agreement_link')}</a>
                        <Button
                            type = "submit"
                            colorStyle = {'dark-green'}
                            className = "auth_button"
                            disabled={!isValid}
                        >
                            {t('auth.sign_up.button')}
                        </Button>
                        <p className = "auth_footer_text">
                            {t('auth.sign_up.footer_text')}
                            <span onClick = {handleShowSignIn} className = "auth_footer_link">
                                {t('auth.sign_up.sign_up_link')}
                             </span>
                        </p>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default SignUp
