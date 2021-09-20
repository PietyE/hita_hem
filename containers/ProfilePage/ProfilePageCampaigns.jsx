import React from "react";
import { useSelector } from "react-redux";
import { getUserCampaignsSelector } from "redux/reducers/user";
import { getSelectedLangSelector } from "redux/reducers/language";
import MobileCampaigns from "./MobileCampaigns";
import { useTranslation } from "react-i18next";
import { convertStatusToText } from "utils/utils";
import startCase from "lodash/startCase";

const ProfilePageCampaigns = () => {
  const { t } = useTranslation();

  const currentLanguage = useSelector(getSelectedLangSelector);

  const campaignsList = useSelector(getUserCampaignsSelector);
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

              let _link;
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
                _link = `https://dev.accumeo.com/company/${campaign.id}`;
              }
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
                _link = `https://stage.accumeo.com/company/${campaign.id}`;
              }
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
                _link = `https://prod.accumeo.com/company/${campaign.id}`;
              }
              let _status = startCase(
                convertStatusToText(campaign.status).toLocaleLowerCase()
              );

              return (
                <li key={campaign.id} className="profile_campaigns_item">
                  <p className="profile_campaigns_table_item_text table_item_campaign_name">
                    {index + 1}
                    {". "}
                    {campaign?.name}
                  </p>
                  <a
                    href={_link}
                    className="profile_campaigns_table_item_text table_item_campaign_link"
                  >
                    {_link}
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
                    {campaign?.invested_currency} {campaign?.invested}
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
