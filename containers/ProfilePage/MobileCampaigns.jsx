import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getSelectedLangSelector } from "redux/reducers/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MobileCampaigns = ({ data }) => {
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
          data?.map((campaign, index) => {
            const dataOptions = {
              day: "numeric",
              month: "short",
              year: "numeric",
            };
            const _startDayLocal = new Date(campaign.start_date).toLocaleString(
              currentLanguage,
              dataOptions
            );
            const _endDayLocal = new Date(campaign.start_date).toLocaleString(
              currentLanguage,
              dataOptions
            );

            let _link;
            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
              _link = `https://dev.accumeo.com/company/${campaign.id}`;
            }
            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
              _link = `https://stage.accumeo.com/company/${campaign.id}`;
            }
            if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
              _link = `https://prod.accumeo.com/company/${campaign.id}`;
            }
            let _status;
            if (campaign.status === 3) {
              _status = "Live";
            }
            if (campaign.status === 4) {
              _status = "Closed";
            }
            if (campaign.status === 1) {
              _status = "Upcoming";
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
                    {campaign.name}
                  </span>
                  <span className="tab_accordion_chevron">
                    <FontAwesomeIcon
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
                        {t("profile_page.campaigns.link")}
                      </span>
                      <a href={_link} className="mobile_investments_field_link">
                        {_link}
                      </a>
                    </p>
                    <p className="mobile_investments_field mobile_investments_amount">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.start_date")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {_startDayLocal}
                      </span>
                    </p>
                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.end_date")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {_endDayLocal}
                      </span>
                    </p>
                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.status")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {_status}
                      </span>
                    </p>
                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.raised")}
                      </span>
                      <span className="mobile_investments_field_values">
                        {campaign.goal_currency} {campaign.goal}
                      </span>
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>
    </>
  );
};

export default MobileCampaigns;
