import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "redux/store";
import Image from "next/image";
import dynamic from "next/dynamic";
import RaisePageTopSlider from "containers/RaisePage/RaisePageTopSlider";
import RaiseOpportunities from "containers/RaisePage/RaiseOpportunities";
import RaiseAdvantages from "containers/RaisePage/RaiseAdvantages";
import SpinnerStyled from "components/ui/Spinner";

import {getRaisePage, setScrollToForm} from "redux/actions/raisePage";
import {
    getIsFetchingRaisePageSelector,
    getRaisePageImageSelector,
    getRaisePageSeoSelector, getScrollToFormSelector
} from "redux/reducers/raisePage";
import {getCorrectImage} from "../utils/utils";
import MetaTags from "../components/MetaTags";


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
    const isScrollToForm = useSelector(getScrollToFormSelector)


    const img = getCorrectImage(images)
    const _getRaisePage = useCallback(() => {
    dispatch(getRaisePage());
  }, [dispatch]);

    const _setScrollToForm = useCallback(
        (data) => {
            dispatch(setScrollToForm(data));
        },
        [dispatch]
    );

  const scrollTo = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView();

  };

  useEffect(()=>{
      if(myRef.current && isScrollToForm){
          myRef.current.scrollIntoView({behavior: "smooth"});
          _setScrollToForm(false)
      }
  },[isScrollToForm])

  useEffect(() => {
    _getRaisePage();
  }, []);

  return (
    <>
            <MetaTags seo={seo}/>
      {isFetching && <SpinnerStyled />}
      <section className="raise_page_container">
        <RaisePageTopSlider onScrollTo={scrollTo} />
        <RaiseOpportunities />
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
