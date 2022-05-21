import React, {useState} from "react";
import {
    AccordionComponent,
    AccordionCollapse,
    AccordionToggle,
    CardComponent,
    CardBody,
    CardHeader ,
} from "../../components/ui/AccordionComponent";
import ButtonStyled from "components/ui/Button";
import IconComponent from "components/ui/IconComponent";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "redux/reducers/language";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {getUrlForMyInvestments} from 'utils/utils'
import {INVEST_ROUTE, INVEST_ROUTE_EN} from "../../constants/routesConstant";
import {useRouter} from "next/router";

const MobileInvestment = ({data}) => {
    const {t} = useTranslation();
    const currentLanguage = useSelector(getSelectedLangSelector);
    const moneyFormat = useMoneyFormat()
    const router = useRouter();


    const [activeTab, setActiveTab] = useState(null);
    const handleTabClick = (e) => {
        if (activeTab === e.target.dataset.value) {
            setActiveTab(null);
            return;
        }
        setActiveTab(e.target.dataset.value);
    };

    const handleRedirectToRisePage = (e) => {
        e.preventDefault()
        router.push(currentLanguage === 'sv' ? INVEST_ROUTE : INVEST_ROUTE_EN)
    }
    return (
        <>
            {(!data || data?.length === 0) && (
                <p className='mobile_empty_list_text'>{t("profile_page.investments.empty_investments_list_text")}
                    <a className='mobile_empty_list_link'
                       href='/'
                       onClick={handleRedirectToRisePage}
                    >
                        {t("profile_page.investments.empty_investments_list_link")}
                    </a>
                </p>
            )
            }
            <AccordionComponent className="mobile_investments_container">
                {data?.length > 0 &&
                data?.map((payment, index) => {

                    const {link, text_link} = getUrlForMyInvestments(currentLanguage, payment)
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
                      {payment.company_name}
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
                        {t("profile_page.investments.link")}
                      </span>
                                        <a href={link} className="mobile_investments_field_link">
                                            {text_link}
                                        </a>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_amount">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.investments.amount")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {payment.amount_currency} {moneyFormat.format(payment.amount)}
                      </span>
                                    </p>
                                    <p className="mobile_investments_field mobile_investments_shares">
                      <span className="mobile_investments_field_text">
                        {t("profile_page.investments.shares")}
                      </span>
                                        <span className="mobile_investments_field_values">
                        {payment.shares}
                      </span>
                                    </p>
                                    <div className="mobile_investments_field mobile_investments_contact">
                                        <a href={"mailto:" + payment.company_owner_email}>
                                            <ButtonStyled
                                                colorStyle="dark-green"
                                                className="mobile_investments_item_button"
                                            >
                                                {t("profile_page.investments.button")}
                                            </ButtonStyled>
                                        </a>
                                    </div>
                                </CardBody>
                            </AccordionCollapse>
                        </CardComponent>
                    );
                })}
            </AccordionComponent>
        </>
    );
};

export default MobileInvestment;
