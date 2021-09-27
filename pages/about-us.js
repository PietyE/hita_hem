import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import { wrapper } from "/redux/store";

import TopSection from "containers/AboutUsPage/TopSection";
import MiddleSection from "containers/AboutUsPage/MiddleSection";
import AboutTeamSection from "containers/AboutUsPage/AboutTeamSection";
import SubscrebeFormSection from "containers/AboutUsPage/SubscrebeFormSection";
import SpinnerStyled from "components/ui/Spinner";
import { getIsFetchingAboutUsSelector } from "redux/reducers/aboutUs";

import { getAboutUs } from "redux/actions/aboutUs";
import {
  getFlatBlocksSelector,
  getHeaderDescriptionSelector,
  getHeaderImageSelector,
  getHeaderTitleSelector,
  getSubscribeTitleSelector,
  getTeamMembersSelector,
} from "redux/reducers/aboutUs";

const AboutUsPage = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingAboutUsSelector);

  const header_image = useSelector(getHeaderImageSelector);
  const header_title = useSelector(getHeaderTitleSelector);
  const header_description = useSelector(getHeaderDescriptionSelector);
  const flat_blocks = useSelector(getFlatBlocksSelector);
  const team_members = useSelector(getTeamMembersSelector);
  const subscribe_title = useSelector(getSubscribeTitleSelector);

  const topSectionContent = {
    title: header_title,
    description: header_description,
    image: header_image,
  };

  useEffect(() => {
    dispatch(getAboutUs());
  }, []);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <div className="about_us_container">
        <TopSection content={topSectionContent} />
        <MiddleSection content={flat_blocks} />

        <AboutTeamSection content={team_members} />
        <SubscrebeFormSection
          content={subscribe_title}
        />
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      store.dispatch(getAboutUs());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default AboutUsPage;
