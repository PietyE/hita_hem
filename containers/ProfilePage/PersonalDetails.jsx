import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";

import { CountryDropdown } from "react-country-region-selector";
import IconComponent from "components/ui/IconComponent";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { createYearList, months, getDays } from "utils/utils";

import Quiz from "components/Quiz";
import PersonalDetailsUpload from "./PersonalDetailsUpload";
import SplitLine from "components/ui/SplitLine";
import Button from "components/ui/Button";

import { getIsPaymentsWasSelector } from "redux/reducers/user";
import { setShowQuiz } from "redux/actions/authPopupWindows";
import { getShowQuiz } from "redux/reducers/authPopupWindows";
import { createProfile, changeProfile } from "redux/actions/user";
import { getProfile } from "redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";

import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import capitalize from "lodash/capitalize";
import InputComponent from "components/ui/InputComponent";

import {
  personalDetailsCreateSchema,
  personalDetailsUpdateSchema,
} from "utils/vadidationSchemas";
import { getPrivacyPolicyDocument } from "redux/reducers/documents";
import useProfileErrorHandler from "customHooks/useProfileErrorHandler";

const PersonalDetails = ({
  type,
  onMakePayment,
  currentInvestment,
  sectionClassName,
}) => {
  const { t } = useTranslation();
  const errorHandlerHook = useProfileErrorHandler();
  const dispatch = useDispatch();
  const profile = useSelector(getProfile, isEqual);
  const isShowQuiz = useSelector(getShowQuiz);
  const isPaymentsWas = useSelector(getIsPaymentsWasSelector);
  let initialValues = {
    address: {
      country: "",
      city: "",
      address: "",
    },
    first_name: "",
    second_name: "",
    is_agree: false,
    day: "",
    month: "",
    year: "",
    personal_id: "",
    phone_number: "",
    image: "",
  };

  const [valuesFromApi, setValuesFromApi] = useState(null);
  useEffect(() => {
    if (!isEmpty(profile)) {
      setValuesFromApi(profile);
    }
  }, [profile]);

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

  const openQuiz = useCallback(() => {
    dispatch(setShowQuiz(true));
  }, [dispatch]);

  const documentUrl = useSelector(getPrivacyPolicyDocument);

  const prepareDataForApi = (values) => {
    const newProfile = JSON.parse(JSON.stringify(values));
    newProfile.first_name = capitalize(newProfile.first_name.toLowerCase());
    newProfile.second_name = capitalize(newProfile.second_name.toLowerCase());
    delete newProfile.day;
    delete newProfile.month;
    delete newProfile.year;
    delete newProfile.image;
    if (!!values?.year && !!values?.month && !!values?.day) {
      newProfile.date_of_birth = `${values.year}-${values.month}-${values.day}`;
    }

    const dataForApi = { profile: newProfile };

    if (profile?.image !== values?.image) {
      let data = new FormData();
      data.append("image", values.image);
      dataForApi.image = data;
    }
    return dataForApi;
  };

  const onSubmitProfile = (values) => {
    const dataForApi = prepareDataForApi(values);

    if (isEmpty(profile)) {
      _createProfile(dataForApi);
    } else {
      _changeProfile(dataForApi);
    }
  };

  const onSubmitInvest = (values) => {
    const dataForApi = prepareDataForApi(values);
    if (isPaymentsWas) {
      onMakePayment({ profile: dataForApi, amount: currentInvestment });
    } else {
      openQuiz();
    }
  };

  const years = createYearList();

  return (
    <section className={`profile_personal_details ${sectionClassName}`}>
      {!type && (
        <h2 className="profile_personal_details_title">
          {t("profile_page.personal.main_title")}
        </h2>
      )}
      <Formik
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
              ? !(dirty && currentInvestment > 0 && values.is_agree)
              : currentInvestment <= 0;
          } else if(isEmpty(profile)){
            isButtonDisabled = !(dirty && values.is_agree);
          } else {
            isButtonDisabled = !(dirty);
          }
          const onSubmitInvestFromQuiz = () => {
            onMakePayment({
              profile: prepareDataForApi(values),
              amount: currentInvestment,
            });
          };
          return (
            <>
              <Quiz show={isShowQuiz} onSubmit={onSubmitInvestFromQuiz} />
              <Form className="profile_form">
                {!type && (
                  <PersonalDetailsUpload
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                )}
                <div className="profile_form_data_container">
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
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      touched={touched}
                      errors={errors}
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
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      touched={touched}
                      errors={errors}
                      errorFromApi={errorHandlerHook?.secondNameError}
                      clearError={errorHandlerHook?.clearProfileErrorFromApi}
                    />
                    <p className="profile_form_birth_text">
                      {t("profile_page.personal.date_title")}
                    </p>
                    <div className="profile_form_date_block">
                      <label className="profile_input_small profile_month">
                        {t("profile_page.personal.month_label")}
                        <br />
                        <Field
                          name="month"
                          as="select"
                          onBlur={() => {
                            setFieldError("month", undefined);
                          }}
                          className={
                            touched.month && errors.month
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
                                {el.month}
                              </option>
                            );
                          })}
                        </Field>
                        <div className="profile_input_arrow">
                          <IconComponent icon={faCaretDown} />
                        </div>
                        {errors.month && touched.month ? (
                          <p className={"input_warning_text warning_date_text"}>
                            {errors.month}
                          </p>
                        ) : null}
                      </label>
                      <label className="profile_input_small profile_day">
                        {t("profile_page.personal.day_label")}
                        <br />
                        <Field
                          name="day"
                          as="select"
                          onBlur={() => {
                            setFieldError("day", undefined);
                          }}
                          disabled={!values?.month}
                          className={
                            touched.day && errors.day
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
                        </Field>
                        <div className="profile_input_arrow">
                          <IconComponent icon={faCaretDown} />
                        </div>
                        {errors.day && touched.day ? (
                          <p className={"input_warning_text warning_date_text"}>
                            {errors.day}
                          </p>
                        ) : null}
                      </label>
                      <label className="  profile_input_small profile_year">
                        {t("profile_page.personal.year_label")}
                        <br />
                        <Field
                          name="year"
                          as="select"
                          onBlur={() => {
                            setFieldError("year", undefined);
                          }}
                          className={
                            touched.year && errors.year
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
                        </Field>
                        <div className="profile_input_arrow">
                          <IconComponent icon={faCaretDown} />
                        </div>
                        {errors.year && touched.year ? (
                          <p className={"input_warning_text warning_date_text"}>
                            {errors.year}
                          </p>
                        ) : null}
                      </label>
                    </div>
                    <label className="  profile_input_middle profile_country">
                      {t("profile_page.personal.country_label")}
                      <br />
                      <CountryDropdown
                        className={
                          ((errors.address?.country && touched.address?.country) || errorHandlerHook?.countryError)
                            ? "profile_form_input_warning profile_form_input_with_arrow"
                            : "profile_form_input profile_form_input_with_arrow"
                        }
                        name="address.country"
                        values={values?.address?.country}
                        value={values?.address?.country}
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
                        defaultOptionLabel={values?.address?.country || ""}
                      />
                      <div className="profile_input_arrow">
                        <IconComponent icon={faCaretDown} />
                      </div>
                      {errors.address?.country && touched.address?.country ? (
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
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      touched={touched}
                      errors={errors}
                      errorFromApi={errorHandlerHook?.cityError}
                      clearError={errorHandlerHook?.clearProfileErrorFromApi}
                    />
                    <InputComponent
                      labelClassName="profile_input_big profile_address"
                      label={t("profile_page.personal.address_label")}
                      inputClassName="profile_form_input"
                      errorClassName="profile_form_warning_text"
                      inputName="address.address"
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      touched={touched}
                      errors={errors}
                      errorFromApi={errorHandlerHook?.addressError}
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
                      errorFromApi={errorHandlerHook?.phoneError}
                      clearError={errorHandlerHook?.clearProfileErrorFromApi}
                    />
                  </div>
                  <SplitLine className="profile_form_split_line" />
                  <div className="profile_form_footer">
                    {isEmpty(profile) && (
                      <div className="profile_form_agreement">
                        <Field
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
                      colorStyle="dark-green"
                      type="submit"
                      disabled={isButtonDisabled}
                      className="profile_form_agreement_button"
                    >
                      {isEmpty(profile) || type
                        ? t("profile_page.personal.submit_button")
                        : t("profile_page.personal.save_button")}
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </section>
  );
};
export default PersonalDetails;
