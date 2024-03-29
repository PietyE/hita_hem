import React from "react";
import { useTranslation } from "react-i18next";
import {FormikFormComponent,FormikComponent} from "../../components/ui/FormikComponent";
import Button from "components/ui/Button";
import SplitLine from "components/ui/SplitLine";
import InputComponent from "components/ui/InputComponent";
import CountryDropdownComponent from "components/ui/CountryDropdownComponent";
import IconComponent from "components/ui/IconComponent";
import { faArrowRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import useRaiseFormErrorHandler from "customHooks/useRaiseFormErrorHandler";
import * as yup from "yup";
import {phoneRegExp, emailRegExp} from "../../utils/vadidationSchemas";
import {restrictOnlyLetters} from "../../utils/restrictInput";

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
    first_name: yup.string().min(1).max(80, `${t("errors.long_error_part1")} 80 ${t("errors.long_error_part2")}`),
    second_name: yup.string().min(1).max(80, `${t("errors.long_error_part1")} 80 ${t("errors.long_error_part2")}`),
    email: yup.string().email(t("errors.email_example")).matches(emailRegExp, t("errors.email_example")).max(80, `${t("errors.long_error_part1")} 80 ${t("errors.long_error_part2")}`).required(t("errors.email_required")),
    phone: yup.string().matches(phoneRegExp, t("errors.phone_example")).required(t("errors.phone_required")),
    country: yup.string().required(t("errors.country_required")),
  })

  const onSubmit = (values) => {
    submit({...values, email:values?.email?.toLowerCase()}, `form${formNumber}`);
    changePage(formNumber + 1);
  };
  return (
    <FormikComponent
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
        <FormikFormComponent className="raise_form">
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.first_name")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="first_name"
            values={values}
            restrictInput = {restrictOnlyLetters}
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
            restrictInput = {restrictOnlyLetters}
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
            <CountryDropdownComponent
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
              showDefaultOption={!values.country}
              style={{color: !values.country ? 'rgba(0, 0, 0, 0.38)' : ''}}
              defaultOptionLabel={t("profile_page.personal.country_placeholder")}
              valueType="short"
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
            colorStyle="dark-blue"
            className="raise_form_button raise_form_button_alone"
          >
            {t("raisePage.form_footer.button_next")}
            <IconComponent
              icon={faArrowRight}
              className="raise_form_button_arrow_right"
            />
          </Button>
        </FormikFormComponent>
      )}
    </FormikComponent>
  );
};

export default FormPage1;
