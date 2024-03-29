import React, { useCallback } from "react";
import {useDispatch, useSelector} from "react-redux";

import Link from "next/link";
import CampaignsList from "components/CampaignsList";
import Button from "components/ui/Button";
import { INVEST_ROUTE } from "constants/routesConstant";
import { setFilter } from "redux/actions/companies";
import {getHomePageFutureSelector, getHomePageUpcomingSelector} from "redux/reducers/homePage";

import isEqual from "lodash/isEqual";

const Campaigns = ({ title, type, buttonText }) => {
  const dispatch = useDispatch();

  const _setFilter = useCallback(
    (data) => {
      dispatch(setFilter(data));
    },
    [dispatch]
  );

    const homePageFuture = useSelector(getHomePageFutureSelector, isEqual) || [];
    const homePageUpcoming = useSelector(getHomePageUpcomingSelector, isEqual) || [];
    let content = [];
    switch (type) {
        case "featured":
            content = homePageFuture;
            break;
        case "upcoming":
            content = homePageUpcoming;
            break;
        default:
            return;
    }

  const handleUpcomingButtonClick = () => {
    if (type === "upcoming") {
      _setFilter([1]);
    }
      if (type === "featured") {
          _setFilter([]);
      }
  };
  return (
      <>{ !!content?.length &&
         ( <section className="campaigns_container">
              <h2 className="campaigns_title">{title}</h2>
              <CampaignsList type={type} content={content} />
              <Link href={INVEST_ROUTE} prefetch={false}>
                  <a>
                      <Button
                          colorStyle="dark-blue"
                          className="campaigns_button"
                          onClick={handleUpcomingButtonClick}
                      >
                          {buttonText.toUpperCase()}
                      </Button>
                  </a>
              </Link>
          </section> )
      }
      </>

  );
};

export default Campaigns;
