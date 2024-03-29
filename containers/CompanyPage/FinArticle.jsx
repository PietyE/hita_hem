import React, {useEffect, useRef, useState, memo} from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import Button from "components/ui/Button";
import {SRLWrapperComponent,SimpleReactLightboxComponent} from "components/ui/SimpleReactLightboxComponent";
import {useMediaQueries} from "@react-hook/media-query";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";

const options = {
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
    const {title, description, image, image_alter_text,image_height, image_width} = item;

    const contentRef = useRef();
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

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
                                width={image_width || 0}
                                height={image_height || 0}
                                className='fin_article_image'
                                alt={image_alter_text}
                                loading='lazy'
                                placeholder="blur"
                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
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
