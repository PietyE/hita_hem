import React, { useEffect, useRef, useState } from "react";
import Button from "components/ui/Button";
import { useMediaQueries } from "@react-hook/media-query";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import {useTranslation} from "react-i18next";
import {getCorrectImage} from "../../utils/utils";
// import Image from "next/image";
import dynamic from "next/dynamic";

const SimpleReactLightbox = dynamic(() => import("simple-react-lightbox"), {
    ssr: false,
});

const SRLWrapper = dynamic(() =>
    import('simple-react-lightbox').then((mod) => mod.SRLWrapper),{ssr: false}
)


const FinArticle = ({ item }) => {
  const { t } = useTranslation();

  const { title, description, images } = item;
  const img = getCorrectImage(images)

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
    if (img) {
      _style = isShowButton
        ? {
            height: isShowMore ? "auto" : "458px",
            borderBottom: isShowMore? "none" :"1px solid rgba(0, 0, 0, 0.1)"
          }
        : {};
    }
    if (!img) {
      _style = { height: "auto" };
    }
  }

  const buttonStyle = { bottom: isShowMore ? "-35px" : "" };

  const options = {
      buttons: {
          showDownloadButton:false,
          showAutoplayButton:false,
          showNextButton:false,
          showPrevButton:false,
          showThumbnailsButton:false,
          showFullscreenButton:false,

      },
      thumbnails: {
          showThumbnails: false,
      }
  }

  return (
    <section className="fin_article_wrapper">
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
      <li className="fin_article">
        {!!img && (


          <div className="fin_article_image image_container">
            <img loading="lazy"
                 src={img}
                 alt={img ? 'article image' : ' '}
            />
          </div>



              //   <div className='fin_article_image' style={{  position: 'relative'}}>
          //
          //   <Image
          //           src = {img}
          //           layout = "fill"
          //           objectFit = "contain"
          //           // priority = {true}
          //
          //       />
          //   </div>
        )}
        <div
          className={
            img
              ? "fin_article_text_wrapper"
              : "fin_article_text_wrapper_alone"
          }
          ref={contentRef}
          style={img ? _style : null}
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
        {matchesAll && isShowButton && img && (
          <div className="show_more">
            <span
              className="show_more_button fin_show_more"
              onClick={_handleClickShowMore}
            >
              {isShowMore ? t("company_page.button_show_less") : t("company_page.button_show_more")}
            </span>
          </div>
        )}
        {!matchesAll && isShowButton && img && (
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
        </SRLWrapper>
      </SimpleReactLightbox>
    </section>
  );
};

export default FinArticle;
