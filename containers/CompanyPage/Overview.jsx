import React, {useEffect, useRef, useState} from 'react';
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import {getImgMeta} from "utils/utils";

import Title from "components/ui/Title";
import {useDispatch, useSelector} from "react-redux";
import {
    getAboutProjectDescriptionSelector,
    getAboutProjectTitleSelector,
    getBusinessHighlightSelector,
    getOverviewImageSelector,
    getVideoLinkSelector,
    getOverviewImageAltTextSelector,
} from "redux/reducers/companies";
import {useTranslation} from "react-i18next";
import ButtonStyled from "components/ui/Button";
import {getIsSignInUserSelector, getQuizIsPassedSelector} from "redux/reducers/user";
import {setShowSignIn} from "redux/actions/authPopupWindows";
import {getQuiz} from "redux/actions/user";
import Image from "next/image";
import dynamic from "next/dynamic";

const YoutubeComponent = dynamic(() => import("components/ui/YoutubeComponent"), {
    ssr: false,
});

const Overview = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const projectInfotRef = useRef();

    const businessHighlights = useSelector(getBusinessHighlightSelector);
    const title = useSelector(getAboutProjectTitleSelector);
    const description = useSelector(getAboutProjectDescriptionSelector);
    const videoLink = useSelector(getVideoLinkSelector)
    const image = useSelector(getOverviewImageSelector)
    const imageAltText = useSelector(getOverviewImageAltTextSelector)
    const isAuth = useSelector(getIsSignInUserSelector)
    const isQuizPassed = useSelector(getQuizIsPassedSelector)

    // const {matchesAll} = useMediaQueries({
    //     screen: "screen",
    //     width: "(max-device-width: 500px)",
    // });

    // const [isShowButton, setiIsShowButton] = useState(false);
    // const [isShowMore, setIsShowMore] = useState(false);
    const [imageSize, setImageSize] = useState({})

    // const _handleClickShowMore = () => {
    //     setIsShowMore((prev) => !prev);
    // };

    useEffect(() => {
        getImgMeta(image, setImageSize)
    }, [image])

    // useEffect(() => {
    //     if (projectInfotRef.current) {
    //         setiIsShowButton(projectInfotRef.current.offsetHeight > 350);
    //     }
    // }, []);

    // const _style = isShowButton
    //     ? {
    //         height: isShowMore ? "auto" : "400px",
    //     }
    //     : {};

    const _descriptionSectionStyle = !isAuth || !isQuizPassed ? 'project_info_description_section_fade' : 'project_info_description_section'

    const handleSignIn = () => {
        dispatch(setShowSignIn(true));
    }

    const handleOpenQuiz = () => {
        dispatch(getQuiz());
    }

    return (
        <div>
            <div className="project_info_left_section">
                {image && (
                    <div className='project_info_overview_image_wrapper'>
                        <Image
                            src={image}
                            className='project_info_overview_image'
                            width={imageSize?.width || 0}
                            height={imageSize?.height || 0}
                            layout="responsive"
                            alt={imageAltText || ' '}
                        />
                    </div>
                )}
                {videoLink &&
                (<div
                    className="project_info_player_wrapper"
                >
                    <YoutubeComponent link={videoLink} className='project_info_player'/>
                </div>)
                }

                {!!businessHighlights && (
                    <div style={videoLink ? {marginTop: '30px'} : {}} className="project_info_bussines_highlights">
                        <h4 className="project_info_bussines_highlights_title">
                            {t("company_page.project_info.text")}
                        </h4>
                        <span
                            className="list_container"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(businessHighlights),
                            }}
                        />
                    </div>
                )}
                <div className={_descriptionSectionStyle}>
                    <Title title={title} className="project_info_title"/>
                    <span
                        className="project_info_description"
                        ref={projectInfotRef}
                        // style={_style}
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(description),
                        }}
                    />

                    {/* {matchesAll && isShowButton && (
                        <div className="show_more">
                <span
                    className="show_more_button"
                    onClick={_handleClickShowMore}
                >
                  {isShowMore ? "Show less" : "Show more"}
                </span>
                        </div>
                    )} */}
                </div>
                {!isAuth &&
                <ButtonStyled
                    colorStyle='dark-green'
                    className='project_info_show_more_button'
                    onClick={handleSignIn}
                >
                    {t("company_page.project_info.auth_button")}
                </ButtonStyled>
                }
                {isAuth && !isQuizPassed &&
                <ButtonStyled
                    colorStyle='dark-green'
                    className='project_info_show_more_button'
                    onClick={handleOpenQuiz}
                >
                    {t("company_page.project_info.quiz_button")}
                </ButtonStyled>
                }

            </div>

        </div>
    );
}

export default Overview;