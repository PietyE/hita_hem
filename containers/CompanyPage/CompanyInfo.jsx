import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";

import InfoWithTitle from "components/ui/InfoWithTitle";
import SocialTab from "components/ui/SocialTab";
import Title from "components/ui/Title";

import {
    getCompanyLogoUrlSelector,
    getCompanyNameSelector,
    getCompanyIndustryTitleSelector,
    getCountryTitleSelector,
    getWebSiteCompanySelector,
    getSocialsCompanySelector,
} from "redux/reducers/companies";
import Image from "next/image";
import {getCompanyLogoAltTextSelector} from "../../redux/reducers/companies";

const CompanyInfo = () => {
    const {t} = useTranslation();

    const logoUrl = useSelector(getCompanyLogoUrlSelector);
    const companyName = useSelector(getCompanyNameSelector);
    const industryTitle = useSelector(getCompanyIndustryTitleSelector);
    const countryTitle = useSelector(getCountryTitleSelector);
    const webSite = useSelector(getWebSiteCompanySelector);
    const socials = useSelector(getSocialsCompanySelector, isEqual);
    const logoAltText = useSelector(getCompanyLogoAltTextSelector);
    return (
        <div className="company_info_container">
            <div className="company_info_logo" style={{position: 'relative'}}>
                {logoUrl &&
                (<Image
                    src={logoUrl}
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    alt={logoAltText}
                />)}
            </div>
            <div className="company_info_sig_container">
                <Title title={companyName} className="company_name"/>
                <div className="company_info_sig">
                    <InfoWithTitle
                        title={t("company_page.company_info.Industry")}
                        info={industryTitle}
                        classNameContainer="company_info_sig_item"
                    />
                    <InfoWithTitle
                        title={t("company_page.company_info.Location")}
                        info={countryTitle}
                        classNameContainer="company_info_sig_item"
                    />
                    <InfoWithTitle
                        title={t("company_page.company_info.Website")}
                        info={webSite}
                        href={webSite}
                        isLink
                        classNameContainer="company_info_sig_item company_info_sig_item_last "
                    />
                    <SocialTab
                        socials={socials}
                        classNameContainer="company_info_social"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
