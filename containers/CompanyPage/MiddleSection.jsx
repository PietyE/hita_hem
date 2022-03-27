import React, {useCallback, memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import dynamic from "next/dynamic";

import TabBar from "components/ui/TabBar";
import Overview from "./Overview";
import TabAccordion from "components/ui/TabAccordion";

const Idea = dynamic(() =>
    import("./Idea"), {ssr: false}
);
const Team = dynamic(() =>
    import("./Team"), {ssr: false}
);
const FinancialInformation = dynamic(() =>
    import("./FinancialInformation"), {ssr: false}
);
const Faq = dynamic(() =>
    import("./Faq"), {ssr: false}
);
const CampaignTabSignUp = dynamic(() =>
    import("./CampaignTabSignUp"), {ssr: false}
);


import {companyTabConstants} from "constants/companyTabConstant";
import {setSelectedTab} from "redux/actions/companies";
import {
    getCompanyIndustryTitleSelector, getCompanyNameSelector,
    getCompanyTabSelected,
    getCountryTitleSelector, getSocialsCompanySelector, getWebSiteCompanySelector
} from "redux/reducers/companies";
import {useTranslation} from "react-i18next";
import ProjectInvestInfoSection from "./ProjectInvestInfoSection";
import {useMediaQueries} from "@react-hook/media-query";
import {getQuizIsPassedSelector} from "redux/reducers/user";
import CampaignTabQuizRequest from "./CampaignTabQuizRequest";
import InfoWithTitle from "../../components/ui/InfoWithTitle";
import SocialTab from "../../components/ui/SocialTab";
import isEqual from "lodash/isEqual";
import {getCompanySubTitleSelector} from "../../redux/reducers/companies";

const MiddleSection = ({isAuth}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectedTab = useSelector(getCompanyTabSelected);
    const isQuizPassed = useSelector(getQuizIsPassedSelector)
    const industryTitle = useSelector(getCompanyIndustryTitleSelector);
    const countryTitle = useSelector(getCountryTitleSelector);
    const webSite = useSelector(getWebSiteCompanySelector);
    const socials = useSelector(getSocialsCompanySelector, isEqual);
    const subTitle = useSelector(getCompanySubTitleSelector)
    const campaignName = useSelector(getCompanyNameSelector)

    const sectionRef = useRef();

    const _changeCompanuTab = useCallback(
        (key) => {
            dispatch(setSelectedTab(key));
        },
        [dispatch]
    );


    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-width: 900px)",
    });



    const [visible, setVisible] = useState(true);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        const projectInfoHeight = sectionRef?.current?.offsetHeight
        if (matchesAll) {
            if (scrolled > projectInfoHeight) {
                setVisible(false)
            } else if (scrolled < projectInfoHeight) {
                setVisible(true)
            }
        }

    };

    useEffect(()=>{
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }
        setVisible(true)
    },[selectedTab])






    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    return (
        <div className="middle_section_container">
            <div className="middle_tabbr_container">
                {campaignName &&(
                    <h1 className='middle_section_title'>{campaignName}</h1>
                )}
                {subTitle && (
                    <p className='middle_section_subtitle'>{subTitle}</p>
                )}
                { !matchesAll &&
                <div className="company_info_sig">
                    {/*<h2 className='company_info_sig_title'>{t("company_page.company_info.title")}</h2>*/}
                    <div className='company_info_sig_wrapper'>
                        {industryTitle && (
                            <InfoWithTitle
                                title={t("company_page.company_info.Industry")}
                                info={industryTitle}
                                classNameContainer="company_info_sig_item"
                            />
                        )}
                        {countryTitle && (
                            <InfoWithTitle
                                title={t("company_page.company_info.Location")}
                                info={countryTitle}
                                classNameContainer="company_info_sig_item"
                            />
                        )}
                        {webSite && (
                            <InfoWithTitle
                                title={t("company_page.company_info.Website")}
                                info={webSite}
                                href={webSite}
                                isLink
                                classNameContainer="company_info_sig_item company_info_sig_item_last "
                            />
                        )}
                        {socials && (
                            <SocialTab
                                socials={socials}
                                classNameContainer="company_info_social"
                            />
                        )}

                    </div>

                </div>

                }
                <div className="middle_tabbr_wrapp">

                    <TabBar
                        data={[
                            {name: t("tab_accordion.OVERVIEW"), key: companyTabConstants.OVERVIEW},
                            {name: t("tab_accordion.Idea"), key: companyTabConstants.IDEA},
                            {name: t("tab_accordion.Team"), key: companyTabConstants.TEAM},
                            {
                                name: t("tab_accordion.Financial_information"),
                                key: companyTabConstants.FIN_INFO,
                            },
                            {name: t("tab_accordion.FAQ"), key: companyTabConstants.FAQ},

                        ]}
                        onClick={_changeCompanuTab}
                        selectedKey={selectedTab}
                        className="middle_tabbr"
                    />
                </div>
                <TabContent selectedTab={selectedTab} isAuth={isAuth} isQuizPassed={isQuizPassed}/>
            </div>

                <div className='middle_mobile_header_container'>
                    {campaignName &&(
                        <h1 className='middle_section_title'>{campaignName}</h1>
                    )}
                    {subTitle && (
                        <p className='middle_section_subtitle'>{subTitle}</p>
                    )}
                </div>


            <ProjectInvestInfoSection isAuth={isAuth} sectionRef={sectionRef} isVisible={visible} matchesAll={matchesAll}/>

            <div
                className={visible ? " middle_mobile_tabbr_container" : "middle_mobile_tabbr_container middle_mobile_tabbr_container_shifted"}>

                <TabAccordion isAuth={isAuth}/>
            </div>
        </div>
    );
};

const TabContent = memo(({selectedTab, isAuth, isQuizPassed}) => {
    const renderTabIFauts = (Сomponent) => {
        if(!isAuth){
            return <CampaignTabSignUp/>
        }else{
            if(!isQuizPassed){
                return <CampaignTabQuizRequest/>
            }else{
                return <Сomponent/>
            }
        }
    };

    switch (selectedTab) {
        case companyTabConstants.OVERVIEW:
            return <Overview/>;
        case companyTabConstants.IDEA:
            return <Idea/>;
        case companyTabConstants.TEAM:
            return renderTabIFauts(Team);
        case companyTabConstants.FIN_INFO:
            return renderTabIFauts(FinancialInformation);
        case companyTabConstants.FAQ:
            return renderTabIFauts(Faq);

        default:
            return null;
    }
});

export default MiddleSection;
