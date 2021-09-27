import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "redux/store";

import RaisePageTopSlider from "containers/RaisePage/RaisePageTopSlider";
import RaiseOpportunities from "containers/RaisePage/RaiseOpportunities";
import RaiseAdvantages from "containers/RaisePage/RaiseAdvantages";
import RaiseFeatures from "containers/RaisePage/RaiseFeatures";
import RaiseForm from "containers/RaisePage/RaiseForm";
import SpinnerStyled from "components/ui/Spinner";
import { getRaisePage } from "redux/actions/raisePage";
import { getIsFetchingRaisePageSelector } from "redux/reducers/raisePage";

const RaisePage = () => {
  const myRef = useRef(null);
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingRaisePageSelector);

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
      {isFetching && <SpinnerStyled />}
      <section className="raise_page_container">
        <RaisePageTopSlider onScrollTo={scrollTo} />
        <RaiseOpportunities />
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
