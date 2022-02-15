import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Button from "components/ui/Button";
import CurrensyText from "components/CurrensyText";
import Progress from "components/Proggres";
import SignUpMessage from "components/SignUpMessage";
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
} from "redux/reducers/companies";
import { getSelectedLangSelector } from "redux/reducers/language";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {getCompanySlugSelector, getLeftDate} from "../../redux/reducers/companies";

const ProjectInvestInfoSection = ({ isAuth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useRouter();
  const sectionRef = useRef();

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
  const dataOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };


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
        history.push('/invest-form/[companyId]',`/invest-form/${companySlug}`);
    } else {
      dispatch(setShowSignIn(true));
    }
  };

  /////////////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const topPart = sectionRef.current?.offsetParent.offsetTop + sectionRef.current?.offsetTop + sectionRef.current?.offsetHeight;
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > topPart + 20) {
      setVisible(true);
    } else if (scrolled <= topPart + 20) {
      setVisible(false);
    }
  };

  const classNameVisible = visible ? "invest_button_visible" : "";

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);


  return (
      <>
        <div className="project_info_right_section" ref={sectionRef}>
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

      {!isAuth && <SignUpMessage />}
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
