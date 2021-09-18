import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "redux/store";

import { isSignInUserSelector } from "redux/reducers/user";
import { getIsFetchingHomePageSelector } from "redux/reducers/homePage";
import { getHomePage } from "redux/actions/homePage";

import TopSlider from "containers/HomePage/TopSlider";
import FeaturedCampaigns from "containers/HomePage/FeaturedCampaigns";
import UpcomingCampaigns from "containers/HomePage/UpcomingCampaigns";
import InstructionSection from "containers/HomePage/InstructionSection";
import JoinSection from "containers/HomePage/JoinSection";
import SpinnerStyled from "components/ui/Spinner";

const Index = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isSignInUserSelector);
  const isFetching = useSelector(getIsFetchingHomePageSelector);

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
    <div className="home_page_container">
      {isFetching && <SpinnerStyled />}
      <div className="home_page_container">
        <TopSlider />
        <FeaturedCampaigns />
        <UpcomingCampaigns />
        <InstructionSection />
        {!isAuth && <JoinSection />}
      </div>
    </div>
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
