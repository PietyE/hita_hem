import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PostsBlock from "containers/LaunchingSoonPage/PostsBlock";
import ImageBlock from "containers/LaunchingSoonPage/ImageBlock";
import SpinnerStyled from "components/ui/Spinner";
import SuccessfullySubscribedModal from "components/SuccessfullySubscribedModal";
import { getIsFetchingLaunchingSoonSelector } from "redux/reducers/launchingSoon";

const LaunchingSoonPage = () => {
  const isFetching = useSelector(getIsFetchingLaunchingSoonSelector);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [
    isShowSuccessfullySubscribeModal,
    setIsShowSuccessfullySubscribeModal,
  ] = useState(false);

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

export default LaunchingSoonPage;
