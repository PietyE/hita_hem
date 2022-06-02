import React, {memo, useEffect, useState} from 'react';
import InfoBlockColor from "components/ui/InfoBlockColor";
import Title from "components/ui/Title";
import {SimpleReactLightboxComponent, SRLWrapperComponent} from "components/ui/SimpleReactLightboxComponent";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {getImgMeta} from "../../utils/utils";
import Image from "next/image";

const options = {
    buttons: {
        showDownloadButton: false,
        showAutoplayButton: false,
    },
    thumbnails: {
        thumbnailsContainerPadding: "20px 0",
    }
}

const IdeaItem = ({section}) => {
    const {
        type,
        first_image,
        first_image_alter_text,
        second_image,
        second_image_alter_text,
        third_image,
        third_image_alter_text,
        fourth_image,
        fourth_image_alter_text,
        title,
        description,
    } = section;

    const [firstImageSize, setFirstImageSize] = useState({})
    const [secondImageSize, setSecondImageSize] = useState({})
    const [thirdImageSize, setThirdImageSize] = useState({})
    const [fourthImageSize, setFourthImageSize] = useState({})

    useEffect(() => {
        if(first_image ){
            getImgMeta(first_image, setFirstImageSize)
        }
    }, [first_image])
    useEffect(() => {
        if(second_image){
            getImgMeta(second_image, setSecondImageSize)
        }
    }, [second_image])
    useEffect(() => {
        if(third_image){
            getImgMeta(third_image, setThirdImageSize)
        }
    }, [third_image])
    useEffect(() => {
        if(fourth_image){
            getImgMeta(fourth_image, setFourthImageSize)
        }
    }, [fourth_image])
    if (type === "Challenge") {
        return (
            <section className="idea_section mb-5">
                <InfoBlockColor className="idea_color_block">
                    <Title title={title} className="mb-3"/>
                    <span
                        className="idea_section_description_container"
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(description),
                        }}
                    />
                </InfoBlockColor>
            </section>
        );
    }

    return (
        <>
            <section className="idea_section mb-5">
                <Title title={title} className="idea_title"/>
                <span
                    className="idea_section_description_container"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlFromBack(description),
                    }}
                />
                {type === "Solution" && (
                    <SimpleReactLightboxComponent>
                        <SRLWrapperComponent options={options}>

                            {!!first_image && (
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={first_image}
                                        width={firstImageSize?.width || 0}
                                        height={firstImageSize?.height || 0}
                                        layout="responsive"
                                        alt={first_image_alter_text}
                                        className='idea_next_image'
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                            {!!second_image && (
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={second_image}
                                        width={secondImageSize?.width || 0}
                                        height={secondImageSize?.height || 0}
                                        layout="responsive"
                                        alt={second_image_alter_text}
                                        className='idea_next_image'
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                        </SRLWrapperComponent>
                    </SimpleReactLightboxComponent>
                )}
            </section>
            {type === "Result" && (
                <SimpleReactLightboxComponent>
                    <SRLWrapperComponent options={options}>

                        <div className="idea_image_container">
                            {!!first_image && (
                                <div className='middle_photo'>
                                    <Image
                                        src={first_image}
                                        width={firstImageSize?.width || 0}
                                        height={firstImageSize?.height || 0}
                                        layout="responsive"
                                        alt={first_image_alter_text}
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                            {!!second_image && (
                                <div className='middle_photo'>
                                    <Image
                                        src={second_image}
                                        width={secondImageSize?.width || 0}
                                        height={secondImageSize?.height || 0}
                                        layout="responsive"
                                        alt={second_image_alter_text}
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                            {!!third_image && (
                                <div className='middle_photo'>
                                    <Image
                                        src={third_image}
                                        width={thirdImageSize?.width || 0}
                                        height={thirdImageSize?.height || 0}
                                        layout="responsive"
                                        alt={third_image_alter_text}
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                            {!!fourth_image && (
                                <div className='middle_photo'>
                                    <Image
                                        src={fourth_image}
                                        width={fourthImageSize?.width || 0}
                                        height={fourthImageSize?.height || 0}
                                        layout="responsive"
                                        alt={fourth_image_alter_text}
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>
                            )}
                        </div>
                    </SRLWrapperComponent>
                </SimpleReactLightboxComponent>

            )}
        </>
    );
}

export default memo(IdeaItem);