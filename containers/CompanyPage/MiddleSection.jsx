import React, {useCallback, memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import dynamic from "next/dynamic";

// import TabBar from "components/ui/TabBar";
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
    getCompanyIndustryTitleSelector, getCompanyLogoUrlSelector, getCompanyNameSelector,
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
import {getCompanyLogoAltTextSelector, getCompanySubTitleSelector} from "../../redux/reducers/companies";
import ImageComponent from "../../components/ui/ImageComponent";
import throttle  from "lodash/throttle"

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
    const logo = useSelector(getCompanyLogoUrlSelector)
    const alter_text = useSelector(getCompanyLogoAltTextSelector)
    const sectionRef = useRef();
    const sectionsContainerRef = useRef()

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


    const [visible, setVisible] = useState(false);
    const [canChangeTab, setCanChangeTab] = useState(false)

    useEffect(() => {
        if (canChangeTab && !matchesAll) {
            switch (selectedTab) {
                case companyTabConstants.OVERVIEW:
                    _changeCompanuTab(companyTabConstants.IDEA)
                    break;
                case companyTabConstants.IDEA:
                    _changeCompanuTab(companyTabConstants.TEAM)

                    break;
                case companyTabConstants.TEAM:
                    _changeCompanuTab(companyTabConstants.FIN_INFO)

                    break;
                case companyTabConstants.FIN_INFO:
                    _changeCompanuTab(companyTabConstants.FAQ)

                    break;
                case companyTabConstants.FAQ:

                    break;
                default:
                    // return
            }
        }
        setCanChangeTab(false)

    }, [canChangeTab,matchesAll])


    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        // const documentHeight = document.documentElement.offsetHeight;
        // const clientHeight = document.documentElement.clientHeight;
        //change tab when scrolling to the bottom of page
        // if (clientHeight + scrolled + 1 > documentHeight) {
        //     setCanChangeTab(true)
        // }
        //mobile - scroll to top when changing tab
        const projectInfoHeight = sectionRef?.current?.offsetHeight
        const previousSibling = sectionRef?.current?.previousSibling?.offsetHeight
        if (matchesAll) {
            if (scrolled > projectInfoHeight + previousSibling) {
                setVisible(false)
            } else if (scrolled < projectInfoHeight + previousSibling - 160) {
                setVisible(true)
            }
        }

    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }
        setVisible(true)
    }, [selectedTab])


    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    const [showFaq, setShowFaq] = useState(false)

    const _faqBlock = !showFaq ? {display: 'none'} : {}
    const _notFaqBlock = showFaq ? {display: 'none'} : {}

    const handleClickFaqTab = () => {
        if(!showFaq){
            setShowFaq(true)
        }
    }

    const handleClickNotFaqTab = () => {
        if(showFaq){
            setShowFaq(false)
        }
    }


    useEffect(()=>{

        let menuElementsList = []
        let sectionsList = []
        if(typeof window !== 'undefined') {
            menuElementsList = document.querySelectorAll('.tab_bar_item')
        }

        if(typeof window !== 'undefined') {
            sectionsList = document.querySelectorAll('.campaigns_section')
        }
        const sectionsTracking = () => {
            const currentSectionIndex = [...sectionsList].reduceRight((acc,el,i)=>{
                if(el.offsetHeight + el.offsetTop - 135 >= window.scrollY){
                    acc = i
                }
                return acc
            },3)

                menuElementsList.forEach(el=>el.classList.remove('selected'), {passive:true})
                menuElementsList[currentSectionIndex].classList.add('selected')

        }

        sectionsTracking()
        window.addEventListener("scroll", throttle(sectionsTracking, 250))

        return () => {
            window.removeEventListener("scroll", sectionsTracking)
        }
    },[])



    return (
        <div className="middle_section_container">
            <div className="middle_tabbr_container">
                <div className='middle_tabbr_title_wrapper'>
                    {logo && (
                        <ImageComponent
                            src={logo}
                            alt={alter_text || ' '}
                            className='middle_section_logo'
                        />
                    )}

                    {campaignName && (
                        <h1 className='middle_section_title'>{campaignName}</h1>
                    )}
                </div>

                {subTitle && (
                    <p className='middle_section_subtitle'>{subTitle}</p>
                )}
                {!matchesAll &&
                <div className="company_info_sig">
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
                                type="campaign_socials"
                            />
                        )}

                    </div>

                </div>

                }
                <nav className="middle_tabbr_wrapp" >

                    {/*<TabBar*/}
                    {/*    data={[*/}
                    {/*        {name: t("tab_accordion.OVERVIEW"), key: companyTabConstants.OVERVIEW},*/}
                    {/*        {name: t("tab_accordion.Idea"), key: companyTabConstants.IDEA},*/}
                    {/*        {name: t("tab_accordion.Team"), key: companyTabConstants.TEAM},*/}
                    {/*        {*/}
                    {/*            name: t("tab_accordion.Financial_information"),*/}
                    {/*            key: companyTabConstants.FIN_INFO,*/}
                    {/*        },*/}
                    {/*        {name: t("tab_accordion.FAQ"), key: companyTabConstants.FAQ},*/}

                    {/*    ]}*/}
                    {/*    onClick={_changeCompanuTab}*/}
                    {/*    selectedKey={selectedTab}*/}
                    {/*    className="middle_tabbr"*/}
                    {/*/>*/}
                        <ul className='tab_bar_container middle_tabbr'>
                            <li className='tab_bar_item' onClick={handleClickNotFaqTab}>
                                <a href="#Overview" className='tab_bar_item_button'>Overview</a>
                                <span className="vertical_line"></span>

                            </li>
                            <li className='tab_bar_item' onClick={handleClickNotFaqTab}>
                                <a href="#Idea" className='tab_bar_item_button'>Idea</a>
                            </li>
                            <li className='tab_bar_item' onClick={handleClickNotFaqTab}>
                                <a href="#Team" className='tab_bar_item_button'>Team</a>
                            </li>
                            <li className='tab_bar_item' onClick={handleClickNotFaqTab}>
                                <a href="#FinancialInformation" className='tab_bar_item_button'>FinancialInformation</a>
                            </li>
                            <li className='tab_bar_item'  onClick={handleClickFaqTab}>
                                <a href="#Faq" className='tab_bar_item_button'>Faq</a>
                            </li>
                        </ul>
                </nav>
                    <div style={_notFaqBlock} ref = {sectionsContainerRef}>
                        <section id='Overview' className='campaigns_section'>
                            <Overview/>
                        </section>
                        <section id='Idea' className='campaigns_section'>


                            {!isAuth ?(
                                <>
                                    <h2 className='campaign_guest_title'>Idea title</h2>
                                    <CampaignTabSignUp/>
                                </>
                            ) :(
                                <>
                                    {!isQuizPassed ? (
                                        <>
                                            <h2 className='campaign_guest_title'>Idea title</h2>
                                            <CampaignTabQuizRequest/>
                                        </>

                                    )
                                        :
                                        <Idea/>
                                    }
                                </>
                            )}
                        </section>
                        <section id='Team' className='campaigns_section'>
                            {!isAuth ?(
                                <>
                                    <h2 className='campaign_guest_title'>Team title</h2>
                                    <CampaignTabSignUp/>
                                </>
                            ) :(
                                <>
                                    {!isQuizPassed ? (
                                            <>
                                                <h2 className='campaign_guest_title'>Team title</h2>
                                                <CampaignTabQuizRequest/>
                                            </>

                                        )
                                        :
                                        <Team/>
                                    }
                                </>
                            )}
                        </section>
                        <section id='FinancialInformation' className='campaigns_section'>
                            {!isAuth ?(
                                <>
                                    <h2 className='campaign_guest_title'>FinancialInformation title</h2>
                                    <CampaignTabSignUp/>
                                </>
                            ) :(
                                <>
                                    {!isQuizPassed ? (
                                            <>
                                                <h2 className='campaign_guest_title'>FinancialInformation title</h2>
                                                <CampaignTabQuizRequest/>
                                            </>

                                        )
                                        :
                                        <FinancialInformation/>
                                    }
                                </>
                            )}
                        </section>
                    </div>
                <section id='Faq' style={_faqBlock}  className='campaigns_section'>
                    {!isAuth ?
                        <CampaignTabSignUp/>
                     :
                        <>
                            {!isQuizPassed ? <CampaignTabQuizRequest/> : <Faq/> }
                        </>
                    }
                </section>
            </div>

            <div className='middle_mobile_header_container'>
                <div className='middle_tabbr_title_wrapper'>
                    {logo && (
                        <ImageComponent
                            src={logo}
                            alt={alter_text || ' '}
                            className='middle_section_logo'
                        />
                    )}
                    {campaignName && (
                        <h1 className='middle_section_title'>{campaignName}</h1>
                    )}
                </div>
                {subTitle && (
                    <p className='middle_section_subtitle'>{subTitle}</p>
                )}
            </div>


            <ProjectInvestInfoSection isAuth={isAuth} sectionRef={sectionRef} isVisible={visible}
                                      matchesAll={matchesAll} type='mobile'/>

            <div
                className=" middle_mobile_tabbr_container">

                <TabAccordion isAuth={isAuth} isQuizPassed={isQuizPassed}/>
            </div>
        </div>
    );
};

// const TabContent = memo(({selectedTab, isAuth, isQuizPassed}) => {
//     const renderTabIFauts = (Сomponent) => {
//         if (!isAuth) {
//             return <CampaignTabSignUp/>
//         } else {
//             if (!isQuizPassed) {
//                 return <CampaignTabQuizRequest/>
//             } else {
//                 return <Сomponent/>
//             }
//         }
//     };
//
//     switch (selectedTab) {
//         case companyTabConstants.OVERVIEW:
//             return <Overview/>;
//         case companyTabConstants.IDEA:
//             return renderTabIFauts(Idea);
//         case companyTabConstants.TEAM:
//             return renderTabIFauts(Team);
//         case companyTabConstants.FIN_INFO:
//             return renderTabIFauts(FinancialInformation);
//         case companyTabConstants.FAQ:
//             return renderTabIFauts(Faq);
//
//         default:
//             return null;
//     }
// });




export default MiddleSection;
