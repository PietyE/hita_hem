import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import isEqual from "lodash/isEqual";

import Button from "components/ui/Button";
import TopSliderComponent from "components/TopSliderComponent";
import { getRaisePageHeadersSelector } from "redux/reducers/raisePage";
import { chooseCorrectResolution } from "utils/utils";

const RaisePageTopSlider = ({ onScrollTo }) => {
  const headerContent = useSelector(getRaisePageHeadersSelector, isEqual);

  return (
    <>
      <div className="raise_page_slider_container">
        <Carousel controls={headerContent?.length>1} slide={true} interval={null} touch={true}>
          {headerContent.length > 0 &&
            headerContent.map((content, i) => {
              const correctImage = chooseCorrectResolution(content?.image_list);
              return (
                <Carousel.Item key={i}>
                  <div className="raise_page_slider_item">
                    <img
                      className="raise_page_slider_image"
                      src={correctImage}
                      alt='raise page header image'
                      loading="lazy"
                    />
                      <div className='raise_page_slider_content_container'>
                    <h1 className="raise_page_slider_title">
                      {content?.title}
                    </h1>
                    <p className="raise_page_slider_text">
                      {content?.description}
                    </p>
                    <Button
                      className="raise_page_slider_button"
                      colorStyle="white"
                      onClick={onScrollTo}
                    >
                      {content?.button_title}
                    </Button>
                      </div>
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      <TopSliderComponent />
    </>
  );
};

export default RaisePageTopSlider;
