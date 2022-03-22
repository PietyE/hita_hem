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
import {getCompanyTabSelected} from "redux/reducers/companies";
import {useTranslation} from "react-i18next";
import ProjectInvestInfoSection from "./ProjectInvestInfoSection";
import {useMediaQueries} from "@react-hook/media-query";

const MiddleSection = ({isAuth}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectedTab = useSelector(getCompanyTabSelected);

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
        const middleSectionHeight = middleSectionRef?.current?.offsetHeight
        const projectInfoHeight = sectionRef?.current?.offsetHeight
        if (matchesAll) {
            if (scrolled > projectInfoHeight) {
                setVisible(false)
            } else if (scrolled < projectInfoHeight) {
                setVisible(true)
            }
        } else {
            if (middleSectionHeight - scrolled < projectInfoHeight) {
                setVisible(false)
            } else if (middleSectionHeight - scrolled > projectInfoHeight) {
                setVisible(true)
            }
        }

    };

// const [sectionHeightStyle, setSectionHeightStyle] = useState({})
//
//     useEffect(()=>{
//         const middleSectionHeight = middleSectionRef?.current?.offsetHeight
//         const projectInfoHeight = sectionRef?.current?.offsetHeight
// console.log('middleSectionHeight',middleSectionHeight)
//         console.log('projectInfoHeight',projectInfoHeight)
//         if(middleSectionHeight < projectInfoHeight ){
//             setSectionHeightStyle({minHeight: projectInfoHeight+75 + 'px'})
//         }
//         return ()=>{
//             setSectionHeightStyle({})
//         }
//
//     },[selectedTab])

    const sectionRef = useRef();
    const middleSectionRef = useRef();

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    return (
        <div className="middle_section_container" ref={middleSectionRef}>
            <div className="middle_tabbr_container">
                <h1 className='middle_section_title'>Be like Bob</h1>
                <p className='middle_section_subtitle'>Vi brinner for battre betting!</p>
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
                <TabContent selectedTab={selectedTab} isAuth={isAuth}/>
            </div>
            <ProjectInvestInfoSection isAuth={isAuth} sectionRef={sectionRef} isVisible={visible}/>

            <div
                className={visible ? " middle_mobile_tabbr_container" : "middle_mobile_tabbr_container middle_mobile_tabbr_container_shifted"}>
                <TabAccordion isAuth={isAuth}/>
            </div>
        </div>
    );
};

const TabContent = memo(({selectedTab, isAuth}) => {
    const renderTabIFauts = (Сomponent) => {
        return isAuth ? <Сomponent/> : <CampaignTabSignUp/>;
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
