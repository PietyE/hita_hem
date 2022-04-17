import React from "react";
import {useSelector} from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import isEqual from "lodash/isEqual";

import Button from "components/ui/Button";
import {getRaisePageHeadersSelector} from "redux/reducers/raisePage";
import {checkCurrentResolution, getCorrectImage, getImageAltText} from "utils/utils";
import Image from "next/image";


const RaisePageTopSlider = ({onScrollTo}) => {
    const headerContent = useSelector(getRaisePageHeadersSelector, isEqual);
    const screenSize = checkCurrentResolution()
    return (
        <div className="raise_page_slider_container">
            <Carousel controls={headerContent?.length > 1} slide={true} interval={null} touch={true}
                      indicators={headerContent?.length > 1}>
                {headerContent.length > 0 &&
                headerContent.map((content) => {
                    const img = getCorrectImage(content?.images)
                    const altText = getImageAltText(content?.images)

                    return (
                        <Carousel.Item key={content?.index + content?.title}>
                            <div className="raise_page_slider_item" style={{position: 'relative'}}>

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
                                        {content?.button_title.toUpperCase()}
                                    </Button>
                                </div>
                                <div className="raise_page_slider_image ">
                                    {screenSize === 'desktop' && img && (<Image
                                        src={img}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={true}
                                        className="raise_page_slider_image "
                                        alt={altText}
                                    />)}
                                    {screenSize === 'laptop' && img && (<Image
                                        src={img}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={true}
                                        className="raise_page_slider_image "
                                        alt={altText}
                                    />)}
                                    {screenSize === 'mobile' && img && (<Image
                                        src={img}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={true}
                                        className="raise_page_slider_image "
                                        alt={altText}
                                    />)}
                                </div>
                            </div>

                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default RaisePageTopSlider;
