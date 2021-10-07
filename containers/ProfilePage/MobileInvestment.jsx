import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "components/ui/Button";
import IconComponent from "components/ui/IconComponent";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "redux/reducers/language";

const MobileInvestment = ({ data }) => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(getSelectedLangSelector);

  const [activeTab, setActiveTab] = useState(null);
  const handleTabClick = (e) => {
    if (activeTab === e.target.dataset.value) {
      setActiveTab(null);
      return;
    }
    setActiveTab(e.target.dataset.value);
  };
  return (
    <>
      <Accordion className="mobile_investments_container">
        {data?.length > 0 &&
          data?.map((payment, index) => {
            let _link;
            let textLink;

            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
              _link = currentLanguage === 'en'?`https://dev.accumeo.com/company/${payment.company_id}`:`https://dev.accumeo.com/sv/company/${payment.company_id}`
              textLink = `https://accumeo.com/company/${payment.company_id}`;
            }
            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
              _link = currentLanguage === 'en'?`https://stage.accumeo.com/company/${payment.company_id}`:`https://stage.accumeo.com/sv/company/${payment.company_id}`
              textLink = `https://accumeo.com/company/${payment.company_id}`;
            }
            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
              _link = currentLanguage === 'en'?`https://preprod.accumeo.com/company/${payment.company_id}`:`https://preprod.accumeo.com/sv/company/${payment.company_id}`
              textLink = `https://accumeo.com/company/${payment.company_id}`;
            }
            return (
              <Card key={index} className="mobile_investments_card">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={index + 1}
                  data-value={index + 1}
                  onClick={handleTabClick}
                  className="mobile_investments_toggle"
                >
                  <span className="mobile_investments_toggle_name">
                    {index + 1}
                    {". "}
                    {payment.company_name}
                  </span>
                  <span className="tab_accordion_chevron">
                    <IconComponent
                      icon={
                        Number(activeTab) === index + 1
                          ? faChevronDown
                          : faChevronRight
                      }
                    />
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index + 1}>
                  <Card.Body className="mobile_investments_item">
                    <p className="mobile_investments_field mobile_investments_item_link">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.investments.link")}
                      </span>
                      <a href={_link} className="mobile_investments_field_link">
                        {textLink}
                      </a>
                    </p>
                    <p className="mobile_investments_field mobile_investments_amount">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.investments.amount")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {payment.amount_currency} {payment.amount}
                      </span>
                    </p>
                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.investments.shares")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {payment.shares}
                      </span>
                    </p>
                    <div className="mobile_investments_field mobile_investments_contact">
                      <a href={"mailto:" + payment.company_owner_email}>
                        <Button
                          colorStyle="dark-green"
                          className="mobile_investments_item_button"
                        >
                          {t("profile_page.investments.button")}
                        </Button>
                      </a>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>
    </>
  );
};

export default MobileInvestment;
