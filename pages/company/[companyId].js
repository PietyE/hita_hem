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
import {
  getCompanyById,
  clearCompany,
  setError404,
  resetCompanyTab,
} from "redux/actions/companies";
import { getIsSignInUserSelector } from "redux/reducers/user";
import {
  getIsError404Selector,
  getIsFetchingCampaignsSelector,
} from "redux/reducers/companies";

const CompanyPage = () => {
  const router = useRouter();

  const companyId = router?.query?.companyId;

  if (typeof window !== "undefined") {
    alert(companyId);
  }

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsSignInUserSelector);
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
  }, [companyId]);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <div className="company-page-container">
        {/* <TopSection /> */}
        {/* <CompanyInfo />
        <ProjectInfo isAuth={isAuth} />
        <MiddleSection isAuth={isAuth} /> */}
      </div>
    </>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: ["/company/[companyId]"],
//     fallback: true,
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      // res.setHeader(
      //   "Cache-Control",
      //   "public, s-maxage=10, stale-while-revalidate=59"
      // );

      store.dispatch(getCompanyById(params.companyId));
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default CompanyPage;
