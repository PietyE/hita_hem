import React, {useEffect, useRef, useState} from 'react';
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import Title from "../../components/ui/Title";
import {useSelector} from "react-redux";
import {
    getAboutProjectDescriptionSelector,
    getAboutProjectTitleSelector,
    getBusinessHighlightSelector, getVideoLinkSelector
} from "../../redux/reducers/companies";
import {useTranslation} from "react-i18next";
import {useMediaQueries} from "@react-hook/media-query";
import {getYoutubeId} from "../../utils/utils";

const Overview = (props) => {
    const { t } = useTranslation();

    const projectInfotRef = useRef();

    const businessHighlights = useSelector(getBusinessHighlightSelector);

    const title = useSelector(getAboutProjectTitleSelector);
    const description = useSelector(getAboutProjectDescriptionSelector);

    const videoLink = useSelector(getVideoLinkSelector)


    const { matchesAll } = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 500px)",
    });

    const [isShowButton, setiIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);

    const _handleClickShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    useEffect(() => {
        if (projectInfotRef.current) {
            setiIsShowButton(projectInfotRef.current.offsetHeight > 350);
        }
    }, []);

    const _style = isShowButton
        ? {
            height: isShowMore ? "auto" : "400px",
        }
        : {};

    const youtubeId = getYoutubeId(videoLink)
    return (
        <div>
            <div className="project_info_left_section">
                {youtubeId &&
                (<div
                    className = "project_info_player_wrapper"
                >
                    <iframe
                        className = 'project_info_player'
                        src = {`https://www.youtube.com/embed/${youtubeId}`}
                        frameBorder = "0"
                        allowFullScreen
                    />
                </div>)
                }
                {!!businessHighlights && (
                    <div style={videoLink ? {marginTop: '30px'} : {} } className="project_info_bussines_highlights">
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
                <div className="project_info_description_section">
                    <Title title={title} className="project_info_title" />
                    <span
                        className="project_info_description"
                        ref={projectInfotRef}
                        style={_style}
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(description),
                        }}
                    />

                    {matchesAll && isShowButton && (
                        <div className="show_more">
                <span
                    className="show_more_button"
                    onClick={_handleClickShowMore}
                >
                  {isShowMore ? "Show less" : "Show more"}
                </span>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}

export default Overview;