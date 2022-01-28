import React from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
import TopSliderComponent from "components/TopSliderComponent";
import { getHomePageHeadersSelector } from "redux/reducers/homePage";

const TopSlider = () => {
  const homePageHeader = useSelector(getHomePageHeadersSelector, isEqual) || [];

  return (
      <TopSliderComponent
          data={homePageHeader}
          sectionClass='home_page_top_section'
          containerClass='home_page_top_container'
          itemTitleClass = 'home_page_top_title'
          itemDescriptionClass = 'home_page_top_description'
          statusClass = 'home_page_top_status'
          buttonsContainerClass='home_page_top_buttons_container'
          type='home_page'
      />
  )
}
export default TopSlider;
