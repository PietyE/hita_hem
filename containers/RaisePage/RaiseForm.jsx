import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import RaiseStepIcon from "components/ui/RaiseStepIcon/RaiseStepIcon";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";

import { getShowSuccessfulCampaignRegistration } from "redux/reducers/authPopupWindows";

const initialValues = {
  form1: {
    first_name: "",
    second_name: "",
    email: "",
    phone: "",
    country: "",
  },
  form2: {
    company_name: "",
    company_form: "",
    role: "",
    share_price: "",
    revenue: "",
    amount: "",
  },
  form3: {
    website: "",
    video_preview: "",
    social_one: "",
    social_two: "",
    social_three: "",
    followers_count_one: "",
    followers_count_two: "",
    followers_count_three: "",
  },
  form4: {
    documents: [],
    comments: "",
    is_agree: false,
  },
};

const RaiseForm = ({ myRef }) => {
  const { t } = useTranslation();

  const isCampaignRegistered = useSelector(
    getShowSuccessfulCampaignRegistration
  );

  const [formNumber, setFormNumber] = useState(1);

  const [formData, setFomData] = useState(initialValues);

  useEffect(() => {
    if (isCampaignRegistered) {
      setFormNumber(1);
      setFomData(initialValues);
    }
  }, [isCampaignRegistered]);

  const changeFormNumber = (pageNumber) => {
    setFormNumber(pageNumber);
  };
  const getDataFromForm = (data, form) => {
    setFomData({ ...formData, [form]: data });
  };

  const FormContent = () => {
    switch (formNumber) {
      case 1:
        return (
          <FormPage1
            changePage={changeFormNumber}
            submit={getDataFromForm}
            formNumber={formNumber}
            data={formData.form1}
          />
        );
      case 2:
        return (
          <FormPage2
            changePage={changeFormNumber}
            submit={getDataFromForm}
            formNumber={formNumber}
            data={formData.form2}
          />
        );
      case 3:
        return (
          <FormPage3
            changePage={changeFormNumber}
            submit={getDataFromForm}
            formNumber={formNumber}
            data={formData.form3}
          />
        );
      case 4:
        return (
          <FormPage4
            changePage={changeFormNumber}
            submit={getDataFromForm}
            formNumber={formNumber}
            data={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="raise_form_container">
      <h2 className="raise_form_title">{t("raisePage.raise_form_title")}</h2>
      <p className="raise_form_description">
        {t("raisePage.raise_form_text")}{" "}
      </p>
      <div className="raise_form_bottom_block">
        <div className="raise_bottom_block_icons_container" ref={myRef}>
          <RaiseStepIcon number={1} formNumber={formNumber} />
          <RaiseStepIcon number={2} formNumber={formNumber} />
          <RaiseStepIcon number={3} formNumber={formNumber} />
          <RaiseStepIcon number={4} formNumber={formNumber} />
        </div>
        <FormContent />
      </div>
    </section>
  );
};

export default RaiseForm;
