import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";
import CampaignsList from "components/CampaignsList";
import Button from "components/ui/Button";
import { INVEST_ROUTE } from "constants/routesConstant";
import { setFilter } from "redux/actions/companies";

const Campaigns = ({ title, type, buttonText }) => {
  const dispatch = useDispatch();

  const _setFilter = useCallback(
    (data) => {
      dispatch(setFilter(data));
    },
    [dispatch]
  );
  const handleUpcomingButtonClick = () => {
    if (type === "upcoming") {
      _setFilter(1);
    }
  };
  return (
    <section className="campaigns_container">
      <h2 className="campaigns_title">{title}</h2>
      <CampaignsList type={type} />
      <Link href={INVEST_ROUTE} prefetch={false}>
        <a>
          <Button
            colorStyle="dark-green"
            className="campaigns_button"
            onClick={handleUpcomingButtonClick}
          >
            {buttonText}
          </Button>
        </a>
      </Link>
    </section>
  );
};

export default Campaigns;
