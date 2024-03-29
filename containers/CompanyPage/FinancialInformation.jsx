import React from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
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
        <h2 className='team_title'>{t("tab_accordion.Financial_information")}</h2>
        <ul className="financial_info_articles_list">
        {finInfo.map((article, index) => (
          <FinArticle key={index} item={article} />
        ))}
      </ul>
        {!!document.length &&(<div className = "financial_info_documents">
            <h2 className = "financial_info_documents_title">
                {t("company_page.documents")}
            </h2>
            <ul className = "financial_info_documents_list">
                {document.map((document) => (
                    <li key = {document?.document} className = "fin_document">
                        <Image
                            src = {IconDocument}
                            alt = {IconDocument ? 'document icon' : ' '}
                            className = "fin_document"
                            loading='lazy'

                        />
                        <a
                            href = {document?.document}
                            className = "fin_document_link"
                            target = "_blank"
                            rel = "noreferrer"
                        >
                            {document?.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>)}
    </>
  );
};

export default FinancialInformation;
