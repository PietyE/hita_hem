import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import Button from "components/ui/Button";
import SplitLine from "components/ui/SplitLine";
import InputComponent from "components/ui/InputComponent";
import { CountryDropdown } from "react-country-region-selector";
import IconComponent from "components/ui/IconComponent";
import { faArrowRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { raiseForm1 } from "utils/vadidationSchemas";
import useRaiseFormErrorHandler from "customHooks/useRaiseFormErrorHandler";
import * as yup from "yup";
import {phoneRegExp} from "../../utils/vadidationSchemas";

const FormPage1 = ({ changePage, submit, formNumber, data }) => {
  const { t } = useTranslation();
  const errorHandlerHook = useRaiseFormErrorHandler();

  const initialValues = {
    first_name: data.first_name,
    second_name: data.second_name,
    email: data.email,
    phone: data.phone,
    country: data.country,
  };
  const raiseForm1 = yup.object({
    first_name: yup.string().min(1).max(80).required(t("errors.first_name_required")),
    second_name: yup.string().min(1).max(80).required(t("errors.second_name_required")),
    email: yup.string().email(t("errors.email_example")).max(80).required(t("errors.email_required")),
    phone: yup.string().matches(phoneRegExp, t("errors.phone_example")).required(t("errors.phone_required")),
    country: yup.string().required(t("errors.country_required")),
  })

  const onSubmit = (values) => {
    submit(values, `form${formNumber}`);
    changePage(formNumber + 1);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={raiseForm1}
      onSubmit={onSubmit}
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
        setFieldError,
      }) => (
        <Form className="raise_form">
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.first_name")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="first_name"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.firstNameError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.last_name")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="second_name"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.secondNameError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.email")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="email"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.emailNameError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.phone")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="phone"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.phoneError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
            placeholder="+3071 0XX XX XXX XXX"
          />
          <label
            htmlFor="country"
            className="raise_form_input_container form_input_container_country"
          >
            {t("raisePage.form1.country")}
            <br />
            <CountryDropdown
              className={
                ((touched.country && errors.country)|| errorHandlerHook?.countryError)
                  ? "raise_form_input_warning raise_form_country"
                  : "raise_form_input raise_form_country"
              }
              name="country"
              value={values.country}
              onChange={(_, e) => {
                handleChange(e);
                errorHandlerHook?.clearRaiseFormErrorFromApi("country");
              }}
              onBlur={(_, e) => {
                setFieldError("country", undefined);
                handleBlur(e);
              }}
              defaultOptionLabel=""
            />
            <div className="raise_form_country_arrow">
              <IconComponent icon={faCaretDown} />
            </div>
            {errors.country && touched.country ? (
              <p className={"raise_error_label country_warning_text "}>
                {errors.country}
              </p>
            ) : null}
            {errorHandlerHook?.countryError ? (
              <p className={"raise_error_label country_warning_text"}>
                {Array.isArray(errorHandlerHook?.countryError)
                  ? errorHandlerHook?.countryError[0]
                  : errorHandlerHook?.countryError}
              </p>
            ) : null}
          </label>

          <SplitLine className="raise_form_split_line" />
          <Button
            type="submit"
            colorStyle="dark-green"
            className="raise_form_button raise_form_button_alone"
          >
            {t("raisePage.form_footer.button_next")}
            <IconComponent
              icon={faArrowRight}
              className="raise_form_button_arrow_right"
            />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage1;
