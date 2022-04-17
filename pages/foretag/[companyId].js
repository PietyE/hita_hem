import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {END} from "redux-saga";
import {wrapper} from "/redux/store";
import {useRouter} from "next/router";

import Schema from "../../components/Schema";
import MiddleSection from "containers/CompanyPage/MiddleSection";
import RecommendedCampaigns from "containers/CompanyPage/RecommendedCampaigns";
import SpinnerStyled from "components/ui/Spinner";
import MetaTags from "../../components/MetaTags";
import {
    getCompanyBySlag,
    clearCompany,
    setError404,
    resetCompanyTab, setRedirect,
} from "redux/actions/companies";
import {getIsSignInUserSelector} from "redux/reducers/user";
import {getCampaignDataForSchemaSelector, getCampaignSeoSelector} from "redux/reducers/companies";
import {
    getIsError404Selector,
    getIsFetchingCampaignsSelector,
    getIsRedirectOnSelector,
} from "redux/reducers/companies";


import makeCampaignSchema from "../../Schemas/campaignSchema";
const CompanyPage = () => {

    const router = useRouter();

    const companyName = router?.query?.companyId;

    const dispatch = useDispatch();
    const isAuth = useSelector(getIsSignInUserSelector);
    const isError404 = useSelector(getIsError404Selector);
    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const isRedirectOnSelector = useSelector(getIsRedirectOnSelector)
    const seo = useSelector(getCampaignSeoSelector)
  const dataForSchema = useSelector(getCampaignDataForSchemaSelector)


    const _getCompanyDetail = useCallback(
        (name) => {
            dispatch(getCompanyBySlag(name));
        },
        [dispatch]
    );

    const _clearCompanyDetail = useCallback(() => {
        dispatch(clearCompany());
    }, [dispatch]);

    const _resetCompanyTab = useCallback(() => {
        dispatch(resetCompanyTab());
    }, [dispatch]);

    const _resetRedirectIsOn = useCallback((data) => {
        dispatch(setRedirect(data));
    }, [dispatch]);

    const _clearError404 = useCallback(() => {
        dispatch(setError404(false));
    }, [dispatch]);

    useEffect(() => {
        if (isError404) {
            router.push("/NotFound");
        }
        return () => {
            _clearError404();
        };
    }, [_clearError404, isError404]);

    useEffect(() => {
        if (isRedirectOnSelector) {
            _resetRedirectIsOn(false)
            router.push("/404");

        }
    }, [isRedirectOnSelector])

    useEffect(() => {
        if (!isAuth) {
            const authLocalData = localStorage.getItem("auth_data")
            if (authLocalData) {
                const data = JSON.parse(authLocalData);
                const {expiration_timestamp, key: token} = data;
                const nowTime = Math.floor(new Date().getTime() / 1000);
                if (token && expiration_timestamp && nowTime < expiration_timestamp) {
                    return
                } else {
                    _getCompanyDetail(companyName)

                }
            } else {
                _getCompanyDetail(companyName)
            }
        } else {
            _getCompanyDetail(companyName)
        }

        return () => {
            _clearCompanyDetail();
            _resetCompanyTab();
        };
    }, [isAuth, companyName])

    return (
        <>
            <MetaTags seo={seo}/>
          <Schema makeSchema={makeCampaignSchema} data={dataForSchema}/>

          {isFetching && <SpinnerStyled/>}
            {!isError404 && <div className="company-page-container">
                <MiddleSection isAuth={isAuth}/>
                <RecommendedCampaigns/>
            </div>}
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req, res, params, ...etc}) => {
            store.dispatch(getCompanyBySlag(params.companyId));

            store.dispatch(END);

            await store.sagaTask.toPromise();
        }
);

export default CompanyPage;
