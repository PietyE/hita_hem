import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQueries } from "@react-hook/media-query";

import Title from "components/ui/Title";
import ProjectInvestInfoSection from "./ProjectInvestInfoSection";

import {
  getBusinessHighlightSelector,
  getAboutProjectDescriptionSelector,
  getAboutProjectTitleSelector,
} from "redux/reducers/companies";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import { useTranslation } from "react-i18next";

const ProjectInfo = ({ isAuth }) => {
  const { t } = useTranslation();

  const projectInfotRef = useRef();

  const businessHighlights = useSelector(getBusinessHighlightSelector);

  const title = useSelector(getAboutProjectTitleSelector);
  const description = useSelector(getAboutProjectDescriptionSelector);

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
  return (
    <div className="project_info_container">
      <div className="project_info_section_container">
        <div className="project_info_left_section">
          {!!businessHighlights && (
              <div className="project_info_bussines_highlights">
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
        <ProjectInvestInfoSection isAuth={isAuth} />
      </div>

      <span className="bottom_line" />
    </div>
  );
};

export default ProjectInfo;
