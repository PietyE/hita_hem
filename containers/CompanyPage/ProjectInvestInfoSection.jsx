import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Button from "components/ui/Button";
import CurrensyText from "components/CurrensyText";
import Progress from "components/Proggres";
import SignUpMessage from "components/SignUpMessage";
import PassQuizMessage from "../../components/PassQuizMessage";
import StatusCompanyBadge from "components/StatusCompany";

import {setShowSignIn} from "redux/actions/authPopupWindows";
import {
  getBusinessStartDaySelector,
  getBusinessEndDaySelector,
  getBusinessGoalSelector,
  getBusinessInvestedSelector,
  getBusinessCurrencySelector,
  getPercentageSelector,
  canUserInvestSelector,
  getIsCompanyClosedSelector,
  getValuationSelector,
  getCompanyIndustryTitleSelector,
  getCountryTitleSelector,
  getWebSiteCompanySelector,
  getSocialsCompanySelector, getCompanyStatusSelector,
} from "redux/reducers/companies";
import { getSelectedLangSelector } from "redux/reducers/language";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {getCompanySlugSelector, getLeftDate} from "../../redux/reducers/companies";
import InfoWithTitle from "../../components/ui/InfoWithTitle";
import SocialTab from "../../components/ui/SocialTab";
import isEqual from "lodash/isEqual";
import {getQuizIsPassedSelector} from "../../redux/reducers/user";

const ProjectInvestInfoSection = ({ isAuth,sectionRef, isVisible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useRouter();

  const moneyFormat = useMoneyFormat()
   const companySlug = useSelector(getCompanySlugSelector);
  const currentLanguage = useSelector(getSelectedLangSelector);
  const startDay = useSelector(getBusinessStartDaySelector);
  const endDay = useSelector(getBusinessEndDaySelector);
  const goal = useSelector(getBusinessGoalSelector);
  const invested = useSelector(getBusinessInvestedSelector);
  const valuation = useSelector(getValuationSelector)
  const currency = useSelector(getBusinessCurrencySelector);
  const percentage = useSelector(getPercentageSelector);
  const leftDate = useSelector(getLeftDate)
  const userCanInvest = useSelector(canUserInvestSelector);
  const isCompanyClosed = useSelector(getIsCompanyClosedSelector);
  const status = useSelector(getCompanyStatusSelector);

  const dataOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const industryTitle = useSelector(getCompanyIndustryTitleSelector);
  const countryTitle = useSelector(getCountryTitleSelector);
  const webSite = useSelector(getWebSiteCompanySelector);
  const socials = useSelector(getSocialsCompanySelector, isEqual);
  const isPassedQuiz = useSelector(getQuizIsPassedSelector)


  const _startDayLocal = new Date(startDay).toLocaleString(
    currentLanguage,
    dataOptions
  );

  const _endDayLocal = new Date(endDay).toLocaleString(
    currentLanguage,
    dataOptions
  );


  const handleClickInvest = () => {
    if (isAuth) {
      const url = currentLanguage === 'sv'?'/investerings-formular/[companyId]':'/invest-form/[companyId]'
      const href = currentLanguage === 'sv'?`/investerings-formular/${companySlug}`:`/invest-form/${companySlug}`
        history.push(`${url}`,`${href}`);
    } else {
      dispatch(setShowSignIn(true));
    }
  };

  const classNameVisible = !isVisible ? "invest_button_visible" : "";

  return (
      <>
        <div className="project_info_right_section" ref={sectionRef} style={!isVisible?{opacity:0}:{}}>
          <div className='project_info_right_status_container'>
            <h2 className='project_info_right_status_text'>Status</h2>
            <StatusCompanyBadge
                status={status}
                percentage={percentage}
                classNameContainer="project_info_right_status"
            />
          </div>
      <div className="invest_info">
        <div className="invest_info_item">
          <span className="invest_info_item_date">
            <span>{t("company_page.company_start_date")}</span>{" "}
            <span className="date">{_startDayLocal}</span>
          </span>
          <span className="invest_info_item_date">
            <span>{t("company_page.company_end_date")}</span>{" "}
            <span className="date">{_endDayLocal}</span>
          </span>
        </div>

        {isAuth && (
            <div className = "invest_info_item">
          <CurrensyText
              value = {moneyFormat.format(parseInt(invested))}
              currency = {currency}
          />
          <span className = "invest_info_param">
            {t("company_page.company_invested")}
          </span>
        </div>)}
        {isAuth && (
        <div className="invest_info_item">
          <CurrensyText
            value={moneyFormat.format(parseInt(goal))}
            currency={currency}
          />
          <span className="invest_info_param">
            {t("company_page.company_goal")}
          </span>
        </div>
        )}
        {valuation && isAuth &&
        <div className="invest_info_item">
          <CurrensyText
              value={valuation? moneyFormat.format(parseInt(valuation)) : ''}
              currency={currency}
          />
          <span className="invest_info_param">
            {t("company_page.company_valuation")}
          </span>
        </div>
        }

        <div className="invest_info_item">
          <Progress
            title={t("company_page.company_raised")}
            percent={percentage}
            left_date={leftDate}
            className='invest_info_progress'
          />
        </div>
      </div>
      {!isCompanyClosed && (
        <Button
          colorStyle="dark-green"
          className="invest_button"
          onClick={handleClickInvest}
          disabled={!userCanInvest}
        >
          {t("company_page.button_invest")}
        </Button>
      )}

      {isCompanyClosed && (
          isAuth ?
      (  <a href={"mailto:" + "info@accumeo.com"}>
          <Button colorStyle="dark-green" className="invest_button">
            {t("company_page.button_contact")}
          </Button>
        </a>) : (
                  <Button colorStyle="dark-green" className="invest_button" disabled={!isAuth}>
                    {t("company_page.button_contact")}
                  </Button>
              )
      )}

          <div className="company_info_sig">
            <h2 className='company_info_sig_title'>{t("company_page.company_info.title")}</h2>
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

      {!isAuth && <SignUpMessage />}
          {isAuth && !isPassedQuiz && <PassQuizMessage className='company_info_quiz_message'/>}
    </div>
        {!isCompanyClosed &&   (
            <div className={userCanInvest ? `sticky_invest_button_container ${classNameVisible}` : `sticky_invest_button_container sticky_invest_button_container_closed ${classNameVisible}`}>
              <div className='sticky_invest_content_wrapper'>
                {userCanInvest && <Button
                    colorStyle = "dark-green"
                    className = {`sticky_invest_button ${classNameVisible}`}
                    onClick = {handleClickInvest}
                    disabled = {!userCanInvest}
                >
                  {t("company_page.button_invest")}
                </Button>}
              </div>
             </div>

        )}
        {isCompanyClosed && (
            <div className={`sticky_invest_button_container ${classNameVisible}`}>
              <div className='sticky_invest_content_wrapper'>
                {isAuth ?
                    <a href = {"mailto:" + "info@accumeo.com"}>
                      <Button
                          colorStyle = "dark-green"
                          className = {`sticky_invest_button ${classNameVisible}`}
                          disabled = {!isAuth}
                      >
                        {t("company_page.button_contact")}
                      </Button>
                    </a>
                    :
                    <Button
                        colorStyle = "dark-green"
                        className = {`sticky_invest_button ${classNameVisible}`}
                        disabled = {!isAuth}
                    >
                      {t("company_page.button_contact")}
                    </Button>}
            </div>
            </div>

        )}
        </>
  );
};

export default ProjectInvestInfoSection;
