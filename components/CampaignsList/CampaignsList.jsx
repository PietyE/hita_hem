import React from 'react'
import { isEqual } from 'lodash'
import CampaignsCard from '../CampaignsCard'
import { useSelector } from 'react-redux'
import {
   getHomePageFutureSelector,
  getHomePageUpcomingSelector,
} from 'redux/reducers/homePage'
import {getCompanyListSelector} from 'redux/reducers/companies';

const CampaignsList = ({ type, className }) => {
  const homePageFuture= useSelector(getHomePageFutureSelector, isEqual) || []
  const homePageUpcoming= useSelector(getHomePageUpcomingSelector, isEqual) || []
  const companiesList = useSelector(getCompanyListSelector,isEqual) || []
  let content = []
  switch (type) {
    case 'featured':
      content = homePageFuture
      break
    case 'upcoming':
      content = homePageUpcoming
      break
    case 'invest':
      content = companiesList
      break
    default:
      return
  }
  return (
    <ul className={`campaigns_list ${className}`}>
      {content.map((el,i) => (
        <CampaignsCard key={i} content={el} className="campaigns_card" />
      ))}
    </ul>
  )
}

export default CampaignsList
