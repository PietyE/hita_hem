import React, {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {FormikFormComponent,FormikComponent, FormikFieldComponent} from "components/ui/FormikComponent";
import * as yup from "yup";

import CountryDropdownComponent from "components/ui/CountryDropdownComponent";
import IconComponent from "components/ui/IconComponent";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

import {createYearList, months, getDays} from "utils/utils";

import PersonalDetailsUpload from "./PersonalDetailsUpload";
import SplitLine from "components/ui/SplitLine";
import Button from "components/ui/Button";

import {createProfile, changeProfile, setActiveTab} from "redux/actions/user";
import {getProfile, getUserIdSelector} from "redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";

import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import capitalize from "lodash/capitalize";
import InputComponent from "components/ui/InputComponent";

import {phoneRegExp, personalIdRegExp, zipCodeRegExp, emailRegExp} from "../../utils/vadidationSchemas";
import {validateCampaignNumber} from "utils/utils";
import {restrictOnlyLetters, restrictCity, restrictLettersNumbersAndSpecialCharacters} from "../../utils/restrictInput";
import {getPrivacyPolicyDocument} from "redux/reducers/documents";
import useProfileErrorHandler from "customHooks/useProfileErrorHandler";
import {recaptcha} from "../../utils/recaptcha";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import CaptchaPrivacyBlock from "../../components/CaptchaPrivacyBlock";
import {getIsBankIdResident, getUserEmailSelector} from "../../redux/reducers/user";
import {setShowPostalCodeNotification} from "../../redux/actions/authPopupWindows";

const PersonalDetails = ({
                             type,
                             onMakePayment,
                             currentInvestment,
                             sectionClassName,
                             disabled
                         }) => {
    const {t} = useTranslation();
    const history = useRouter();
    const companyInputRef = useRef(null)
    const errorHandlerHook = useProfileErrorHandler();
    const dispatch = useDispatch();
    const profile = useSelector(getProfile, isEqual);
    const language = useSelector(getSelectedLangSelector)
    const documentUrl = useSelector(getPrivacyPolicyDocument);
    const usersId = useSelector(getUserIdSelector)
    const isBankIdResident = useSelector(getIsBankIdResident)
    const emailFromAccount = useSelector(getUserEmailSelector)
    let initialValues = {
        address: {
            country: "",
            city: "",
            address: "",
        },
        first_name: "",
        second_name: "",
        email: '',
        is_agree: false,
        day: "",
        month: "",
        year: "",
        personal_id: "",
        phone_number: "",
        image: "",
        zip_code: '',
    };

    const emailCheckForCreateProfile = isBankIdResident ? yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80).required(t("errors.email_required")) : yup.string()

    const personalDetailsCreateSchema = yup.object({
        address: yup.object().shape({
            country: yup.string().required(t("errors.country_required")),
            city: yup.string().max(256, `${t("errors.long_error_part1")} 256 ${t("errors.long_error_part2")}`).required(t("errors.city_required")),
            address: yup.string().max(400, `${t("errors.long_error_part1")} 400 ${t("errors.long_error_part2")}`).required(t("errors.address_required")),
        }),
        first_name: yup.string().max(100, `${t("errors.long_error_part1")} 100 ${t("errors.long_error_part2")}`).required(t("errors.first_name_required")),
        second_name: yup.string().max(100, `${t("errors.long_error_part1")} 100 ${t("errors.long_error_part2")}`).required(t("errors.second_name_required")),
        email: emailCheckForCreateProfile,
        is_agree: yup.bool().oneOf([true]),
        day: yup.number().required(t("errors.day_required")),
        month: yup.number().required(t("errors.month_required")),
        year: yup.number().required(t("errors.year_required")),
        personal_id: yup.string().matches(personalIdRegExp, t("errors.personal_id_example")).required(t("errors.personal_id_required")),
        phone_number: yup.string().matches(phoneRegExp, t("errors.phone_example")).required(t("errors.phone_required")),
        zip_code: yup.string().matches(zipCodeRegExp, t("errors.zip_example")).required(t("errors.zip_required"))
    })
    const postalCodeCheckForUpdateProfile = type ? yup.string().matches(zipCodeRegExp, t("errors.zip_example")) : yup.string().matches(zipCodeRegExp, t("errors.zip_example")).test('zip_code', t("errors.zip_empty"), val => val?.length)
    const personalDetailsUpdateSchema = yup.object({
        address: yup.object().shape({
            country: yup.string(),
            city: yup.string().max(256, `${t("errors.long_error_part1")} 256 ${t("errors.long_error_part2")}`).test('city', t("errors.city_empty"), val => val?.length),
            address: yup.string().max(400, `${t("errors.long_error_part1")} 400 ${t("errors.long_error_part2")}`).test('address', t("errors.address_empty"), val => val?.length),
        }),
        first_name: yup.string().max(100, `${t("errors.long_error_part1")} 100 ${t("errors.long_error_part2")}`).test('first_name', t("errors.first_name_empty"), val => val?.length),
        second_name: yup.string().max(100, `${t("errors.long_error_part1")} 100 ${t("errors.long_error_part2")}`).test('second_name', t("errors.second_name_empty"), val => val?.length),
        email: yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80).required(t("errors.email_required")),
        day: yup.number(),
        month: yup.number(),
        year: yup.number(),
        personal_id: yup.string().matches(personalIdRegExp, t("errors.personal_id_example")).test('personal_id', t("errors.personal_id_empty"), val => val),
        phone_number: yup.string().matches(phoneRegExp, t("errors.phone_example")).test('phone_number', t("errors.phone_empty"), val => val?.length),

        zip_code: postalCodeCheckForUpdateProfile,

    })

    const [valuesFromApi, setValuesFromApi] = useState(null);
    const [companyNumber, setCompanyNumber] = useState('')
    const [isCompanyInvest, setIsCompanyInvest] = useState(false)
    const [campaignNumberWarning, setCampaignNumberWarning] = useState(false)
    useEffect(() => {
        if (!isEmpty(profile)) {
            setValuesFromApi(profile);
        }
    }, [profile]);

    useEffect(() => {
        return (
            errorHandlerHook.clearAllProfileErrors()
        )
    }, [])

    useEffect(() => {
        if (isBankIdResident && emailFromAccount && isEmpty(profile)) {
            setValuesFromApi({email: emailFromAccount})
        }
    }, [profile, isBankIdResident, emailFromAccount])

    const _createProfile = useCallback(
        (data) => {
            dispatch(createProfile(data));
        },
        [dispatch]
    );

    const _changeProfile = useCallback(
        (data) => {
            dispatch(changeProfile(data));
        },
        [dispatch]
    );


    const handleInput = (e) => {
        if (campaignNumberWarning) {
            setCampaignNumberWarning(false)
        }
        setCompanyNumber(e.target.value)
    }

    useEffect(() => {
        if (isCompanyInvest) {
            companyInputRef.current.focus()
        }
    }, [isCompanyInvest])

    const handleChangeCompanyCheckbox = () => {
        if (isCompanyInvest) {
            setCompanyNumber('')
        }
        setIsCompanyInvest(!isCompanyInvest)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setActiveTab('personal_details'))
        history.push(`/users/[usersId]/profile`, `/users/${usersId}/profile`)
    }

    const isInputsReadOnly = !isEmpty(profile) && !!type

    const prepareDataForApi = (values) => {
        const newProfile = JSON.parse(JSON.stringify(values));
        newProfile.first_name = capitalize(newProfile.first_name.toLowerCase());
        newProfile.second_name = capitalize(newProfile.second_name.toLowerCase());
        newProfile.email = newProfile?.email?.toLowerCase()
        if (!isBankIdResident) {
            delete newProfile.email;
        }
        if (isBankIdResident && valuesFromApi?.email === newProfile?.email) {
            delete newProfile.email;
        }
        delete newProfile.day;
        delete newProfile.month;
        delete newProfile.year;
        delete newProfile.image;
        if (!!values?.year && !!values?.month && !!values?.day) {
            newProfile.date_of_birth = `${values.year}-${values.month}-${values.day}`;
        }
        const dataForApi = {profile: newProfile};

        if (values.image !== null) {
            if (profile?.image !== values?.image) {
                let data = new FormData();
                data.append("image", values.image);
                dataForApi.image = data;
            }
        } else {
            dataForApi.image = null;
        }
        return dataForApi;
    };
    const onSubmitProfile = (values) => {
        const dataForApi = prepareDataForApi(values);
        if (isEmpty(profile)) {
            recaptcha('create_profile', _createProfile, dataForApi)
            // _createProfile(dataForApi);
        } else {
            recaptcha('change_profile', _changeProfile, dataForApi)
            // _changeProfile(dataForApi);
        }
    };

    const onSubmitInvest = (values) => {
        if (!isEmpty(profile) && !profile?.zip_code) {
            dispatch(setShowPostalCodeNotification(true));
            return
        }


        if (companyNumber) {
            if (validateCampaignNumber(companyNumber.toUpperCase())) {
                const dataForApi = prepareDataForApi(values);
                const investData = companyNumber ? {
                    profile: dataForApi,
                    amount: currentInvestment,
                    company_number_invest: companyNumber.toUpperCase()
                } : {profile: dataForApi, amount: currentInvestment}
                recaptcha('create_profile_in_invest_form', onMakePayment, investData)
            } else {
                setCampaignNumberWarning(true)
            }
        } else {
            const dataForApi = prepareDataForApi(values);
            const investData = companyNumber ? {profile: dataForApi, amount: currentInvestment} : {
                profile: dataForApi,
                amount: currentInvestment
            }
            recaptcha('create_profile_in_invest_form', onMakePayment, investData)
        }


    };

    let _footerStyles
    if (isInputsReadOnly) {
        _footerStyles = 'profile_form_footer profile_form_footer_column'
    } else {
        _footerStyles = isEmpty(profile) || type ? "profile_form_footer" : 'profile_form_footer profile_form_footer_column'
    }
    const years = createYearList();
    return (
        <section className={`profile_personal_details ${sectionClassName}`}>
            {!type && (
                <h2 className="profile_personal_details_title">
                    {t("profile_page.personal.main_title")}
                </h2>
            )}
            <FormikComponent
                initialValues={valuesFromApi || initialValues}
                validationSchema={
                    isEmpty(profile)
                        ? personalDetailsCreateSchema
                        : personalDetailsUpdateSchema
                }
                onSubmit={type ? onSubmitInvest : onSubmitProfile}
                enableReinitialize
                // validateOnMount
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                      setValues,
                      setFieldError,
                      dirty,
                  }) => {
                    let days = getDays(values?.month?.toString()) || [];
                    let isButtonDisabled;
                    if (type) {
                        isButtonDisabled = isEmpty(profile)
                            ? !(dirty && !disabled && values.is_agree)
                            : disabled;
                    } else if (isEmpty(profile)) {
                        isButtonDisabled = !(dirty && values.is_agree);
                    } else {
                        isButtonDisabled = !(dirty);
                    }
                    return (
                        <>
                            <FormikFormComponent className="profile_form" action='make_payment'>
                                {!type && (
                                    <PersonalDetailsUpload
                                        setFieldValue={setFieldValue}
                                        values={values}
                                    />
                                )}
                                <div
                                    className={isEmpty(profile) || type ? "profile_form_data_container" : 'profile_form_data_container data_container_for_edit'}>

                                    <h3 className="profile_form_data_container_title">
                                        {t("profile_page.personal.profile_title")}
                                    </h3>
                                    <div className="profile_form_inputs_container">
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_first_name"
                                            label={t("profile_page.personal.first_name_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="first_name"
                                            values={values}
                                            restrictInput={restrictOnlyLetters}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.firstNameError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_second_name"
                                            label={t("profile_page.personal.second_name_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="second_name"
                                            values={values}
                                            restrictInput={restrictOnlyLetters}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.secondNameError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />

                                        {isBankIdResident &&
                                        <InputComponent
                                            labelClassName="profile_input_big profile_email"
                                            label={t("profile_page.personal.email")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="email"
                                            values={values}
                                            // restrictInput = {restrictOnlyLetters}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.emailError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        }
                                        <p className="profile_form_birth_text">
                                            {t("profile_page.personal.date_title")}
                                        </p>
                                        <div className="profile_form_date_block">
                                            <label className="profile_input_small profile_month">
                                                {t("profile_page.personal.month_label")}
                                                <br/>
                                                <FormikFieldComponent
                                                    name="month"
                                                    as="select"
                                                    disabled={isInputsReadOnly}
                                                    onBlur={() => {
                                                        setFieldError("month", undefined);
                                                    }}
                                                    className={
                                                        errors.month
                                                            ? "profile_form_input_warning profile_form_input_with_arrow"
                                                            : "profile_form_input profile_form_input_with_arrow"
                                                    }
                                                >
                                                    <option
                                                        label={t("profile_page.personal.month_placeholder")}
                                                        disabled={true}
                                                    />
                                                    {months.map((el) => {
                                                        return (
                                                            <option key={el.id} value={el.id}>
                                                                {language === "en" ? el.month : el.monthSw}
                                                            </option>
                                                        );
                                                    })}
                                                </FormikFieldComponent>
                                                <div className="profile_input_arrow">
                                                    <IconComponent icon={faCaretDown}/>
                                                </div>
                                                {errors.month ? (
                                                    <p className={"input_warning_text warning_date_text"}>
                                                        {errors.month}
                                                    </p>
                                                ) : null}
                                            </label>
                                            <label className="profile_input_small profile_day">
                                                {t("profile_page.personal.day_label")}
                                                <br/>
                                                <FormikFieldComponent
                                                    name="day"
                                                    as="select"
                                                    onBlur={() => {
                                                        setFieldError("day", undefined);
                                                    }}
                                                    disabled={!values?.month || isInputsReadOnly}
                                                    className={
                                                        errors.day
                                                            ? "profile_form_input_warning profile_form_input_with_arrow"
                                                            : "profile_form_input profile_form_input_with_arrow"
                                                    }
                                                >
                                                    <option
                                                        label={t("profile_page.personal.day_placeholder")}
                                                        disabled={true}
                                                    />
                                                    {days.map((el) => {
                                                        return (
                                                            <option key={el} value={el}>
                                                                {el}
                                                            </option>
                                                        );
                                                    })}
                                                </FormikFieldComponent>
                                                <div className="profile_input_arrow">
                                                    <IconComponent icon={faCaretDown}/>
                                                </div>
                                                {errors.day ? (
                                                    <p className={"input_warning_text warning_date_text"}>
                                                        {errors.day}
                                                    </p>
                                                ) : null}
                                            </label>
                                            <label className="  profile_input_small profile_year">
                                                {t("profile_page.personal.year_label")}
                                                <br/>
                                                <FormikFieldComponent
                                                    name="year"
                                                    as="select"
                                                    disabled={isInputsReadOnly}
                                                    onBlur={() => {
                                                        setFieldError("year", undefined);
                                                    }}
                                                    className={
                                                        errors.year
                                                            ? "profile_form_input_warning profile_form_input_with_arrow"
                                                            : "profile_form_input profile_form_input_with_arrow"
                                                    }
                                                >
                                                    <option
                                                        label={t("profile_page.personal.year_placeholder")}
                                                        disabled={true}
                                                    />
                                                    {years.map((year) => {
                                                        return (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        );
                                                    })}
                                                </FormikFieldComponent>
                                                <div className="profile_input_arrow">
                                                    <IconComponent icon={faCaretDown}/>
                                                </div>
                                                {errors.year ? (
                                                    <p className={"input_warning_text warning_date_text"}>
                                                        {errors.year}
                                                    </p>
                                                ) : null}
                                            </label>
                                        </div>
                                        <label className="  profile_input_middle profile_country">
                                            {t("profile_page.personal.country_label")}
                                            <br/>
                                            <CountryDropdownComponent
                                                className={
                                                    ((errors.address?.country) || errorHandlerHook?.countryError)
                                                        ? "profile_form_input_warning profile_form_input_with_arrow"
                                                        : "profile_form_input profile_form_input_with_arrow"
                                                }
                                                name="address.country"
                                                values={values?.address?.country}
                                                value={values?.address?.country}
                                                disabled={isInputsReadOnly}
                                                valueType="short"
                                                onChange={(_, e) => {
                                                    errorHandlerHook?.clearProfileErrorFromApi(
                                                        "address.country"
                                                    );
                                                    handleChange(e);
                                                }}
                                                onBlur={(_, e) => {
                                                    setFieldError("address.country", undefined);
                                                    handleBlur(e);
                                                }}
                                                showDefaultOption={isEmpty(profile) && !values?.address?.country}
                                                defaultOptionLabel={t("profile_page.personal.country_placeholder")}

                                            />
                                            <div className="profile_input_arrow">
                                                <IconComponent icon={faCaretDown}/>
                                            </div>
                                            {errors.address?.country ? (
                                                <p className={"input_warning_text warning_date_text"}>
                                                    {errors.address?.country}
                                                </p>
                                            ) : null}
                                            {errorHandlerHook?.countryError ? (
                                                <p className={"input_warning_text warning_date_text"}>
                                                    {Array.isArray(errorHandlerHook?.countryError)
                                                        ? errorHandlerHook?.countryError[0]
                                                        : errorHandlerHook?.countryError}
                                                </p>
                                            ) : null}
                                        </label>
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_city"
                                            label={t("profile_page.personal.city_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="address.city"
                                            values={values}
                                            restrictInput={restrictCity}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.cityError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_address"
                                            label={t("profile_page.personal.address_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="address.address"
                                            values={values}
                                            restrictInput={restrictLettersNumbersAndSpecialCharacters}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.addressError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_zip"
                                            label={t("profile_page.personal.zip")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="zip_code"
                                            values={values}
                                            restrictInput={restrictLettersNumbersAndSpecialCharacters}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.zipError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_id_number"
                                            label={t("profile_page.personal.personal_id_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="personal_id"
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.personalIdError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                        <InputComponent
                                            labelClassName="profile_input_middle profile_phone"
                                            label={t("profile_page.personal.phone_label")}
                                            inputClassName="profile_form_input"
                                            errorClassName="profile_form_warning_text"
                                            inputName="phone_number"
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            touched={touched}
                                            errors={errors}
                                            disabled={isInputsReadOnly}
                                            errorFromApi={errorHandlerHook?.phoneError}
                                            clearError={errorHandlerHook?.clearProfileErrorFromApi}
                                        />
                                    </div>
                                    {isInputsReadOnly &&
                                    <p className='profile_form_footer_text'>{t("profile_page.personal.footer_text1")}<a
                                        onClick={handleClick} className='profile_form_footer_link'>
                                        {t("profile_page.personal.footer_link")}
                                    </a>{t("profile_page.personal.footer_text2")}</p>}
                                    {isEmpty(profile) && (
                                        <div className="profile_form_agreement">
                                            <FormikFieldComponent
                                                type="checkbox"
                                                name="is_agree"
                                                className="profile_form_checkbox"
                                            />
                                            {t("profile_page.personal.agreement_text")}
                                            <a
                                                className="profile_form_agreement_link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={documentUrl?.file || documentUrl?.url}
                                            >
                                                {t("profile_page.personal.agreement_link")}
                                            </a>
                                        </div>
                                    )}
                                    {!type && <SplitLine className="profile_form_split_line"/>}
                                    {type && (
                                        <div className="company_number_block">
                                            <label className='company_number_label'>
                                                <input
                                                    type='checkbox'
                                                    className='company_number_block_checkbox'
                                                    checked={isCompanyInvest}
                                                    onChange={handleChangeCompanyCheckbox}
                                                />
                                                {t("profile_page.personal.company_number_text")}
                                            </label>
                                            <input
                                                type='text'
                                                className={campaignNumberWarning ? 'profile_form_input company_number_block_input profile_form_input_warning' : 'profile_form_input company_number_block_input'}
                                                placeholder={t("profile_page.personal.company_number_placeholder")}
                                                value={companyNumber}
                                                autoFocus={true}
                                                onChange={handleInput}
                                                disabled={!isCompanyInvest}
                                                // ref={companyInputRef => {
                                                //     if(isCompanyInvest){
                                                //         companyInputRef?.focus()
                                                //     }
                                                // }}
                                                ref={companyInputRef}
                                            />

                                        </div>
                                    )}
                                    {campaignNumberWarning && (
                                        <p className='profile_form_campaign_number_warning input_warning_text'>{t("profile_page.personal.company_number_warning")}</p>
                                    )}
                                    <div className={_footerStyles}>
                                        <CaptchaPrivacyBlock className='profile_form_captcha_text'/>
                                        <div className='profile_form_footer_button_wrapper'>
                                            {!isEmpty(profile) && (
                                                <Button
                                                    colorStyle="link"
                                                    className="profile_form_button_cancel"
                                                    onClick={() =>
                                                        setValues(valuesFromApi || initialValues)
                                                    }
                                                >
                                                    {t("profile_page.personal.cancel_button")}
                                                </Button>
                                            )}
                                            <Button
                                                colorStyle="dark-violet"
                                                type="submit"
                                                disabled={isButtonDisabled}
                                                className={isEmpty(profile) || type ? "profile_form_agreement_button" : "profile_form_agreement_button profile_form_agreement_button_big"}
                                            >
                                                {isEmpty(profile) || type
                                                    ? t("profile_page.personal.submit_button")
                                                    : t("profile_page.personal.save_button")}
                                                {/*<p className='profile_form_agreement_button_notification'>zzzzzzz</p>*/}
                                            </Button>

                                        </div>

                                    </div>
                                </div>
                            </FormikFormComponent>
                        </>
                    );
                }}
            </FormikComponent>
        </section>
    );
};
export default PersonalDetails;
