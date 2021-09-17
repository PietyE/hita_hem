import React from 'react'
import { useSelector } from 'react-redux'

import StatusCompanyBadge from 'components/StatusCompany'
import {
  getHeaderImageSelector,
  getHeaderTitleSelector,
  getCompanyStatusSelector,
} from 'redux/reducers/companies'

const TopSection = () => {
  const imageUrl = useSelector(getHeaderImageSelector)
    const title = useSelector(getHeaderTitleSelector)
  const status = useSelector(getCompanyStatusSelector) || ''
  return (
    <div className="company_top_section_container">
      <img
        src={imageUrl}
        alt="company_foto"
        className="company_top_section_foto"
      />
      <StatusCompanyBadge
        status={status.toLocaleLowerCase()}
        classNameContainer="company_top_section_status"
      />
      <h1 className="company_top_section_title">{title}</h1>
    </div>
  )
}

export default TopSection
