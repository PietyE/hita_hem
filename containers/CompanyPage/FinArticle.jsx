import React, {useEffect, useRef, useState} from "react";
import Button from "components/ui/Button";
import {useMediaQueries} from "@react-hook/media-query";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import {useTranslation} from "react-i18next";
import {getCorrectImage, getImgMeta, getImageAltText} from "../../utils/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

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
    const {title, description, images, image, image_alter_text} = item;
    const img = getCorrectImage(images)
    const altText = getImageAltText(images)

    const contentRef = useRef();
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const [itemClass, setItemClass] = useState('fin_article')
    const [imageMeta, setImageMeta] = useState({})
    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    useEffect(() => {
        getImgMeta(image || img, setImageMeta)
    }, [])

    useEffect(() => {
        if (!isShowButton) {
            setItemClass('fin_article')
        } else {
            if (isShowMore) {
                setItemClass('fin_article')
            } else {
                setItemClass('fin_article_fade')
            }
        }
    }, [isShowMore, isShowButton])
    const blockHeight = contentRef?.current?.offsetHeight

    useEffect(() => {
       if(!description){
           setIsShowButton(false)
       }else{
           if (matchesAll) {

               let timerId = setInterval(() => {
                   if (blockHeight !== 0 && blockHeight !== 450) {
                       setIsShowButton(blockHeight > 450);
                   }
               }, 100);

               if (contentRef?.current?.offsetHeight === 450) {
                   setTimeout(() => clearInterval(timerId), 50);
               }

               return () => clearInterval(timerId);
           }

           if (!matchesAll) {
               if (blockHeight !== 0 && blockHeight !== 450) {
                   setIsShowButton(blockHeight > 450);
               }
           }
       }

    }, [description, matchesAll,blockHeight]);

    const _handleClickShowMore = () => {
        setIsShowMore((prev) => !prev);
        if (isShowMore) {
            contentRef.current.scrollIntoView({block: "start"});
            const scrolled = window.scrollY
            window.scrollTo({top: scrolled - 160})
        }
    };

    return (
        <section className="fin_article_wrapper">
            <SimpleReactLightbox>
                <SRLWrapper options={options}>
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
                        {(!!image || !!img) && (
                            <Image
                                src={image || img}
                                layout="responsive"
                                width={imageMeta?.width || 192}
                                height={imageMeta?.height || 108}
                                className='fin_article_image'
                                alt={image_alter_text || altText}
                            />
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
                </SRLWrapper>
            </SimpleReactLightbox>
        </section>
    );
};

export default FinArticle;
