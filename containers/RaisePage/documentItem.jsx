import React from "react";
import Image from "next/image";
import iconDocument from "public/images/raise_document.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DocumentItem = ({ data, setFieldValue, values }) => {
  const removeDocument = (e) => {
    setFieldValue(
      "documents",
      values.documents.filter((el) => el !== e.target.dataset.name)
    );
  };
  return (
    <li className="raise_form_file">
      <Image
        src={iconDocument}
        alt="document_icon"
        className="raise_form_document_icon"
      />
      <span className="raise_form_file_text">{data}</span>
      <div
        data-name={data}
        className="form_file_delete"
        onClick={removeDocument}
      >
        <FontAwesomeIcon icon={faTimes} className="form_file_delete_icon" />
      </div>
    </li>
  );
};

export default DocumentItem;
