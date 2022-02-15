import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "/redux/store";
import { useRouter } from "next/router";

import TopSection from "containers/CompanyPage/TopSection";
import CompanyInfo from "containers/CompanyPage/CompanyInfo";
import ProjectInfo from "containers/CompanyPage/ProjectInfo";
import MiddleSection from "containers/CompanyPage/MiddleSection";
import SpinnerStyled from "components/ui/Spinner";
import MetaTags from "../../components/MetaTags";
import {
  getCompanyBySlag,
    getCompanyByName,
  clearCompany,
  setError404,
  resetCompanyTab, setRedirect,
} from "redux/actions/companies";
import { getIsSignInUserSelector } from "redux/reducers/user";
import {
  getIsError404Selector,
  getIsFetchingCampaignsSelector,
  getIsRedirectOnSelector,
} from "redux/reducers/companies";
import {getCampaignSeoSelector} from "../../redux/reducers/companies";

const CompanyPage = () => {

  const router = useRouter();

  // const companyId = router?.query?.companyId;
  const companyName = router?.query?.companyId;

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsSignInUserSelector);
  const isError404 = useSelector(getIsError404Selector);
  const isFetching = useSelector(getIsFetchingCampaignsSelector);
  const isRedirectOnSelector = useSelector(getIsRedirectOnSelector)
  const seo = useSelector(getCampaignSeoSelector)


  const _getCompanyDetail = useCallback(
    (name) => {
      dispatch(getCompanyBySlag(name));
    },
    [dispatch]
  );


  // const _getCompanyDetail = useCallback(
  //   (name) => {
  //     dispatch(getCompanyByName(name));
  //   },
  //   [dispatch]
  // );

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

  useEffect(()=>{
    if(isRedirectOnSelector){
      _resetRedirectIsOn(false)
        router.push("/404");

    }
  },[isRedirectOnSelector])

  useEffect(()=>{
    // _getCompanyDetail(companyId)
    _getCompanyDetail(companyName)

    return () => {
      _clearCompanyDetail();
      _resetCompanyTab();
    };
  // },[isAuth,companyId])
  },[isAuth,companyName])

  return (
    <>
       <MetaTags seo={seo}/>
      {isFetching && <SpinnerStyled />}
      { !isError404 && <div className = "company-page-container">
        <TopSection/>
        <CompanyInfo/>
        <ProjectInfo isAuth = {isAuth}/>
        <MiddleSection isAuth = {isAuth}/>
      </div>}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(

    (store) =>
        async ({ req, res, params, ...etc }) => {
          store.dispatch( getCompanyBySlag(params.companyId));

          store.dispatch(END);

          await store.sagaTask.toPromise();
        }

);

export default CompanyPage;
