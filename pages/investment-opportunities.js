import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import { wrapper } from "/redux/store";

import InvestTopSlider from "containers/InvestmentOpportunitiesPage/InvestTopSlider";
import CampaignsListSection from "containers/InvestmentOpportunitiesPage/CampaignsListSection";
import SpinnerStyled from "components/ui/Spinner";
import { getIsFetchingCampaignsSelector } from "redux/reducers/companies";

const InvestmentOpportunitiesPage = () => {
  const isFetching = useSelector(getIsFetchingCampaignsSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <InvestTopSlider />
      <CampaignsListSection />
    </>
  );
};

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req, res, ...etc }) => {
//       // store.dispatch(getAboutUs());
//       // store.dispatch(END);
//       // await store.sagaTask.toPromise();
//     }
// );

export default InvestmentOpportunitiesPage;
