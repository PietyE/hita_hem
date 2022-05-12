import React from 'react';
// import {getCorrectImage, getImageAltText} from "../../utils/utils";
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

                            {!!first_image && (
                                <ImageComponent
                                    alt={first_image_alter_text}
                                    src={first_image}
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
                            {!!second_image && (
                                <ImageComponent alt={second_image_alter_text} src={second_image} />
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
                            {!!first_image && (
                                <ImageComponent
                                    alt={first_image_alter_text}
                                    src={first_image}
                                    className="middle_photo"
                                />

                            )}
                            {!!second_image && (
                                <ImageComponent
                                    alt={second_image_alter_text}
                                    src={second_image}
                                    className="middle_photo"
                                />

                            )}
                            {!!third_image && (
                                <ImageComponent
                                    alt={third_image_alter_text}
                                    src={third_image}
                                    className="middle_photo"
                                />

                            )}
                            {!!fourth_image && (
                                <ImageComponent
                                    alt={fourth_image_alter_text}
                                    src={fourth_image}
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