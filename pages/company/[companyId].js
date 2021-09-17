import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import TopSection from "containers/CompanyPage/TopSection";
import CompanyInfo from "containers/CompanyPage/CompanyInfo";
import ProjectInfo from "containers/CompanyPage/ProjectInfo";
import MiddleSection from "containers/CompanyPage/MiddleSection";
import SpinnerStyled from "components/ui/Spinner";
import {
  getCompanyById,
  clearCompany,
  setError404,
  resetCompanyTab,
} from "redux/actions/companies";
import { isSignInUserSelector } from "redux/reducers/user";
import {
  getIsError404Selector,
  getIsFetchingCampaignsSelector,
} from "redux/reducers/companies";

const CompanyPage = () => {
  const router = useRouter();

  const companyId = router?.query?.companyId;

  const dispatch = useDispatch();
  const isAuth = useSelector(isSignInUserSelector);
  const isError404 = useSelector(getIsError404Selector);
  const isFetching = useSelector(getIsFetchingCampaignsSelector);

  const _getCompanyDetail = useCallback(
    (id) => {
      dispatch(getCompanyById(id));
    },
    [dispatch]
  );

  const _clearCompanyDetail = useCallback(() => {
    dispatch(clearCompany());
  }, [dispatch]);

  const _resetCompanyTab = useCallback(() => {
    dispatch(resetCompanyTab());
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
    if (companyId) {
      _getCompanyDetail(companyId); /////// id need to get after transfer to this page
    }

    return () => {
      _clearCompanyDetail();
      _resetCompanyTab();
    };
  }, [_clearCompanyDetail, _getCompanyDetail, companyId, _resetCompanyTab]);

  useEffect(() => {
    if (companyId) {
      _getCompanyDetail(companyId);
    }
  }, [isAuth, _getCompanyDetail, companyId]);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <div className="company-page-container">
        <TopSection />
        <CompanyInfo />
        <ProjectInfo isAuth={isAuth} />
        <MiddleSection isAuth={isAuth} />
      </div>
    </>
  );
};

export default CompanyPage;
