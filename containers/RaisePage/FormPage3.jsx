import React from "react";
import { useTranslation } from "react-i18next";
import SplitLine from "components/ui/SplitLine";
import Button from "components/ui/Button";
import InputComponent from "components/ui/InputComponent";
import { Formik, Form } from "formik";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IconComponent from "components/ui/IconComponent";
import useRaiseForm3ErrorHandler from "customHooks/useRaiseForm3ErrorHandler";
import * as yup from "yup";

const FormPage3 = ({ changePage, submit, formNumber, data }) => {
  const { t } = useTranslation();
  const errorHandlerHook = useRaiseForm3ErrorHandler();

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
  const raiseForm3 = yup.object({
    website: yup.string(t("errors.website_example")),
    video_preview: yup.string().url(t("errors.youtube_example")),
    social_one: yup.string().url(t("errors.facebook_example"))
        .when('followers_count_one', {
          is: (el => el && el >= 0 ? true : false),
          then: yup.string().url().required(t("errors.media_required")),
        }),
    followers_count_one: yup.number().typeError(t("errors.followers_number")).min(0,t("errors.follower_positive")),
    social_two: yup.string().url(t("errors.twitter_example")).when('followers_count_two', {
      is: (el => el && el >= 0 ? true : false),
      then: yup.string().url().required(t("errors.media_required")),
    }),
    followers_count_two: yup.number().typeError(t("errors.followers_number")).min(0,t("errors.follower_positive")),
    social_three: yup.string().url(t("errors.linkedin_example")).when('followers_count_three', {
      is: (el => el && el >= 0 ? true : false),
      then: yup.string().url().required(t("errors.media_required")),
    }),
    followers_count_three: yup.number().typeError(t("errors.followers_number")).min(0,t("errors.follower_positive")),
  })
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
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values, setFieldValue, setFieldError }) => (
        <Form className="raise_form">
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.company_website")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="website"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.websiteError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.video_link")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="video_preview"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.videoPreviewError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media_facebook")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_one"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.socialsOneError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_one"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.followersOneError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media_linkedin")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_two"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.socialsTwoError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_two"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.followersTwoError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.social_media_instagram")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="social_three"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.socialsThreeError}
            clearError={errorHandlerHook?.clearRaiseFormErrorFromApi}
          />
          <InputComponent
            labelClassName="raise_form_input_container"
            label={t("raisePage.form3.followers")}
            inputClassName="raise_form_input"
            errorClassName="raise_error_label"
            inputName="followers_count_three"
            values={values}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            touched={touched}
            errors={errors}
            errorFromApi={errorHandlerHook?.followersThreeError}
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

export default FormPage3;
