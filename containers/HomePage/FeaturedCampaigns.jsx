import React from "react";
import Campaigns from "./Campaigns";
import SplitLine from "components/ui/SplitLine";
import { useTranslation } from "react-i18next";

const FeaturedCampaigns = () => {
  const { t } = useTranslation();

  return (
    <>
      <Campaigns
        title={t("home_page.featured_campaigns")}
        type="featured"
        buttonText={t("home_page.featured_button")}
      />
      <SplitLine className="featured_split_line" />
    </>
  );
};

export default FeaturedCampaigns;
