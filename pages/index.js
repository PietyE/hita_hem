import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { END } from "redux-saga";
import { wrapper } from "redux/store";

import { getIsSignInUserSelector } from "redux/reducers/user";
import { getIsFetchingHomePageSelector } from "redux/reducers/homePage";
import { getHomePage } from "redux/actions/homePage";

import TopSlider from "containers/HomePage/TopSlider";
import FeaturedCampaigns from "containers/HomePage/FeaturedCampaigns";
import UpcomingCampaigns from "containers/HomePage/UpcomingCampaigns";
import {getSeoSelector} from "redux/reducers/homePage";
import SpinnerStyled from "components/ui/Spinner";
import useDropInBlog from "../customHooks/useDropInBlog";
import MetaTags from "../components/MetaTags";

const InstructionSection = dynamic(() => import("containers/HomePage/InstructionSection"), {
    ssr: false,
});
const JoinSection = dynamic(() => import("containers/HomePage/JoinSection"), {
    ssr: false,
});


const Index = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsSignInUserSelector);
  const isFetching = useSelector(getIsFetchingHomePageSelector);
    const seo = useSelector(getSeoSelector);
    useDropInBlog()

    const _getHomePage = useCallback(
    (id) => {
      dispatch(getHomePage(id));
    },
    [dispatch]
  );

  useEffect(() => {
    _getHomePage();
  }, []);

  return (
      <>
              <MetaTags seo={seo}/>
    <div className="home_page_container">
      {isFetching && <SpinnerStyled />}
      <div className="home_page_container">

          <TopSlider />

          <FeaturedCampaigns />
        <UpcomingCampaigns />
        <InstructionSection />
        {!isAuth && <JoinSection />}
          {/*<div id="dib-specific-posts"></div>*/}
          <div id="dib-recent-posts"></div>
      </div>
    </div>
          </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      store.dispatch(getHomePage());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Index;
