import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
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
// import {filterComments} from "../../utils/restrictInput";

import * as yup from 'yup';


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

    // dataForApi.comments =  filterComments(values.comments);
    //   dataForApi.is_agree =  values.is_agree;
    //   dataForApi.comments =  values.comments;

      _sendForm(dataForApi);
  };

 const raiseForm4 = yup.object({
    is_agree: yup.bool().oneOf([true]),
    comments: yup.string(),
    documents: '',
  })

  return (
    <Formik
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
        <Form className="raise_form">
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
          <Field
            id="comments"
            name="comments"
            as="textarea"
            className="raise_form_comment_area"
          />
          <SplitLine className="raise_form_split_line" />
          <div className="raise_form_footer">
            <label className="raise_agreement">
              <Field
                type="checkbox"
                name="is_agree"
                className="raise_agreement_checkbox"
              />
              {t("raisePage.form_footer.privacy_policy1")}
              <a
                className="raise_agreement_link"
                target="_blank"
                rel="noopener noreferrer"
                href={documentUrl?.file || documentUrl?.url}
              >
                {t("raisePage.form_footer.privacy_policy2")}
              </a>
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
                colorStyle="dark-green"
                className="raise_form_button"
                disabled={!values.is_agree}
              >
                {t("raisePage.form_footer.button_submit")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage4;
