import React from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import TopSliderComponent from "components/TopSliderComponent";
import { getHomePageHeadersSelector } from "redux/reducers/homePage";

const TopSlider = () => {
  const homePageHeader = useSelector(getHomePageHeadersSelector, isEqual) || [];

  return <TopSliderComponent data={homePageHeader} />;
};
export default TopSlider;
