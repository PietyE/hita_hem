import React from "react";
import Campaigns from "./Campaigns";
import { useTranslation } from "react-i18next";

const UpcomingCampaigns = () => {
  const { t } = useTranslation();
  return (
    <Campaigns
      title={t("home_page.upcoming_campaigns")}
      type="upcoming"
      buttonText={t("home_page.upcoming_button")}
    />
  );
};

export default UpcomingCampaigns;
