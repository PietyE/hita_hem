import React from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import Image from "next/image";

import FinArticle from "./FinArticle";
import IconDocument from "public/images/document_icon.svg";
import {
  getCompanyFinInfoSelector,
  getFinDocumentSelector,
} from "redux/reducers/companies";
import { useTranslation } from "react-i18next";

const FinancialInformation = () => {
  const { t } = useTranslation();

  const finInfo = useSelector(getCompanyFinInfoSelector, isEqual) || [];

  const document = useSelector(getFinDocumentSelector, isEqual) || [];

  return (
    <>
      <ul className="financial_info_articles_list">
        {finInfo.map((article, index) => (
          <FinArticle key={index} item={article} />
        ))}
      </ul>
      <div className="financial_info_documents">
        <h2 className="financial_info_documents_title">
          {t("company_page.documents")}
        </h2>
        <ul className="financial_info_documents_list">
          {document.map((document, index) => (
            <li key={index} className="fin_document">
              <Image
                src={IconDocument}
                alt="icon_document"
                className="fin_document_icon"
              />
              <a
                href={document.document}
                className="fin_document_link"
                target="_blank"
                rel="noreferrer"
              >
                {document.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FinancialInformation;
