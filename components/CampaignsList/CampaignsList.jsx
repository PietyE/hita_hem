import React from "react";
import CampaignsCard from "../CampaignsCard";

const CampaignsList = ({ content, className }) => {
  return (
    <ul className={`campaigns_list ${className}`}>
      {content?.map((el) => (
        <CampaignsCard key={el?.id} content={el} className="campaigns_card" />
      ))}
    </ul>
  );
};

export default CampaignsList;
