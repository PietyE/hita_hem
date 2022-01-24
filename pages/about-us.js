import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import dynamic from "next/dynamic";

import { wrapper } from "/redux/store";

import TopSection from "containers/AboutUsPage/TopSection";
import MiddleSection from "containers/AboutUsPage/MiddleSection";
// import AboutTeamSection from "containers/AboutUsPage/AboutTeamSection";
// import SubscrebeFormSection from "containers/AboutUsPage/SubscrebeFormSection";
import SpinnerStyled from "components/ui/Spinner";
import { getIsFetchingAboutUsSelector } from "redux/reducers/aboutUs";

const SubscrebeFormSection = dynamic(() => import("containers/AboutUsPage/SubscrebeFormSection"), {
  ssr: false,
});
const AboutTeamSection = dynamic(() => import("containers/AboutUsPage/AboutTeamSection"), {
  ssr: false,
});
import { getAboutUs } from "redux/actions/aboutUs";
import {
  getFlatBlocksSelector,
  getHeaderDescriptionSelector,
  getHeaderImageSelector,
  getHeaderTitleSelector,
  getSubscribeTitleSelector,
  getTeamMembersSelector,
} from "redux/reducers/aboutUs";
import {getAboutUsSeoSelector} from "../redux/reducers/aboutUs";
import Head from "next/head";

const AboutUsPage = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingAboutUsSelector);

  const header_images = useSelector(getHeaderImageSelector);
  const header_title = useSelector(getHeaderTitleSelector);
  const header_description = useSelector(getHeaderDescriptionSelector);
  const flat_blocks = useSelector(getFlatBlocksSelector);
  const team_members = useSelector(getTeamMembersSelector);
  const subscribe_title = useSelector(getSubscribeTitleSelector);
  const seo = useSelector(getAboutUsSeoSelector)

  // const {seo_description, seo_title} = seo
  const seo_description = seo?.seo_description
  const seo_title = seo?.seo_title

  const topSectionContent = {
    title: header_title,
    description: header_description,
    images: header_images,
  };

  useEffect(() => {
    dispatch(getAboutUs());
  }, []);

  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {seo_description & <meta name = "description" content = {seo_description}/>}
        {seo?.social?.title && <meta property = "og:title" content = {seo?.social?.title}/>}

        {seo?.social?.description && <meta property = "og:description" content = {seo?.social?.description}/>}

        {seo?.social?.image && (
            <meta property="og:image" content= {seo?.social?.image} />

        )}
      </Head>
      {isFetching && <SpinnerStyled />}
      <div className="about_us_container">
        <TopSection content={topSectionContent} />
        <MiddleSection content={flat_blocks} />
        <AboutTeamSection content={team_members} />
        <SubscrebeFormSection content={subscribe_title} />
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
