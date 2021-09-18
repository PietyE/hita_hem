import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import { wrapper } from "/redux/store";
import { getPosts } from "redux/actions/launchingSoon";
import PostsBlock from "containers/LaunchingSoonPage/PostsBlock";
import ImageBlock from "containers/LaunchingSoonPage/ImageBlock";
import SpinnerStyled from "components/ui/Spinner";
import SuccessfullySubscribedModal from "components/SuccessfullySubscribedModal";
import { getIsFetchingLaunchingSoonSelector } from "redux/reducers/launchingSoon";

const LaunchingSoonPage = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetchingLaunchingSoonSelector);

  const [
    isShowSuccessfullySubscribeModal,
    setIsShowSuccessfullySubscribeModal,
  ] = useState(false);

  const _getPosts = useCallback(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    _getPosts();
  }, []);

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <section className="launching_soon_section">
        <ImageBlock onOpenModal={setIsShowSuccessfullySubscribeModal} />
        <PostsBlock />
        <SuccessfullySubscribedModal
          isShow={isShowSuccessfullySubscribeModal}
          onHide={setIsShowSuccessfullySubscribeModal}
        />
      </section>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      store.dispatch(getPosts());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default LaunchingSoonPage;
