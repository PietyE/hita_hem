import React from "react";
import Link from "next/link";
import Image from "next/image";

import {useTranslation} from "react-i18next";
import {getImageAltText} from "../../utils/utils";

import StatusCompanyBadge from "../StatusCompany";
import Progress from "../Proggres";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import isEmpty from "lodash/isEmpty";

const CampaignsCard = (props) => {
    const {t} = useTranslation();
    const {className} = props;
    const {
        logo,
        status,
        title,
        short_description,
        image,
        images,
        slug,
        percentage,
        left_date,
        type
    } = props?.content;
    const lang = useSelector(getSelectedLangSelector)
    const altText = getImageAltText(images)

    let cardImage = null
    if (images && !isEmpty(images)) {
        cardImage = images['desktop'] || images['laptop'] || images['mobile']
    } else if (images && isEmpty(images) && image) {
        cardImage = image
    } else if (!images && image) {
        cardImage = image

    }

    const _cardClassName = type === 1 ? 'campaigns_card' : 'campaigns_card_small'

    return (
        <>
            {!!props?.content && (
                <Link
                    as={lang === 'sv' ? `/foretag/${slug}` : `/company/${slug}`}
                    href={lang === 'sv' ? "/foretag/[companyId]" : "/company/[companyId]"}
                    prefetch={false}
                >
                    <li className={`${_cardClassName} ${className}`}>

                        <div className='campaigns_card_image' style={{position: 'relative'}}>
                            {cardImage && (
                                <Image
                                    src={cardImage}
                                    layout="fill"
                                    objectFit="cover"
                                    loading='lazy'
                                    alt={altText}
                                    placeholder="blur"
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                />)}
                        </div>
                        <span className="campaigns_card_logo">
              <div className="featured_campaigns_logo_img" style={{position: 'relative'}}>
                  {logo &&
                  <Image
                      src={logo}
                      layout="fill"
                      objectFit="cover"
                      alt={altText !== ' ' ? altText + ' ' + 'logo' : 'logo' }
                      loading='lazy'
                  />
                  }
              </div>

            </span>

                        <StatusCompanyBadge
                            status={status}
                            classNameContainer="campaigns_card_status"
                            percentage={percentage}
                        />

                        <div className="campaigns_card_content_wrapper">

                            <div className="campaigns_card_text_wrapper">

                                <h3 className="campaigns_card_title">{title}</h3>
                                <p className="campaigns_card_description">{short_description}</p>
                            </div>
                                <Progress
                                    title={t("campaigns_card.progress_title")}
                                    percent={percentage}
                                    className='card_progress'
                                    leftDate={left_date}
                                    type={type}
                                />

                        </div>
                    </li>
                </Link>
            )}
        </>
    );
};

export default CampaignsCard;
