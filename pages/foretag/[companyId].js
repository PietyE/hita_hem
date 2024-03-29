import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {END} from "redux-saga";
import {wrapper} from "/redux/store";
import {useRouter} from "next/router";

import SeoComponent from "../../components/SeoComponent";
import MiddleSection from "containers/CompanyPage/MiddleSection";
import SpinnerStyled from "components/ui/Spinner";

import {
    getCompanyBySlag,
    clearCompany,
    setError404,
    resetCompanyTab, setRedirect,
} from "redux/actions/companies";
import {getIsSignInUserSelector, getQuizIsPassedSelector} from "redux/reducers/user";
import {getCampaignDataForSchemaSelector, getCampaignSeoSelector} from "redux/reducers/companies";
import {
    getIsError404Selector,
    getIsFetchingCampaignsSelector,
    getIsRedirectOnSelector,
} from "redux/reducers/companies";

import makeCampaignSchema from "../../Schemas/campaignSchema";
import dynamic from "next/dynamic";

const RecommendedCampaigns = dynamic(() => import("containers/CompanyPage/RecommendedCampaigns"), {
    ssr: false,
});

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
    const isQuizPassed = useSelector(getQuizIsPassedSelector)


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

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if((isAuth && isQuizPassed) || (isAuth && !isQuizPassed) || (!isAuth && !isQuizPassed)){
            if(!!companyName){
                _getCompanyDetail(companyName)
            }
        }


        // if (!isAuth) {
        //     if(!isQuizPassed){
        //         const authLocalData = localStorage.getItem("auth_data")
        //         if (authLocalData) {
        //             const data = JSON.parse(authLocalData);
        //             const {expiration_timestamp, key: token} = data;
        //             const nowTime = Math.floor(new Date().getTime() / 1000);
        //             if (token && expiration_timestamp && nowTime < expiration_timestamp) {
        //                 return
        //             } else {
        //                 _getCompanyDetail(companyName)
        //             }
        //         } else {
        //             _getCompanyDetail(companyName)
        //         }
        //     }
        // } else {
        //     _getCompanyDetail(companyName)
        // }

        return () => {
            _clearCompanyDetail();
            _resetCompanyTab();
        };
    }, [isAuth, companyName, isQuizPassed])

    return (
        <>
            <SeoComponent seo={seo}
                          url={`https://accumeo.com/foretag/${companyName}`}
                          makeSchema={makeCampaignSchema}
                          data={{campaign:dataForSchema, seo: seo?.mark_up}}
                          keyName='campaign'
            />

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
