import React, { useRef, useState, useEffect } from "react";
import { useMediaQueries } from "@react-hook/media-query";

import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";

import SubTitle from "components/ui/SubTitle";
import {useTranslation} from "react-i18next";

const MiddleSection = ({ content }) => {
  return (
    <div className="middle_section">
      {content.map((c, i) => {
        return <Content key={i} data={c} />;
      })}
    </div>
  );
};

const Content = ({ data }) => {
  const contentRef = useRef();
  const { t } = useTranslation();

  const { matchesAll } = useMediaQueries({
    screen: "screen",
    width: "(max-width: 850px)",
  });
  const [isShowButton, setiIsShowButton] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const _handleClickShowMore = () => {
    setIsShowMore((prev) => !prev);
  };
  useEffect(() => {
    if (contentRef.current) {
      setiIsShowButton(contentRef.current.offsetHeight > 500);
    }
  }, []);
  const _style =
    contentRef?.current?.offsetHeight > 500 && matchesAll
      ? { height: isShowMore ? "auto" : "510px" }
      : { height: "auto" };
  return (
    <div className="middle_section_item">
      <SubTitle content={data.title} />
      <div
        className="middle_section_content"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtmlFromBack(data.description),
        }}
        ref={contentRef}
        style={_style}
      />
      {matchesAll && isShowButton && (
        <div className="show_more">
          <span className="show_more_button" onClick={_handleClickShowMore}>
            {isShowMore ? t("company_page.button_show_less") : t("company_page.button_show_more")}
          </span>
        </div>
      )}
    </div>
  );
};

export default MiddleSection;
