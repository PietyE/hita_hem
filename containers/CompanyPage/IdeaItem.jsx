import React from 'react';
import {getCorrectImage, getImageAltText} from "../../utils/utils";
import InfoBlockColor from "../../components/ui/InfoBlockColor";
import Title from "../../components/ui/Title";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
// import Image from "next/image";
import dynamic from "next/dynamic";
import ImageComponent from "../../components/ui/ImageComponent";

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
        first_image,
        first_image_alter_text,
        second_images,
        second_image,
        second_image_alter_text,
        third_images,
        third_image,
        third_image_alter_text,
        fourth_images,
        fourth_image,
        fourth_image_alter_text,
        title,
        description,
    } = section;

    const img1 = first_image || getCorrectImage(first_images)
    const img2 = second_image || getCorrectImage(second_images)
    const img3 = third_image || getCorrectImage(third_images)
    const img4 = fourth_image || getCorrectImage(fourth_images)
    const altText1 = first_image_alter_text || getImageAltText(first_images)
    const altText2 = second_image_alter_text || getImageAltText(second_images)
    const altText3 = third_image_alter_text || getImageAltText(third_images)
    const altText4 = fourth_image_alter_text || getImageAltText(fourth_images)


    // const [firstImageSize, setFirstImageSize] = useState({})
    // const [secondImageSize, setSecondImageSize] = useState({})
    // const [thirdImageSize, setThirdImageSize] = useState({})
    // const [fourthImageSize, setFourthImageSize] = useState({})

    // useEffect(() => {
    //     getImgMeta(img1, setFirstImageSize)
    //     getImgMeta(img2, setSecondImageSize)
    //     getImgMeta(img3, setThirdImageSize)
    //     getImgMeta(img4, setFourthImageSize)
    // }, [])

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
                                <ImageComponent
                                    alt={altText1}
                                    src={img1}
                                    className="mb-4"
                                />
                                // <div className='solution_image_wrapper'>
                                //     <Image
                                //         src={img1}
                                //         width={firstImageSize?.width || 192}
                                //         height={firstImageSize?.height || 108}
                                //         layout="responsive"
                                //         alt={altText1}
                                //         className='idea_next_image'
                                //     />
                                // </div>
                            )}
                            {!!img2 && (
                                <ImageComponent alt={altText2} src={img2} />
                                // <div className='solution_image_wrapper'>
                                //     <Image
                                //         src={img2}
                                //         width={secondImageSize?.width || 192}
                                //         height={secondImageSize?.height || 108}
                                //         layout="responsive"
                                //         alt={altText2}
                                //         className='idea_next_image'
                                //     />
                                // </div>
                            )}
                        </SRLWrapper>
                    </SimpleReactLightbox>
                )}
            </section>
            {type === "Result" && (
                <SimpleReactLightbox>
                    <SRLWrapper options={options}>

                        {/*<div className="idea_image_container">*/}

                        {/*    {!!img1 && (*/}
                        {/*        <div className='middle_photo'>*/}

                        {/*            <Image*/}
                        {/*                src={img1}*/}
                        {/*                width={firstImageSize?.width || 192}*/}
                        {/*                height={firstImageSize?.height || 108}*/}
                        {/*                layout="responsive"*/}
                        {/*                alt={altText1}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*    {!!img2 && (*/}
                        {/*        <div className='middle_photo'>*/}

                        {/*            <Image*/}
                        {/*                src={img2}*/}
                        {/*                width={secondImageSize?.width || 192}*/}
                        {/*                height={secondImageSize?.height || 108}*/}
                        {/*                layout="responsive"*/}
                        {/*                alt={altText2}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*    {!!img3 && (*/}
                        {/*        <div className='middle_photo'>*/}

                        {/*            <Image*/}
                        {/*                src={img3}*/}
                        {/*                width={thirdImageSize?.width || 192}*/}
                        {/*                height={thirdImageSize?.height || 108}*/}
                        {/*                layout="responsive"*/}
                        {/*                alt={altText3}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*    {!!img4 && (*/}
                        {/*        <div className='middle_photo'>*/}

                        {/*            <Image*/}
                        {/*                src={img4}*/}
                        {/*                width={fourthImageSize?.width || 192}*/}
                        {/*                height={fourthImageSize?.height || 108}*/}
                        {/*                layout="responsive"*/}
                        {/*                alt={altText4}*/}
                        {/*            />*/}
                        {/*        </div>*/}

                        {/*    )}*/}

                        {/*</div>*/}
                        <div className="idea_image_container">
                            {!!img1 && (
                                <ImageComponent
                                    alt={altText1}
                                    src={img1}
                                    className="middle_photo"
                                />

                            )}
                            {!!img2 && (
                                <ImageComponent
                                    alt={altText2}
                                    src={img2}
                                    className="middle_photo"
                                />

                            )}
                            {!!img3 && (
                                <ImageComponent
                                    alt={altText3}
                                    src={img3}
                                    className="middle_photo"
                                />

                            )}
                            {!!img4 && (
                                <ImageComponent
                                    alt={altText4}
                                    src={img4}
                                    className="middle_photo"
                                />

                            )}
                        </div>
                    </SRLWrapper>
                </SimpleReactLightbox>

            )}
        </React.Fragment>
    );
}

export default IdeaItem;