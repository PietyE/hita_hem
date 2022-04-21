import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import Button from "../ui/Button";
import StatusCompanyBadge from "../StatusCompany";
import {checkCurrentResolution, getCorrectImage, getImageAltText} from "../../utils/utils";
import SliderImage from "../../containers/HomePage/SliderImage";
import dynamic from "next/dynamic";

const BannerSignUpBlock = dynamic(() =>
    import("components/BannerSignUpBlock"), {ssr: false}
);


const TopSliderComponent = ({
                                data,
                                sectionClass,
                                containerClass,
                                statusClass,
                                itemTitleClass,
                                itemDescriptionClass,
                                buttonsContainerClass,
                                firstButtonClass,
                                secondButtonClass,
                                type,
                                bannerData,
                                isAuth,
                            }) => {
    const screenSize = checkCurrentResolution()
    const [showSlider, setShowSlider] = useState(false)

    useEffect(() => {
        if (type !== 'home_page') {
            setShowSlider(false)
        } else if (type === 'home_page' && isAuth) {
            setShowSlider(false)
        } else if (type === 'home_page' && !isAuth) {
            const authLocalData = localStorage.getItem("auth_data")
            if (!authLocalData) {
                setShowSlider(true)
            }
        }
    }, [type, isAuth])

    let isShowControls = false

    if (showSlider) {
        isShowControls = false
    } else if (!showSlider && data?.length > 1) {
        isShowControls = true

    }

    const _activeClass = showSlider ? 'active' : ''

    return (
        <div className={`slider_component_container ${sectionClass}`}>
            <Carousel controls={isShowControls} slide={!showSlider} interval={8000}
                      touch={true} indicators={isShowControls}>
                {bannerData && showSlider && (
                    <Carousel.Item key='banner' className={_activeClass}>
                        <section className='item_component_container' style={{position: 'relative'}}>
                            <div className={`item_component_content_container ${containerClass}`}>
                                {bannerData?.title && (
                                    <h1 className={`item_component_title ${itemTitleClass} banner_title`}>
                                        {bannerData.title}
                                    </h1>)
                                }


                                {bannerData?.sub_title && (
                                    <div
                                        className={`item_component_description ${itemDescriptionClass} banner_description`}>
                                        <p>
                                            {bannerData.sub_title}
                                        </p>
                                    </div>
                                )
                                }

                                <BannerSignUpBlock/>

                            </div>
                            {bannerData?.images && screenSize && (
                                <SliderImage
                                    img={getCorrectImage(bannerData.images)}
                                    screenSize={screenSize}
                                    alter_text={getImageAltText(bannerData?.images?.alter_text)}

                                />
                            )}

                        </section>
                    </Carousel.Item>
                )}
                {!!data?.length && !showSlider &&
                data?.map((headerItem) => {
                    const {
                        images,
                        title,
                        description,
                        first_button_title,
                        first_button_color,
                        first_button_text_color,
                        second_button_title,
                        first_button_url,
                        second_button_url,
                        second_button_color,
                        second_button_text_color,
                        status,
                        pk,
                        percentage,
                    } = headerItem;

                    const img = getCorrectImage(images)
                    const _firstButtonColor = changeButtonColor(first_button_text_color, first_button_color)
                    const _secondButtonColor = changeButtonColor(second_button_text_color, second_button_color)

                    return (
                        <Carousel.Item key={pk + title}>
                            <div className='item_component_container' style={{position: 'relative'}}>
                                <div className={`item_component_content_container ${containerClass}`}>
                                    {status && (
                                        <StatusCompanyBadge
                                            status={status}
                                            percentage={percentage}
                                            classNameContainer={` item_component_status ${statusClass}`}
                                        />
                                    )}
                                    {title && type === 'home_page' && (
                                        <h1 className={`${type === 'home_page' ? 'item_component_home_title' : 'item_component_title'} ${itemTitleClass}`}>
                                            {title}
                                        </h1>
                                    )}
                                    {title && type !== 'home_page' && (
                                        <h2 className={`${type === 'home_page' ? 'item_component_home_title' : 'item_component_title'} ${itemTitleClass}`}>
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <div
                                            className={`${type === 'home_page' ? 'item_component_home_description' : 'item_component_description'} ${itemDescriptionClass}`}
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeHtmlFromBack(description),
                                            }}
                                        />
                                    )}
                                    {(first_button_title || second_button_title) && (
                                        <div
                                            className={`slider_component_buttons_container ${buttonsContainerClass}`}
                                        >
                                            {first_button_title && (
                                                <a href={first_button_url}>
                                                    <Button
                                                        className={`slider_component_first_btn ${firstButtonClass}`}
                                                        colorStyle={type === 'home_page' ? "black" : "white"}
                                                        style={_firstButtonColor}
                                                    >
                                                        {first_button_title.toUpperCase()}
                                                    </Button>
                                                </a>
                                            )}
                                            {second_button_title && (
                                                <a href={second_button_url}>
                                                    <Button
                                                        className={`slider_component_second_btn ${secondButtonClass}`}
                                                        colorStyle={type === 'home_page' ? "outline-black" : "outline-white"}
                                                        style={_secondButtonColor}

                                                    >
                                                        {second_button_title.toUpperCase()}
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {img && screenSize && (
                                    <SliderImage img={img} screenSize={screenSize}/>
                                )}

                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
};

const changeButtonColor = (textColor, backGroundColor) => {
    let resultStyle = {}
    if(textColor && backGroundColor){
        resultStyle = {color: textColor, borderColor: textColor, backgroundColor: backGroundColor}
    }else if(!textColor && backGroundColor){
        resultStyle = { backgroundColor: backGroundColor}
    }else if(textColor && !backGroundColor){
        resultStyle = {color: textColor, borderColor: textColor}
    }
    return resultStyle
}

export default TopSliderComponent;
