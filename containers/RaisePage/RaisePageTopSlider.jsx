import React from "react";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";
import {CarouselComponent, CarouselItem} from "../../components/ui/CarouselComponent";
import Button from "components/ui/Button";
import {getRaisePageHeadersSelector} from "redux/reducers/raisePage";
import {checkCurrentResolution, getCorrectImage, getImageAltText} from "utils/utils";
import Image from "next/image";


const RaisePageTopSlider = ({onScrollTo}) => {
    const headerContent = useSelector(getRaisePageHeadersSelector, isEqual);
    const screenSize = checkCurrentResolution()
    return (
        <div className="raise_page_slider_container">
            <CarouselComponent controls={headerContent?.length > 1} slide={true} interval={null} touch={true}
                      indicators={headerContent?.length > 1}>
                {headerContent.length > 0 &&
                headerContent.map((content) => {
                    const img = getCorrectImage(content?.images)
                    const altText = getImageAltText(content?.images)

                    return (
                        <CarouselItem key={content?.index + content?.title}>
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
                                        className="raise_page_slider_image "
                                        alt={altText}
                                        loading='eager'
                                    />)}
                                    {screenSize === 'laptop' && img && (<Image
                                        src={img}
                                        layout="fill"
                                        objectFit="cover"
                                        className="raise_page_slider_image "
                                        alt={altText}
                                        loading='eager'
                                    />)}
                                    {screenSize === 'mobile' && img && (<Image
                                        src={img}
                                        layout="fill"
                                        objectFit="cover"
                                        className="raise_page_slider_image "
                                        alt={altText}
                                        loading='eager'
                                    />)}
                                </div>
                            </div>

                        </CarouselItem>
                    );
                })}
            </CarouselComponent>
        </div>
    );
};

export default RaisePageTopSlider;
