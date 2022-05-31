import React, {useEffect, useRef, useState, memo} from "react";
import Button from "components/ui/Button";
import {useMediaQueries} from "@react-hook/media-query";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import {useTranslation} from "react-i18next";
import {getImgMeta} from "../../utils/utils";
import Image from "next/image";
import {SRLWrapperComponent,SimpleReactLightboxComponent} from "../../components/ui/SimpleReactLightboxComponent";

const options = {
    // settings: {
    //     overlayColor: 'rgba(30, 30, 30, 0.9)',
    // },
    buttons: {
        showDownloadButton: false,
        showAutoplayButton: false,
        showNextButton: false,
        showPrevButton: false,
        showThumbnailsButton: false,
        showFullscreenButton: false,

    },
    thumbnails: {
        showThumbnails: false,
    }
}

const FinArticle = ({item}) => {
    const {t} = useTranslation();
    const {title, description, image, image_alter_text} = item;

    const contentRef = useRef();
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const [imageMeta, setImageMeta] = useState({})
    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    useEffect(() => {
        getImgMeta(image, setImageMeta)
    }, [image])

    useEffect(() => {

        if (matchesAll) {

            let timerId = setInterval(() => {
                const blockHeight = contentRef?.current?.offsetHeight

                if (blockHeight !== 0 && blockHeight !== 450) {
                    if(description) {
                        setIsShowButton(blockHeight > 450);
                    }
                }
            }, 100);

            if (contentRef?.current?.offsetHeight === 450) {
                setTimeout(() => clearInterval(timerId), 50);
            }

            return () => clearInterval(timerId);
        }

        if (!matchesAll) {
            const blockHeight = contentRef?.current?.offsetHeight
            if (blockHeight !== 0 && blockHeight !== 450) {
                if(description){
                setIsShowButton(blockHeight > 450);
                }
            }
        }

    }, [item, matchesAll]);

    const _handleClickShowMore = () => {
        setIsShowMore((prev) => !prev);
        if (isShowMore) {
            contentRef.current.scrollIntoView({block: "start"});
            const scrolled = window.scrollY
            window.scrollTo({top: scrolled - 160})
        }
    };

    let itemClass = 'fin_article'

    if(!isShowMore && isShowButton){
        itemClass = 'fin_article_fade'
    }

    return (
                <section className="fin_article_wrapper">

                    <li className={itemClass}
                        ref={contentRef}
                    >
                        <div
                            className="fin_article_text_wrapper"
                        >
                            <h3 className="fin_article_title">{title}</h3>
                            <span
                                className="fin_article_text"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(description),
                                }}
                            />
                        </div>

                        {(!!image) && (
                            <SimpleReactLightboxComponent>
                                  <SRLWrapperComponent options={options}>
                            <Image
                                src={image}
                                layout="responsive"
                                width={imageMeta?.width || 0}
                                height={imageMeta?.height || 0}
                                className='fin_article_image'
                                alt={image_alter_text}
                                loading='lazy'
                            />
                               </SRLWrapperComponent>
                               </SimpleReactLightboxComponent>
                        )}
                        {matchesAll && isShowButton && (
                            <div className={isShowMore ? "show_more show_more_clicked" : "show_more "}>
            <span
                className="show_more_button fin_show_more"
                onClick={_handleClickShowMore}
            >
              {isShowMore ? t("company_page.button_show_less") : t("company_page.button_show_more")}
            </span>
                            </div>
                        )}
                        {!matchesAll && isShowButton && (
                            <Button
                                onClick={_handleClickShowMore}
                                colorStyle="red-without-border"
                                className={isShowMore ? "fin_article_large_button " : 'fin_article_large_button button_clicked'}
                            >
                                {isShowMore ? t("company_page.button_show_less") : t("company_page.button_read_more")}
                            </Button>
                        )}
                    </li>
                </section>

    );
};

export default memo(FinArticle);
