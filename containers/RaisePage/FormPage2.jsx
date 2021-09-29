import React from "react";
import { useTranslation } from "react-i18next";
import SplitLine from "components/ui/SplitLine";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { Formik, Form } from "formik";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IconComponent from "components/ui/IconComponent";
import { raiseForm2 } from "utils/vadidationSchemas";
import useRaiseForm2ErrorHandler from "customHooks/useRaiseForm2ErrorHandler";

const FormPage2 = ({ changePage, submit, formNumber, data }) => {
  const { t } = useTranslation();
  const errorHandlerHook = useRaiseForm2ErrorHandler();

  const initialValues = {
    company_name: data.company_name,
    company_form: data.company_form,
    role: data.role,
    share_price: data.share_price,
    revenue: data.revenue,
    amount: data.amount,
  };
  const onSubmit = (values) => {
    submit(values, `form${formNumber}`);
    changePage(formNumber + 1);
  };
  const prevPage = (e) => {
    e.preventDefault();
    changePage(formNumber - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={raiseForm2}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values, setFieldValue, setFieldError }) => (
        <Form className="raise_form">
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.company_name")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="company_name"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.companyNameError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.company_form")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="company_form"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.companyFormError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.role")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="role"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.roleError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.shares")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="share_price"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.sharePriceError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.revenue")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="revenue"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.revenueError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form2.amount")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="amount"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.amountError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <SplitLine className="raise_form_split_line" />
          <div className="raise_form_button_container">
            <Button
              type="button"
              colorStyle="white"
              className=" raise_form_button_back"
              onClick={prevPage}
            >
              <IconComponent
                icon={faArrowLeft}
                className="raise_form_button_arrow_left"
              />
              {t("raisePage.form_footer.button_prev")}
            </Button>
            <Button
              type="submit"
              colorStyle="dark-green"
              className="raise_form_button"
            >
              {t("raisePage.form_footer.button_next")}
              <IconComponent
                icon={faArrowRight}
                className="raise_form_button_arrow_right"
              />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage2;
