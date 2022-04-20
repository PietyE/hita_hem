import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {END} from "redux-saga";
import {useRouter} from "next/router";

import {wrapper} from "/redux/store";
import Schema from "components/Schema";
import InvestTopSlider from "containers/InvestmentOpportunitiesPage/InvestTopSlider";
import CampaignsListSection from "containers/InvestmentOpportunitiesPage/CampaignsListSection";
import SpinnerStyled from "components/ui/Spinner";
import {
    getCompanyListSelector,
    getIsFetchingCampaignsSelector,
    getListOfFoundCampaignsSelector
} from "redux/reducers/companies";

import {
    getCompaniesList,
    getCompaniesHeaderList,

} from "redux/actions/companies";

import makeInvestPageSchema from "../Schemas/investPageSchema";
import isEqual from "lodash/isEqual";

const InvestmentOpportunitiesPage = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const querySearch = router?.query?.search

    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const companiesList = useSelector(querySearch ? getListOfFoundCampaignsSelector : getCompanyListSelector, isEqual) || [];

    useEffect(() => {
        _getCompaniesHeaderList();
    }, []);


    const _getCompaniesHeaderList = useCallback(() => {
        dispatch(getCompaniesHeaderList());
    }, [dispatch]);

    return (
        <>
            <Schema makeSchema={makeInvestPageSchema} data={companiesList}/>
            {isFetching && <SpinnerStyled/>}
            {!querySearch && <InvestTopSlider/>}
            <CampaignsListSection companiesList={companiesList} isFetching={isFetching}/>
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
