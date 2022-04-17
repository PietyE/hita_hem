import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {END} from "redux-saga";

import {wrapper} from "/redux/store";
import Schema from "components/Schema";
import InvestTopSlider from "containers/InvestmentOpportunitiesPage/InvestTopSlider";
import CampaignsListSection from "containers/InvestmentOpportunitiesPage/CampaignsListSection";
import SpinnerStyled from "components/ui/Spinner";
import {getCompanyListSelector, getIsFetchingCampaignsSelector} from "redux/reducers/companies";

import {
    getCompaniesList,
    getCompaniesHeaderList,
} from "redux/actions/companies";

import makeInvestPageSchema from "../Schemas/investPageSchema";
import isEqual from "lodash/isEqual";

const InvestmentOpportunitiesPage = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const companiesList = useSelector(getCompanyListSelector, isEqual) || [];

    const _getCompaniesHeaderList = useCallback(() => {
        dispatch(getCompaniesHeaderList());
    }, [dispatch]);

    useEffect(() => {
        _getCompaniesHeaderList();
    }, []);

    return (
        <>
            <Schema makeSchema={makeInvestPageSchema} data={companiesList} />
            {isFetching && <SpinnerStyled/>}
            <InvestTopSlider/>
            <CampaignsListSection companiesList={companiesList}/>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req, res, ...etc}) => {
            // res.setHeader(
            //   "Cache-Control",
            //   "public, s-maxage=10, stale-while-revalidate=59"
            // );

            store.dispatch(getCompaniesHeaderList());
            store.dispatch(END);
            store.dispatch(getCompaniesList());
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
);

export default InvestmentOpportunitiesPage;
