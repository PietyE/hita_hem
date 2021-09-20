import React from "react";
import TopSliderComponent from "components/TopSliderComponent";
import { useSelector } from "react-redux";
import { getInvestHeaderCompanyListSelector } from "redux/reducers/companies";
import isEqual from "lodash/isEqual";

const InvestTopSlider = () => {
  const investPageHeader =
    useSelector(getInvestHeaderCompanyListSelector, isEqual) || [];
  return (
    <section className="invest_opp_top_section">
      <TopSliderComponent
        data={investPageHeader}
        sectionClass="invest_opp_top_section"
        containerClass="invest_opp_top_container"
        itemTitleClass="invest_opp_top_title"
        itemDescriptionClass="invest_opp_top_description"
        statusClass="invest_opp_top_status"
        buttonsContainerClass="invest_opp_top_buttons_container"
      />
    </section>
  );
};

export default InvestTopSlider;
