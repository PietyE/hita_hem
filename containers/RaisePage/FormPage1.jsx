import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import Button from "components/ui/Button";
import SplitLine from "components/ui/SplitLine";
import InputComponent from "components/ui/InputComponent";
import { CountryDropdown } from "react-country-region-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { raiseForm1 } from "utils/vadidationSchemas";

const FormPage1 = ({ changePage, submit, formNumber, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    first_name: data.first_name,
    second_name: data.second_name,
    email: data.email,
    phone: data.phone,
    country: data.country,
  };
  const onSubmit = (values) => {
    submit(values, `form${formNumber}`);
    changePage(formNumber + 1);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={raiseForm1}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
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
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.last_name")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="second_name"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.email")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="email"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form1.phone")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="phone"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
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
                touched.country && errors.country
                  ? "raise_form_input_warning "
                  : "raise_form_input "
              }
              name="country"
              value={values.country}
              onChange={(_, e) => handleChange(e)}
              onBlur={(_, e) => handleBlur(e)}
              defaultOptionLabel=""
            />
            <div className="raise_form_country_arrow">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {errors.country && touched.country ? (
              <p className={"raise_error_label country_warning_text "}>
                {errors.country}
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
            <FontAwesomeIcon
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
