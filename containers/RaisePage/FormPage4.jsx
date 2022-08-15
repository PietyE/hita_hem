import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {FormikFormComponent,FormikComponent, FormikFieldComponent} from "../../components/ui/FormikComponent";

import IconComponent from "components/ui/IconComponent";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import SplitLine from "components/ui/SplitLine";
import UploadComponent from "./UploadComponent";
import DocumentItem from "./documentItem";
import Button from "components/ui/Button";

import { sendForm } from "redux/actions/raisePage";
import { getPrivacyPolicyDocument } from "redux/reducers/documents";
import {checkingAndEditingLink} from "../../utils/utils";
import {recaptcha} from "../../utils/recaptcha";
import * as yup from 'yup';
import CaptchaPrivacyBlock from "../../components/CaptchaPrivacyBlock";

const FormPage4 = ({ changePage, formNumber, data }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const documentUrl = useSelector(getPrivacyPolicyDocument);

  const _sendForm = useCallback(
    (id) => {
      dispatch(sendForm(id));
    },
    [dispatch]
  );

  const prevForm = (e) => {
    e.preventDefault();
    changePage(formNumber - 1);
  };

  const onSubmit = (values) => {
    const convertedDataFromForm3 = JSON.parse(JSON.stringify(data.form3))
    if(data.form3.website){
      convertedDataFromForm3.website = checkingAndEditingLink(data.form3.website)
    }
    const assignedObject = Object.assign(
      data.form1,
      data.form2,
      convertedDataFromForm3,
        values,
    );
    let dataForApi = {};
    for (let key in assignedObject) {
      if (assignedObject[key].length > 0 || assignedObject[key] > 0) {
        dataForApi[key] = assignedObject[key];
      }
    }

    let documentForApi;

    if (values.documents.length > 0) {
      documentForApi = values.documents.map((document) => ({
        document: document,
      }));
      dataForApi.documents = documentForApi;
    }
      recaptcha('rise_form_send',_sendForm,dataForApi)
  };

 const raiseForm4 =     yup.object({
    is_agree: yup.bool().oneOf([true]),
    comments: yup.string(),
    documents: '',
  })

  return (
    <FormikComponent
      initialValues={{
        documents: data.form4.documents,
        comments: data.form4.comments,
        is_agree: false,
      }}
      validationSchema={raiseForm4}
      onSubmit={onSubmit}
      setValue
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ setFieldValue, values }) => (
        <FormikFormComponent className="raise_form">
          <h4 className="form4_title">{t("raisePage.form4.attach_text")}</h4>
          <div className="raise_form_download_block">
            <UploadComponent setFieldValue={setFieldValue} values={values} />
            <ul className="raise_form_files_list">
              {values?.documents.length > 0 &&
                values.documents.map((document, i) => (
                  <DocumentItem
                    key={i}
                    data={document}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                ))}
            </ul>
          </div>
          <h4 className="form4_title">{t("raisePage.form4.comments")}</h4>
          <FormikFieldComponent
            id="comments"
            name="comments"
            as="textarea"
            className="raise_form_comment_area"
          />
          <SplitLine className="raise_form_split_line" />
          <CaptchaPrivacyBlock/>
          <div className="raise_form_footer">
            <label className="raise_agreement">
              <FormikFieldComponent
                type="checkbox"
                name="is_agree"
                className="raise_agreement_checkbox"
              />
              <span>
                  <span className="raise_agreement_checkbox_text">{t("raisePage.form_footer.privacy_policy1")}</span>
                  <a
                      className="raise_agreement_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={documentUrl?.file || documentUrl?.url}
                  >
                {t("raisePage.form_footer.privacy_policy2")}
              </a>
              </span>

            </label>
            <div className="raise_form_button_container">
              <Button
                type="button"
                colorStyle="white"
                className=" raise_form_button_back"
                onClick={prevForm}
              >
                <IconComponent
                  icon={faArrowLeft}
                  className="raise_form_button_arrow_left"
                />
                {t("raisePage.form_footer.button_prev")}
              </Button>
              <Button
                type="submit"
                action='rise_form_send'
                colorStyle="dark-violet"
                className="raise_form_button g-recaptcha"
                disabled={!values.is_agree}
              >
                {t("raisePage.form_footer.button_submit")}
              </Button>
            </div>
          </div>
        </FormikFormComponent>
      )}
    </FormikComponent>
  );
};

export default FormPage4;
