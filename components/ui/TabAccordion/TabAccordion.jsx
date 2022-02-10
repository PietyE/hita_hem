import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import IconComponent from "components/ui/IconComponent";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import Idea from "containers/CompanyPage/Idea";
import Team from "containers/CompanyPage/Team";
import FinancialInformation from "containers/CompanyPage/FinancialInformation";
import Faq from "containers/CompanyPage/Faq";
import CampaignTabSignUp from "containers/CompanyPage/CampaignTabSignUp";
import iconLight from "public/images/light_bulb.svg";
import iconTeam from "public/images/users.svg";
import iconChart from "public/images/chart.svg";
import iconComments from "public/images/comments.svg";

function TabAccordion({ isAuth }) {
  const { t } = useTranslation();
  const ideaRef = useRef();

  const [activeTab, setActiveTab] = useState(null);

  const renderTabIFauts = (Сomponent) => {
    return isAuth ? <Сomponent /> : <CampaignTabSignUp />;
  };

  const handleTabClick = (e) => {
    if (activeTab === e.target.dataset.value) {
      setActiveTab(null);
      return;
    }
    setActiveTab(e.target.dataset.value);
    if (Number(e.target.dataset.value) !== 0) {
      ideaRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        // behavior: 'smooth',
      });
    }
  };
  return (
    <>
      <Accordion>
        <Card className="tab_accordion_item">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            data-value="0"
            className="tab_accordion_item_header"
            onClick={handleTabClick}
            ref={ideaRef}
          >
            <span className="tab_accordion_icon">
              <Image src={iconLight} alt={iconLight ? 'idea icon' : ' '} />
            </span>
            {t("tab_accordion.Idea")}
            <span className="tab_accordion_chevron">
              <IconComponent
                icon={activeTab === "0" ? faChevronDown : faChevronRight}
              />
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0" className="accordion_content">
            <Card.Body>
              <Idea />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="tab_accordion_item">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            data-value="1"
            className="tab_accordion_item_header"
            onClick={handleTabClick}
          >
            <span className="tab_accordion_icon">
              <Image src={iconTeam} alt={iconTeam ? 'team icon' : ' '} />
            </span>
            {t("tab_accordion.Team")}
            <span className="tab_accordion_chevron">
              <IconComponent
                icon={activeTab === "1" ? faChevronDown : faChevronRight}
              />
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1" className="accordion_content">
            <Card.Body className="accordion_content">
              {renderTabIFauts(Team)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="tab_accordion_item">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="2"
            data-value="2"
            className="tab_accordion_item_header"
            onClick={handleTabClick}
          >
            <span className="tab_accordion_icon">
              <Image src={iconChart} alt={iconChart ? 'chart icon' : ' '} />
            </span>
            {t("tab_accordion.Financial_information")}
            <span className="tab_accordion_chevron">
              <IconComponent
                icon={activeTab === "2" ? faChevronDown : faChevronRight}
              />
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2" className="accordion_content">
            <Card.Body className="accordion_content">
              {renderTabIFauts(FinancialInformation)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="tab_accordion_item">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="3"
            data-value="3"
            className="tab_accordion_item_header"
            onClick={handleTabClick}
          >
            <span className="tab_accordion_icon">
              <Image src={iconComments} alt={iconComments ? 'comments icon' : ' '} />
            </span>
            {t("tab_accordion.FAQ")}
            <span className="tab_accordion_chevron">
              <IconComponent
                icon={activeTab === "3" ? faChevronDown : faChevronRight}
              />
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3" className="accordion_content">
            <Card.Body className="accordion_content">
              {renderTabIFauts(Faq)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default TabAccordion;
