import React, {useRef, useState} from "react";
import {
    AccordionComponent,
    AccordionCollapse,
    AccordionToggle,
    CardComponent,
    CardBody,
    CardHeader,
} from "../AccordionComponent";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import IconComponent from "components/ui/IconComponent";

import Image from "next/image";

import Overview from "containers/CompanyPage/Overview";
import Idea from "containers/CompanyPage/Idea";
import Team from "containers/CompanyPage/Team";
import FinancialInformation from "containers/CompanyPage/FinancialInformation";
import Faq from "containers/CompanyPage/Faq";
import CampaignTabSignUp from "containers/CompanyPage/CampaignTabSignUp";
import CampaignTabQuizRequest from "../../../containers/CompanyPage/CampaignTabQuizRequest";
import iconLight from "public/images/light_bulb.svg";
import iconTeam from "public/images/users.svg";
import iconChart from "public/images/chart.svg";
import iconComments from "public/images/comments.svg";

function TabAccordion({ isAuth, isQuizPassed, status }) {
  const { t } = useTranslation();
  const overviewRef = useRef();


    const [activeTab, setActiveTab] = useState('0');

    const renderTabIFauts = (Сomponent) => {
        if (!isAuth) {
            return <CampaignTabSignUp/>
        } else {
            if (!isQuizPassed) {
                return <CampaignTabQuizRequest/>
            } else {
                return <Сomponent/>
            }
        }
    };

    const handleTabClick = (e) => {
        if (activeTab === e.target.dataset.value) {
            setActiveTab(null);
            return;
        }
        setActiveTab(e.target.dataset.value);
        if (Number(e.target.dataset.value) !== 0) {

      overviewRef.current.scrollIntoView();
      const scrolled = window.scrollY

      if(status === 1){
        window.scrollTo({top: scrolled - 80})

      }else{
        window.scrollTo({top: scrolled - 160})

        }
    };
    return (
        <>
            <AccordionComponent defaultActiveKey="0">
                <CardComponent className="tab_accordion_item">
                    <AccordionToggle
                        as={CardHeader}
                        eventKey="0"
                        data-value="0"
                        className="tab_accordion_item_header"
                        onClick={handleTabClick}

                    >
            <span ref={overviewRef} className="tab_accordion_icon">
              <Image src={iconLight} alt={iconLight ? 'idea icon' : ' '}/>
            </span>
                        {t("tab_accordion.OVERVIEW")}
                        <span className="tab_accordion_chevron">
              <IconComponent
                  icon={activeTab === "0" ? faChevronDown : faChevronRight}
              />
            </span>
                    </AccordionToggle>
                    <AccordionCollapse eventKey="0" className="accordion_content">
                        <CardBody>
                            <Overview/>
                        </CardBody>
                    </AccordionCollapse>
                </CardComponent>
                <CardComponent className="tab_accordion_item">
                    <AccordionToggle
                        as={CardHeader}
                        eventKey="1"
                        data-value="1"
                        className="tab_accordion_item_header"
                        onClick={handleTabClick}
                    >
            <span className="tab_accordion_icon">
              <Image src={iconLight} alt={iconLight ? 'idea icon' : ' '}/>
            </span>
                        {t("tab_accordion.Idea")}
                        <span className="tab_accordion_chevron">
              <IconComponent
                  icon={activeTab === "1" ? faChevronDown : faChevronRight}
              />
            </span>
                    </AccordionToggle>
                    <AccordionCollapse eventKey="1" className="accordion_content">
                        <CardBody>
                            {renderTabIFauts(Idea)}
                        </CardBody>
                    </AccordionCollapse>
                </CardComponent>
                <CardComponent className="tab_accordion_item">
                    <AccordionToggle
                        as={CardHeader}
                        eventKey="2"
                        data-value="2"
                        className="tab_accordion_item_header"
                        onClick={handleTabClick}
                    >
            <span className="tab_accordion_icon">
              <Image src={iconTeam} alt={iconTeam ? 'team icon' : ' '}/>
            </span>
                        {t("tab_accordion.Team")}
                        <span className="tab_accordion_chevron">
              <IconComponent
                  icon={activeTab === "2" ? faChevronDown : faChevronRight}
              />
            </span>
                    </AccordionToggle>
                    <AccordionCollapse eventKey="2" className="accordion_content">
                        <CardBody className="accordion_content">
                            {renderTabIFauts(Team)}
                        </CardBody>
                    </AccordionCollapse>
                </CardComponent>
                <CardComponent className="tab_accordion_item">
                    <AccordionToggle
                        as={CardHeader}
                        eventKey="3"
                        data-value="3"
                        className="tab_accordion_item_header"
                        onClick={handleTabClick}
                    >
            <span className="tab_accordion_icon">
              <Image src={iconChart} alt={iconChart ? 'chart icon' : ' '}/>
            </span>
                        {t("tab_accordion.Financial_information")}
                        <span className="tab_accordion_chevron">
              <IconComponent
                  icon={activeTab === "3" ? faChevronDown : faChevronRight}
              />
            </span>
                    </AccordionToggle>
                    <AccordionCollapse eventKey="3" className="accordion_content">
                        <CardBody className="accordion_content">
                            {renderTabIFauts(FinancialInformation)}
                        </CardBody>
                    </AccordionCollapse>
                </CardComponent>
                <CardComponent className="tab_accordion_item">
                    <AccordionToggle
                        as={CardHeader}
                        eventKey="4"
                        data-value="4"
                        className="tab_accordion_item_header"
                        onClick={handleTabClick}
                    >
            <span className="tab_accordion_icon">
              <Image src={iconComments} alt={iconComments ? 'comments icon' : ' '}/>
            </span>
                        {t("tab_accordion.FAQ")}
                        <span className="tab_accordion_chevron">
              <IconComponent
                  icon={activeTab === "4" ? faChevronDown : faChevronRight}
              />
            </span>
                    </AccordionToggle>
                    <AccordionCollapse eventKey="4" className="accordion_content">
                        <CardBody className="accordion_content">
                            {renderTabIFauts(Faq)}
                        </CardBody>
                    </AccordionCollapse>
                </CardComponent>
            </AccordionComponent>
        </>
    );
}

export default TabAccordion;
