import React from "react";
import { useTranslation } from "react-i18next";
import SplitLine from "components/ui/SplitLine";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { Formik, Form, Field } from "formik";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { raiseForm3 } from "utils/vadidationSchemas";

const FormPage3 = ({ changePage, submit, formNumber, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    website: data.website,
    video_preview: data.video_preview,
    social_one: data.social_one,
    social_two: data.social_two,
    social_three: data.social_three,
    followers_count_one: data.followers_count_one,
    followers_count_two: data.followers_count_two,
    followers_count_three: data.followers_count_three,
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
      validationSchema={raiseForm3}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="raise_form">
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.company_website")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="website"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.video_link")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="video_preview"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_one"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_one"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_two"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_two"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_three"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_three"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <SplitLine className="raise_form_split_line" />
          <div className="raise_form_button_container">
            <Button
              type="button"
              colorStyle="white"
              className=" raise_form_button_back"
              onClick={prevPage}
            >
              <FontAwesomeIcon
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
              <FontAwesomeIcon
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

export default FormPage3;
