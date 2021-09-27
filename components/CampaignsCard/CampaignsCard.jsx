import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "react-i18next";

import ImageComponent from "../ui/ImageComponent";
import StatusCompanyBadge from "../StatusCompany";
import IconBag from "public/images/icon_bag.svg";
import IconLocation from "public/images/icon_location.svg";
import Progress from "../Proggres";
import SplitLine from "../ui/SplitLine";
import Button from "../ui/Button";
import { convertStatusToText } from "utils/utils";

const LinkStyled = (props) => {
  const { children, to = "", asHref = '/', ...extra } = props;
  return (
      <Link href={asHref} as={to} prefetch={false}>
        <a {...extra}>{children}</a>
      </Link>
  );
};

const CampaignsCard = (props) => {

  const { t } = useTranslation();

  const { className } = props;
  const {
    id,
    logo,
    status,
    country,
    industry,
    title,
    short_description,
    card_image,
    header_image,
    goal,
    currency,
    percentage,
  } = props?.content;



  const diff = new Date(props?.content?.end_date) - new Date();
  const leftDays = Math.floor(diff / (1000 * 3600 * 24));
  return (
    <>
      {props?.content && (
        <li className={`campaigns_card ${className}`}>
          <Link as = {`/company/${id}`} href={"/company/[companyId]"} prefetch={false}>

          <ImageComponent
            className="campaigns_card_image"
            src={card_image || header_image}
            alt="company_foto"
          />
          </Link>
          <Link as = {`/company/${id}`} href={"/company/[companyId]"} prefetch={false}>
          <span className="campaigns_card_logo">
            <img
              className="featured_campaigns_logo_img"
              src={logo}
              alt="campaigns_logo"
              loading="lazy"
            />
          </span>
          </Link>

          <StatusCompanyBadge
            status={convertStatusToText(status).toLocaleLowerCase()}
            classNameContainer="campaigns_card_status"
          />

          <div className="campaigns_card_content_wrapper">
            <div className="campaigns_card_links_wrapper">
              <Image
                src={IconBag}
                alt="icon_bag"
                className="campaigns_card_icon"
              />
              <span className="campaigns_card_industry">{industry?.title}</span>
              <Image
                src={IconLocation}
                alt="icon_location"
                className="campaigns_card_icon"
              />
              <span className="campaigns_card_location">{country}</span>
            </div>

            <div className="campaigns_card_text_wrapper">
              <Link as = {`/company/${id}`} href={"/company/[companyId]"} prefetch={false}>
              <h3 className="campaigns_card_title">{title}</h3>
              </Link>
              <p className="campaigns_card_description">{short_description}</p>
            </div>

            <SplitLine className="campaigns_card_split_line" />

            <Progress
              title={t("campaigns_card.progress_title")}
              percent={percentage}
              dayLeft={leftDays}
              status={status}
            />
            <div className="campaigns_card_target">
              <p className="campaigns_card_target_title">
                {t("campaigns_card.target_title")}
              </p>
              <p className="campaigns_card_target_value">
                {currency} {goal}
              </p>
            </div>
            <Button
              colorStyle="outline-green"
              className="campaigns_card_button"
              as={LinkStyled}
              to={`/company/${id}`}
              asHref={"/company/[companyId]"}
            >
              {t("campaigns_card.button")}
            </Button>
          </div>
        </li>
      )}
    </>
  );
};

export default CampaignsCard;
