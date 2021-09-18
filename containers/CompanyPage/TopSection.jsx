import React from "react";
import { useSelector } from "react-redux";

import StatusCompanyBadge from "components/StatusCompany";
import {
  getHeaderImageSelector,
  getHeaderTitleSelector,
  getCompanyStatusSelector,
  getHeaderImage1Selector,
} from "redux/reducers/companies";

const TopSection = () => {
  const imageUrlCorrenct = useSelector(getHeaderImageSelector);
  const imageUrl = useSelector(getHeaderImage1Selector);
  const title = useSelector(getHeaderTitleSelector);
  const status = useSelector(getCompanyStatusSelector) || "";

  const _src = imageUrlCorrenct || imageUrl;

  return (
    <div className="company_top_section_container">
      <img src={_src} alt="company_foto" className="company_top_section_foto" />
      <StatusCompanyBadge
        status={status.toLocaleLowerCase()}
        classNameContainer="company_top_section_status"
      />
      <h1 className="company_top_section_title">{title}</h1>
    </div>
  );
};

export default TopSection;
