import React, { useEffect, useRef, useState } from "react";
import ImageComponent from "components/ui/ImageComponent";
import Button from "components/ui/Button";
import { useMediaQueries } from "@react-hook/media-query";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import {useTranslation} from "react-i18next";

const FinArticle = ({ item }) => {
  const { t } = useTranslation();

  const { title, description, image } = item;

  const contentRef = useRef();
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const { matchesAll } = useMediaQueries({
    screen: "screen",
    width: "(max-device-width: 900px)",
  });

  const _handleClickShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  useEffect(() => {
    if (matchesAll) {
      let timerId = setInterval(() => {
        if (
          contentRef?.current?.offsetHeight !== 0 &&
          contentRef?.current?.offsetHeight !== 518
        ) {
          setIsShowButton(contentRef?.current?.offsetHeight > 518);
        }
      }, 1000);
      if (contentRef?.current?.offsetHeight === 518) {
        setTimeout(() => clearInterval(timerId), 600);
      }
      return () => clearInterval(timerId);
    }
    if (!matchesAll) {
        if (
            contentRef?.current?.offsetHeight !== 0 &&
            contentRef?.current?.offsetHeight !== 458
        ) {
          setIsShowButton(contentRef?.current?.offsetHeight > 519);
        }
      }
  }, [matchesAll]);

  let _style;

  if (matchesAll) {
    _style = isShowButton
      ? {
          height: isShowMore ? "auto" : "518px",
        }
      : {};
  }
  if (!matchesAll) {
    if (image) {
      _style = isShowButton
        ? {
            height: isShowMore ? "auto" : "458px",
            borderBottom: isShowMore? "none" :"1px solid rgba(0, 0, 0, 0.1)"
          }
        : {};
    }
    if (!image) {
      _style = { height: "auto" };
    }
  }

  const buttonStyle = { bottom: isShowMore ? "-35px" : "" };

  return (
    <section className="fin_article_wrapper">
      <li className="fin_article">
        {!!image && (
          <ImageComponent
            className="fin_article_image"
            src={image}
            alt="article_img"
          />
        )}
        <div
          className={
            image
              ? "fin_article_text_wrapper"
              : "fin_article_text_wrapper_alone"
          }
          ref={contentRef}
          style={image ? _style : null}
        >
          <h3 className="fin_article_title">{title}</h3>
          <span
            // style={_style}
            // ref={contentRef}
            className="fin_article_text"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlFromBack(description),
            }}
          />
        </div>
        {matchesAll && isShowButton && image && (
          <div className="show_more">
            <span
              className="show_more_button fin_show_more"
              onClick={_handleClickShowMore}
            >
              {isShowMore ? t("company_page.button_show_less") : t("company_page.button_show_more")}
            </span>
          </div>
        )}
        {!matchesAll && isShowButton && image && (
          <Button
            onClick={_handleClickShowMore}
            colorStyle="red-without-border"
            className="fin_article_large_button"
            style={buttonStyle}
          >
            {isShowMore ? t("company_page.button_show_less") : t("company_page.button_read_more")}
          </Button>
        )}
      </li>
    </section>
  );
};

export default FinArticle;
