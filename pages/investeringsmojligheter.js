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
import {getInvestPageSeo} from "../redux/actions/companies";
import MetaTags from "../components/MetaTags";

const InvestmentOpportunitiesPage = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const companiesList = useSelector(getCompanyListSelector, isEqual) || [];
    const seo = useSelector(getInvestPageSeo)
    const _getCompaniesHeaderListAndSeo = useCallback(() => {
        dispatch(getCompaniesHeaderList());
        dispatch(getInvestPageSeo());
    }, [dispatch]);

    useEffect(() => {
        _getCompaniesHeaderListAndSeo();
    }, []);

    return (
        <>
            <MetaTags seo={seo} url={'https://accumeo.com/investeringsmojligheter'}/>
            <Schema makeSchema={makeInvestPageSchema} data={{seo: seo?.mark_up, campaigns: companiesList}} keyName='invest-page' />
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
            store.dispatch(getInvestPageSeo());
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
);

export default InvestmentOpportunitiesPage;
