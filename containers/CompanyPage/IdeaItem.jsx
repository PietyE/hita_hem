import React, {memo} from 'react';
import InfoBlockColor from "../../components/ui/InfoBlockColor";
import Title from "../../components/ui/Title";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import Image from "next/image";

import {SimpleReactLightboxComponent, SRLWrapperComponent} from "../../components/ui/SimpleReactLightboxComponent";



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
        first_image_height,
        first_image_width,
        second_image,
        second_image_alter_text,
        second_image_height,
        second_image_width,
        third_image,
        third_image_alter_text,
        third_image_height,
        third_image_width,
        fourth_image,
        fourth_image_alter_text,
        fourth_image_height,
        fourth_image_width,
        title,
        description,
    } = section;

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
                                // <ImageComponent
                                //     alt={first_image_alter_text}
                                //     src={first_image}
                                //     className="mb-4"
                                // />
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={first_image}
                                        width={first_image_width || 0}
                                        height={first_image_height || 0}
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
                                // <ImageComponent alt={second_image_alter_text} src={second_image} />
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={second_image}
                                        width={second_image_width || 0}
                                        height={second_image_height || 0}
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
                                        width={first_image_width || 0}
                                        height={first_image_height || 0}
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
                                        width={second_image_width || 0}
                                        height={second_image_height || 0}
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
                                        width={third_image_width || 0}
                                        height={third_image_height || 0}
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
                                        width={fourth_image_width || 0}
                                        height={fourth_image_height || 0}
                                        layout="responsive"
                                        alt={fourth_image_alter_text}
                                        loading='lazy'
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                    />
                                </div>

                            )}

                        </div>
                        {/*<div className="idea_image_container">*/}
                        {/*    {!!first_image && (*/}
                        {/*        <ImageComponent*/}
                        {/*            alt={first_image_alter_text}*/}
                        {/*            src={first_image}*/}
                        {/*            className="middle_photo"*/}
                        {/*        />*/}

                        {/*    )}*/}
                        {/*    {!!second_image && (*/}
                        {/*        <ImageComponent*/}
                        {/*            alt={second_image_alter_text}*/}
                        {/*            src={second_image}*/}
                        {/*            className="middle_photo"*/}
                        {/*        />*/}

                        {/*    )}*/}
                        {/*    {!!third_image && (*/}
                        {/*        <ImageComponent*/}
                        {/*            alt={third_image_alter_text}*/}
                        {/*            src={third_image}*/}
                        {/*            className="middle_photo"*/}
                        {/*        />*/}

                        {/*    )}*/}
                        {/*    {!!fourth_image && (*/}
                        {/*        <ImageComponent*/}
                        {/*            alt={fourth_image_alter_text}*/}
                        {/*            src={fourth_image}*/}
                        {/*            className="middle_photo"*/}
                        {/*        />*/}

                        {/*    )}*/}
                        {/*</div>*/}
                    </SRLWrapperComponent>
                </SimpleReactLightboxComponent>

            )}
        </>
    );
}

export default memo(IdeaItem);