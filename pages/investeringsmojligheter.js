import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";

import {END} from "redux-saga";
import {wrapper} from "/redux/store";

import SeoComponent from "../components/SeoComponent";
import InvestTopSlider from "containers/InvestmentOpportunitiesPage/InvestTopSlider";
import CampaignsListSection from "containers/InvestmentOpportunitiesPage/CampaignsListSection";
import SpinnerStyled from "components/ui/Spinner";

import {getCompanyListSelector,getInvestPageSeoSelector, getIsFetchingCampaignsSelector} from "redux/reducers/companies";
import {getCompaniesList,getCompaniesHeaderList} from "redux/actions/companies";
import {
    getCompanyListSelector,
    getInvestPageSeoSelector,
    getIsFetchingCampaignsSelector
} from "redux/reducers/companies";

import {
    getCompaniesList,
    getCompaniesHeaderList,
} from "redux/actions/companies";

import makeInvestPageSchema from "../Schemas/investPageSchema";

import isEqual from "lodash/isEqual";
import {getInvestPageSeo} from "../redux/actions/companies";

const InvestmentOpportunitiesPage = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const companiesList = useSelector(getCompanyListSelector, isEqual) || [];
    const seo = useSelector(getInvestPageSeoSelector)
    const _getCompaniesHeaderListAndSeo = useCallback(() => {
        dispatch(getCompaniesHeaderList());
        dispatch(getInvestPageSeo());
    }, [dispatch]);

    useEffect(() => {
        _getCompaniesHeaderListAndSeo();
    }, []);

    return (
        <>
            <SeoComponent seo={seo}
                          url={'https://accumeo.com/investeringsmojligheter'}
                          makeSchema={makeInvestPageSchema}
                          data={{seo: seo?.mark_up, campaigns: companiesList}}
                          keyName='invest-page'
            />
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
