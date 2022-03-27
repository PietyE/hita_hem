import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "react-i18next";

import StatusCompanyBadge from "../StatusCompany";
import Progress from "../Proggres";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const CampaignsCard = (props) => {
  const { t } = useTranslation();
  const { className } = props;
  const {
    logo,
    status,
    title,
    short_description,
      image,
      slug,
    percentage,
    left_date
  } = props?.content;
  const lang = useSelector(getSelectedLangSelector)

  return (
    <>
      {!!props?.content && (
          <Link
              as={lang === 'sv'?`/foretag/${slug}`:`/company/${slug}`}
              href={lang === 'sv'?"/foretag/[companyId]":"/company/[companyId]"}
              // as={`/foretag/${slug}`}
              // href={"/foretag/[companyId]"}
              prefetch={false}
          >
        <li className={`campaigns_card ${className}`} >

            <div className='campaigns_card_image' style={{  position: 'relative'}}>
              {image && (
                  <Image
                  src = {image}
                  layout = "fill"
                  objectFit = "cover"
                  priority = {true}

              />)}
            </div>
            <span className="campaigns_card_logo" >
              {/*<img*/}
              {/*  className="featured_campaigns_logo_img"*/}
              {/*  src={logo}*/}
              {/*  alt="campaigns_logo"*/}
              {/*  loading="lazy"*/}
              {/*/>*/}
              <div className="featured_campaigns_logo_img" style={{  position: 'relative'}}>
                 <Image

                     src={logo}
                     layout="fill"
                     objectFit="cover"
                     // priority={true}

                 />
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
            />

            {/*{isAuth && (*/}
            {/*    <div className = "campaigns_card_target">*/}
            {/*  <p className = "campaigns_card_target_title">*/}
            {/*    {t("campaigns_card.target_title")}*/}
            {/*  </p>*/}
            {/*  <p className = "campaigns_card_target_value">*/}
            {/*    {currency} {moneyFormat.format(goal)}*/}
            {/*  </p>*/}
            {/*</div>)}*/}

            {/*<Button*/}
            {/*  colorStyle="outline-green"*/}
            {/*  className="campaigns_card_button"*/}
            {/*  as={LinkStyled}*/}
            {/*  to={`/foretag/${pk}`}*/}
            {/*  title="This link leads to the foretag detail page"*/}
            {/*>*/}
            {/*  {t("campaigns_card.button")}*/}
            {/*</Button>*/}
          </div>
        </li>
           </Link>
      )}
    </>
  );
};

// const LinkStyled = (props) => {
//   const router = useRouter();
//   const { children, to = "", ...extra } = props;
//
//   const handleClickLinkButton = () => {
//     router.push(to);
//   };
//
//   return (
//     <button onClick={handleClickLinkButton} type="button">
//       <span {...extra}>{children}</span>
//     </button>
//   );
// };

export default CampaignsCard;
