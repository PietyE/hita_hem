import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "redux/store";
import Image from "next/image";
import dynamic from "next/dynamic";
// import ImageComponent from "components/ui/ImageComponent";


import RaisePageTopSlider from "containers/RaisePage/RaisePageTopSlider";
import RaiseOpportunities from "containers/RaisePage/RaiseOpportunities";
import RaiseAdvantages from "containers/RaisePage/RaiseAdvantages";
// import RaiseFeatures from "containers/RaisePage/RaiseFeatures";
// import RaiseForm from "containers/RaisePage/RaiseForm";
import SpinnerStyled from "components/ui/Spinner";

import { getRaisePage } from "redux/actions/raisePage";
import {
    getIsFetchingRaisePageSelector,
    getRaisePageImageSelector,
    getRaisePageSeoSelector
} from "redux/reducers/raisePage";
import {getCorrectImage} from "../utils/utils";
import Head from "next/head";


const RaiseForm = dynamic(() => import("containers/RaisePage/RaiseForm"), {
    ssr: false,
});
const RaiseFeatures = dynamic(() => import("containers/RaisePage/RaiseFeatures"), {
    ssr: false,
});

const RaisePage = () => {
  const myRef = useRef(null);
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingRaisePageSelector);
  const images = useSelector(getRaisePageImageSelector)
    const seo = useSelector(getRaisePageSeoSelector)
    const {seo_description, seo_title} = seo

    const img = getCorrectImage(images)
    const _getRaisePage = useCallback(() => {
    dispatch(getRaisePage());
  }, [dispatch]);

  const scrollTo = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView();
  };

  useEffect(() => {
    _getRaisePage();
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
      <section className="raise_page_container">
        <RaisePageTopSlider onScrollTo={scrollTo} />
        <RaiseOpportunities />
        {/*{img && <ImageComponent src = {img} className = 'raise_page_image'/>}*/}
          {img && (
              <div className = "raise_page_image ">
              <Image
                  src = {img}
                  width="100vw" height="40" layout="responsive" objectFit="contain"
              />
            </div>
          )}
        <RaiseAdvantages />
        <RaiseFeatures />
        <RaiseForm myRef={myRef} />
      </section>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      store.dispatch(getRaisePage());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default RaisePage;
