import React, {useEffect, useState} from 'react';
import {getCorrectImage, getImgMeta} from "../../utils/utils";
import InfoBlockColor from "../../components/ui/InfoBlockColor";
import Title from "../../components/ui/Title";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import Image from "next/image";
import dynamic from "next/dynamic";

const SimpleReactLightbox = dynamic(() => import("simple-react-lightbox"), {
    ssr: false,
});

const SRLWrapper = dynamic(() =>
    import('simple-react-lightbox').then((mod) => mod.SRLWrapper), {ssr: false}
)

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
        first_images,
        second_images,
        third_images,
        fourth_images,
        title,
        description,
    } = section;

    const img1 = getCorrectImage(first_images)
    const img2 = getCorrectImage(second_images)
    const img3 = getCorrectImage(third_images)
    const img4 = getCorrectImage(fourth_images)

    const [firstImageSize, setFirstImageSize] = useState({})
    const [secondImageSize, setSecondImageSize] = useState({})
    const [thirdImageSize, setThirdImageSize] = useState({})
    const [fourthImageSize, setFourthImageSize] = useState({})

    useEffect(() => {
        getImgMeta(img1, setFirstImageSize)
        getImgMeta(img2, setSecondImageSize)
        getImgMeta(img3, setThirdImageSize)
        getImgMeta(img4, setFourthImageSize)
    }, [])

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
        <React.Fragment>
            <section className="idea_section mb-5">
                <Title title={title} className="idea_title"/>
                <span
                    className="idea_section_description_container"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlFromBack(description),
                    }}
                />
                {type === "Solution" && (
                    <SimpleReactLightbox>
                        <SRLWrapper options={options}>

                            {!!img1 && (
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={img1}
                                        width={firstImageSize?.width || 192}
                                        height={firstImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img1 ? 'first image' : ' '}
                                        className='idea_next_image'
                                    />
                                </div>
                            )}
                            {!!img2 && (
                                <div className='solution_image_wrapper'>
                                    <Image
                                        src={img2}
                                        width={secondImageSize?.width || 192}
                                        height={secondImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img2 ? 'solution image' : ' '}
                                        className='idea_next_image'
                                    />
                                </div>
                            )}
                        </SRLWrapper>
                    </SimpleReactLightbox>
                )}
            </section>
            {type === "Result" && (
                <SimpleReactLightbox>
                    <SRLWrapper options={options}>

                        <div className="idea_image_container">

                            {!!img1 && (
                                <div className='middle_photo'>

                                    <Image
                                        src={img1}
                                        width={firstImageSize?.width || 192}
                                        height={firstImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img1 ? 'solution image' : ' '}
                                    />
                                </div>
                            )}
                            {!!img2 && (
                                <div className='middle_photo'>

                                    <Image
                                        src={img2}
                                        width={secondImageSize?.width || 192}
                                        height={secondImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img2 ? 'solution image' : ' '}
                                    />
                                </div>
                            )}
                            {!!img3 && (
                                <div className='middle_photo'>

                                    <Image
                                        src={img3}
                                        width={thirdImageSize?.width || 192}
                                        height={thirdImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img3 ? 'solution image' : ' '}
                                    />
                                </div>
                            )}
                            {!!img4 && (
                                <div className='middle_photo'>

                                    <Image
                                        src={img4}
                                        width={fourthImageSize?.width || 192}
                                        height={fourthImageSize?.height || 108}
                                        layout="responsive"
                                        alt={img4 ? 'solution image' : ' '}
                                    />
                                </div>

                            )}

                        </div>
                    </SRLWrapper>
                </SimpleReactLightbox>

            )}
        </React.Fragment>
    );
}

export default IdeaItem;