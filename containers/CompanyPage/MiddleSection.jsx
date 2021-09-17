import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TabBar from "components/ui/TabBar";
import Idea from "./Idea";
import Team from "./Team";
import FinancialInformation from "./FinancialInformation";
import Faq from "./Faq";
import CampaignTabSignUp from "./CampaignTabSignUp";
import TabAccordion from "components/ui/TabAccordion";

import { companyTabConstants } from "constants/companyTabConstant";
import { setSelectedTab } from "redux/actions/companies";
import { getCompanyTabSelected } from "redux/reducers/companies";
import { useTranslation } from "react-i18next";

const MiddleSection = ({ isAuth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedTab = useSelector(getCompanyTabSelected);

  const _changeCompanuTab = useCallback(
    (key) => {
      dispatch(setSelectedTab(key));
    },
    [dispatch]
  );

  const renderTabIFauts = (Сomponent) => {
    return isAuth ? <Сomponent /> : <CampaignTabSignUp />;
  };

  const TabContent = () => {
    switch (selectedTab) {
      case companyTabConstants.IDEA:
        return <Idea />;
      case companyTabConstants.TEAM:
        return renderTabIFauts(Team);
      case companyTabConstants.FIN_INFO:
        return renderTabIFauts(FinancialInformation);
      case companyTabConstants.FAQ:
        return renderTabIFauts(Faq);
      default:
        return null;
    }
  };
  return (
    <div className="middle_section_container">
      <div className="middle_tabbr_container">
        <TabBar
          data={[
            { name: t("tab_accordion.Idea"), key: companyTabConstants.IDEA },
            { name: t("tab_accordion.Team"), key: companyTabConstants.TEAM },
            {
              name: t("tab_accordion.Financial_information"),
              key: companyTabConstants.FIN_INFO,
            },
            { name: t("tab_accordion.FAQ"), key: companyTabConstants.FAQ },
          ]}
          onClick={_changeCompanuTab}
          selectedKey={selectedTab}
          className="middle_tabbr"
        />
        <TabContent />
      </div>
      <div className="middle_mobile_tabbr_container">
        <TabAccordion isAuth={isAuth} />
      </div>
    </div>
  );
};

export default MiddleSection;
