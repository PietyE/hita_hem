import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ButtonStyled from "components/ui/Button";
import { validateUrl } from "utils/utils";

const UploadComponent = ({ setFieldValue, values }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const [showWarning, setShowWarning] = useState(false);

  const addFiles = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      if (validateUrl(inputRef.current.value)) {
        setFieldValue("documents", [
          ...values.documents,
          inputRef.current.value,
        ]);
        inputRef.current.value = "";
        setShowWarning(false);
      } else {
        setShowWarning(true);
      }
    }
  };

  return (
    <div className="raise_form_drop_area">
      <input
        className={
          showWarning
            ? "raise_form_drop_area_input_warning"
            : "raise_form_drop_area_input"
        }
        ref={inputRef}
        type="text"
        name="documents"
        placeholder="https://docs.google.com/document/......."
      />
      {showWarning && (
        <p className="input_text_warning">
          Example https://docs.google.com/document/
        </p>
      )}
      <ButtonStyled
        colorStyle="dark-green"
        className="raise_form_drop_area_button"
        type="submit"
        onClick={addFiles}
      >
        {t("raisePage.form4.add_document_button")}
      </ButtonStyled>
    </div>
  );
};

export default UploadComponent;
