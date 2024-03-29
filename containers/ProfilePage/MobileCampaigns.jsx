import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedLangSelector} from "redux/reducers/language";
import {
    AccordionComponent,
    AccordionCollapse,
    AccordionToggle,
    CardComponent,
    CardBody,
    CardHeader,
} from "../../components/ui/AccordionComponent";
import IconComponent from "components/ui/IconComponent";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import startCase from "lodash/startCase";
import {convertStatusToText} from "utils/utils";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {getUrlForMyCampaigns} from "utils/utils";
import {RAISE_ROUTE, RAISE_ROUTE_EN} from "../../constants/routesConstant";
import {useRouter} from "next/router";
import {setScrollToForm} from "../../redux/actions/raisePage";

const MobileCampaigns = ({data}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const moneyFormat = useMoneyFormat()
    const currentLanguage = useSelector(getSelectedLangSelector);
    const [activeTab, setActiveTab] = useState(null);

    const _setScrollToForm = useCallback(
        (data) => {
            dispatch(setScrollToForm(data));
        },
        [dispatch]
    );

    const handleTabClick = (e) => {
        if (activeTab === e.target.dataset.value) {
            setActiveTab(null);
            return;
        }
        setActiveTab(e.target.dataset.value);
    };
    const handleRedirectToRisePage = (e) => {
        e.preventDefault()
        router.push(currentLanguage === 'sv' ? RAISE_ROUTE : RAISE_ROUTE_EN)
        _setScrollToForm(true)
    }
    return (
        <>
            {(!data || data?.length === 0) && (
                <p className='mobile_empty_list_text'>{t("profile_page.campaigns.empty_campaigns_list_text")}
                    <a className='mobile_empty_list_link'
                       href='/'
                       onClick={handleRedirectToRisePage}
                    >
                        {t("profile_page.campaigns.empty_campaigns_list_link")}
                    </a>
                </p>
            )
            }
            <AccordionComponent className="mobile_investments_container">
                {data?.length > 0 &&
                data?.map((campaign, index) => {
                    const dataOptions = {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    };
                    const _startDayLocal = new Date(campaign.start_date).toLocaleString(
                        currentLanguage,
                        dataOptions
                    );
                    const _endDayLocal = new Date(campaign.start_date).toLocaleString(
                        currentLanguage,
                        dataOptions
                    );

                    const {link, text_link} = getUrlForMyCampaigns(currentLanguage, campaign)


                    let _status = startCase(
                        convertStatusToText(campaign.status, currentLanguage).toLocaleLowerCase()
                    );
                    return (
                        <CardComponent key={index} className="mobile_investments_card">
                            <AccordionToggle
                                as={CardHeader}
                                eventKey={index + 1}
                                data-value={index + 1}
                                onClick={handleTabClick}
                                className="mobile_investments_toggle"
                            >
                  <span className="mobile_investments_toggle_name">
                    {index + 1}
                      {". "}
                      {campaign.name}
                  </span>
                                <span className="tab_accordion_chevron">
                    <IconComponent
                        icon={
                            Number(activeTab) === index + 1
                                ? faChevronDown
                                : faChevronRight
                        }
                    />
                  </span>
                            </AccordionToggle>
                            <AccordionCollapse eventKey={index + 1}>
                                <CardBody className="mobile_investments_item">
                                    <p className="mobile_investments_field mobile_investments_item_link">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.link")}
                      </span>
                                        <a href={link} className="mobile_investments_field_link">
                                            {text_link}
                                        </a>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_amount">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.start_date")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {_startDayLocal}
                      </span>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.end_date")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {_endDayLocal}
                      </span>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.status")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {_status}
                      </span>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.campaigns.raised")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {campaign?.invested_currency} {moneyFormat.format(campaign?.invested)}
                      </span>
                                    </p>
                                </CardBody>
                            </AccordionCollapse>
                        </CardComponent>
                    );
                })}
            </AccordionComponent>
        </>
    );
};

export default MobileCampaigns;
