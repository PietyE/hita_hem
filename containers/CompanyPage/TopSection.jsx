import React from "react";
import { useSelector } from "react-redux";

import StatusCompanyBadge from "components/StatusCompany";
import {
  getHeaderImageSelector,
  getHeaderTitleSelector,
  getCompanyStatusSelector,
    getPercentageSelector,
} from "redux/reducers/companies";
import Image from "next/image";
import {checkCurrentResolution, getCorrectImage} from "../../utils/utils";

const TopSection = () => {
  const images = useSelector(getHeaderImageSelector) || [];

  const title = useSelector(getHeaderTitleSelector);
  const status = useSelector(getCompanyStatusSelector) || "";
  const percentage = useSelector(getPercentageSelector) || ''
    const screenSize = checkCurrentResolution()
    const img = getCorrectImage(images)

  return (
    <div className="company_top_section_container" style={{  position: 'relative'}}>
        {screenSize === 'desktop' && img &&
        (<Image
            src = {img}
            layout = "fill"
            objectFit = "cover"
            priority = {true}
            className="company_top_section_foto"
            alt = {img ? 'company photo' : ' '}
        />)}
        {screenSize === 'laptop' && img &&
        (<Image
            src = {img}
            layout = "fill"
            objectFit = "cover"
            priority = {true}
            className="company_top_section_foto"
            alt = {img ? 'company photo' : ' '}
        />)}
        {screenSize === 'mobile' && img &&
        (<Image
            src = {img}
            layout = "fill"
            objectFit = "cover"
            priority = {true}
            className="company_top_section_foto"
            alt = {img ? 'company photo' : ' '}
        />)}

        <div className='company_top_content_container'>
            <StatusCompanyBadge
             status={status}
             percentage={percentage}
             classNameContainer="company_top_section_status"
             />
            <h1 className="company_top_section_title">{title}</h1>
        </div>
    </div>
  );
};

export default TopSection;
