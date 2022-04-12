import React, {useEffect, useRef, useState} from "react";
import Button from "components/ui/Button";
import {useMediaQueries} from "@react-hook/media-query";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import {useTranslation} from "react-i18next";
import {getCorrectImage} from "../../utils/utils";
// import Image from "next/image";
import ImageComponent from "../../components/ui/ImageComponent";

const FinArticle = ({item}) => {
    const {title, description, images} = item;

    const {t} = useTranslation();
    const img = getCorrectImage(images)

    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    const contentRef = useRef();

    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const [itemClass, setItemClass] = useState('fin_article')

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

    useEffect(() => {
        if (matchesAll) {

            let timerId = setInterval(() => {
                const blockHeight = contentRef?.current?.offsetHeight

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
            const blockHeight = contentRef?.current?.offsetHeight

            if (blockHeight !== 0) {
                setIsShowButton(blockHeight > 450);
            }
        }

    }, [matchesAll]);

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
            <li className={itemClass}
                ref={contentRef}
            >
                <div className= "fin_article_text_wrapper">
                    <h3 className="fin_article_title">{title}</h3>
                    <span
                        className="fin_article_text"
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(description),
                        }}
                    />
                </div>
                {!!img && (
                    <ImageComponent
                        className="fin_article_image"
                        src={img}
                        alt={img ? 'article image' : ' '}
                    />
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

export default FinArticle;
