import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import { wrapper } from "/redux/store";

import InvestTopSlider from "containers/InvestmentOpportunitiesPage/InvestTopSlider";
import CampaignsListSection from "containers/InvestmentOpportunitiesPage/CampaignsListSection";
import SpinnerStyled from "components/ui/Spinner";
import { getIsFetchingCampaignsSelector } from "redux/reducers/companies";

import {
  getCompaniesList,
  getCompaniesHeaderList,
} from "redux/actions/companies";

const InvestmentOpportunitiesPage = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetchingCampaignsSelector);

  const _getCompaniesHeaderList = useCallback(() => {
    dispatch(getCompaniesHeaderList());
  }, [dispatch]);

  useEffect(() => {
    _getCompaniesHeaderList();
  }, []);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <InvestTopSlider />
      <CampaignsListSection />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      store.dispatch(getCompaniesHeaderList());
      store.dispatch(END);
      store.dispatch(getCompaniesList());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default InvestmentOpportunitiesPage;
