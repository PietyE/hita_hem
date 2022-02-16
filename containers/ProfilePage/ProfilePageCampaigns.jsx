import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getUserCampaignsSelector } from "redux/reducers/user";
import { getSelectedLangSelector } from "redux/reducers/language";
import MobileCampaigns from "./MobileCampaigns";
import { useTranslation } from "react-i18next";
import {convertStatusToText, getUrlForMyCampaigns} from "utils/utils";
import startCase from "lodash/startCase";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {RAISE_ROUTE, RAISE_ROUTE_EN} from "../../constants/routesConstant";
import {useRouter} from "next/router";
import {setScrollToForm} from "../../redux/actions/raisePage";

const ProfilePageCampaigns = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const router = useRouter();
  const moneyFormat = useMoneyFormat()
  const currentLanguage = useSelector(getSelectedLangSelector);
  const campaignsList = useSelector(getUserCampaignsSelector);

  const _setScrollToForm = useCallback(
      (data) => {
        dispatch(setScrollToForm(data));
      },
      [dispatch]
  );

  const handleRedirectToRisePage = (e) => {
    e.preventDefault()
    router.push(currentLanguage === 'sv'?RAISE_ROUTE:RAISE_ROUTE_EN)
    _setScrollToForm(true)
  }
  return (
    <section className="profile_campaigns_section">
      <h2 className="profile_campaigns_title">
        {t("profile_page.campaigns.title")}
      </h2>
      <div className="profile_campaigns_table_container">
        <div className="profile_campaigns_table_header">
          <p className="profile_campaigns_table_header_text table_header_campaign_name">
            {t("profile_page.campaigns.name")}
          </p>
          <p className="profile_campaigns_table_header_text table_header_campaign_link">
            {t("profile_page.campaigns.link")}
          </p>
          <p className="profile_campaigns_table_header_text table_header_campaign_s_date">
            {t("profile_page.campaigns.start_date")}
          </p>
          <p className="profile_campaigns_table_header_text table_header_campaign_e_date">
            {t("profile_page.campaigns.end_date")}
          </p>
          <p className="profile_campaigns_table_header_text table_header_campaign_status">
            {t("profile_page.campaigns.status")}
          </p>
          <p className="profile_campaigns_table_header_text table_header_campaign_raised">
            {t("profile_page.campaigns.raised")}
          </p>
        </div>
        <ul className="profile_campaigns_list">
          {(!campaignsList || campaignsList?.length === 0 )&& (
              <p className='profile_campaigns_empty_list_text'>{t("profile_page.campaigns.empty_campaigns_list_text")}
                <a className='profile_campaigns_empty_list_link'
                   href='/'
                   onClick={handleRedirectToRisePage}
                >
                  {t("profile_page.campaigns.empty_campaigns_list_link")}
                </a>
              </p>
          )
          }
          {campaignsList?.length > 0 &&
            campaignsList?.map((campaign, index) => {
              const dataOptions = {
                day: "numeric",
                month: "short",
                year: "numeric",
              };
              const _startDayLocal = new Date(
                campaign.start_date
              ).toLocaleString(currentLanguage, dataOptions);
              const _endDayLocal = new Date(campaign.start_date).toLocaleString(
                currentLanguage,
                dataOptions
              );

              const {link, text_link} = getUrlForMyCampaigns(currentLanguage, campaign)

              let _status = startCase(
                convertStatusToText(campaign.status, currentLanguage).toLocaleLowerCase()
              );

              return (
                <li key={campaign.pk} className="profile_campaigns_item">
                  <p className="profile_campaigns_table_item_text table_item_campaign_name">
                    {index + 1}
                    {". "}
                    {campaign?.name}
                  </p>
                  <a
                    href={link}
                    className="profile_campaigns_table_item_text table_item_campaign_link"
                  >
                    {text_link}
                  </a>
                  <p className="profile_campaigns_table_item_text table_item_campaign_s_date">
                    {_startDayLocal}
                  </p>
                  <p className="profile_campaigns_table_item_text table_item_campaign_e_date">
                    {_endDayLocal}
                  </p>
                  <p className="profile_campaigns_table_item_text table_item_campaign_status">
                    {_status}
                  </p>
                  <p className="profile_campaigns_table_item_text table_item_campaign_raised">
                    {campaign?.invested_currency} {moneyFormat.format(campaign?.invested)}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <MobileCampaigns data={campaignsList} />
    </section>
  );
};

export default ProfilePageCampaigns;
