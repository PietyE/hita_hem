import React, {useCallback, useEffect, useRef, useState} from "react";
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
  // getBusinessShapePriceSelector,
  getBusinessCurrencySelector,
  getPercentageSelector,
  getDaysLeftSelector,
  getCompanyIdSelector,
  getCompanyStatusInNumbersSelector,
  canUserInvestSelector,
  getIsCompanyClosedSelector,
  getValuationSelector,
} from "redux/reducers/companies";
import {  getQuizIsPassedSelector} from "redux/reducers/user";
import { getSelectedLangSelector } from "redux/reducers/language";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {setShowQuiz} from "../../redux/actions/authPopupWindows";

const ProjectInvestInfoSection = ({ isAuth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useRouter();
  const sectionRef = useRef();

  const moneyFormat = useMoneyFormat()
  const companyId = useSelector(getCompanyIdSelector);
  const currentLanguage = useSelector(getSelectedLangSelector);
  const startDay = useSelector(getBusinessStartDaySelector);
  const endDay = useSelector(getBusinessEndDaySelector);
  const goal = useSelector(getBusinessGoalSelector);
  const invested = useSelector(getBusinessInvestedSelector);
  const valuation = useSelector(getValuationSelector)
  // const price = useSelector(getBusinessShapePriceSelector);
  const currency = useSelector(getBusinessCurrencySelector);
  const percentage = useSelector(getPercentageSelector);
  const daysLeft = useSelector(getDaysLeftSelector);
  const status = useSelector(getCompanyStatusInNumbersSelector);
  const userCanInvest = useSelector(canUserInvestSelector);
  const isCompanyClosed = useSelector(getIsCompanyClosedSelector);
  const isQuizPassed = useSelector(getQuizIsPassedSelector)

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

  // const setInitPositionSection = () => {
  //   const element = sectionRef.current;
  //   element.style.position = "static";
  //   element.style.left = "unset";
  //   element.style.top = "unset";
  //   element.style.zIndex = "unset";
  // };

  // const setNewPositionSection = () => {
  //   const element = sectionRef.current;
  //   const { x } = element.getBoundingClientRect();
  //   element.style.position = "fixed";
  //   element.style.left = `${x}px`;
  //   element.style.top = `${HEADER_HEIGHT - 1}px`;
  //   element.style.zIndex = 4;
  // };

  // const changePositionSection = useCallback(() => {
  //   const element = sectionRef.current;
  //   const { y } = element.getBoundingClientRect();

  //   if (y <= HEADER_HEIGHT) {
  //     scrollScreenValue.current = scrollScreenValue.current
  //       ? scrollScreenValue.current
  //       : document.documentElement.scrollTop;
  //     if (selectedTab === companyTabConstants.IDEA) {
  //       setNewPositionSection();
  //     }
  //     if (
  //       prevSelectedTab?.current !== selectedTab &&
  //       selectedTab === companyTabConstants.IDEA
  //     ) {
  //       setNewPositionSection();
  //     }
  //   }

  //   if (scrollScreenValue.current > document.documentElement.scrollTop) {
  //     setInitPositionSection();
  //   }
  // }, [selectedTab]);


  const _setShowQuiz = useCallback(() => {
    dispatch(setShowQuiz(true));
  }, [dispatch]);


  const handleClickInvest = () => {
    if (isAuth) {
       if(isQuizPassed){
        history.push('/invest-form/[companyId]',`/invest-form/${companyId}`);
       }else{
         _setShowQuiz()
       }
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


  // const moneyFormat = new Intl.NumberFormat([currentLanguage, "en"], {
  //   style: "decimal",
  // });


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
        <div className="invest_info_item">
          <CurrensyText
              value={moneyFormat.format(parseInt(invested))}
              currency={currency}
          />
          <span className="invest_info_param">
            {t("company_page.company_invested")}
          </span>
        </div>
        <div className="invest_info_item">
          <CurrensyText
            value={moneyFormat.format(parseInt(goal))}
            currency={currency}
          />
          <span className="invest_info_param">
            {t("company_page.company_goal")}
          </span>
        </div>
        {valuation &&
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
        {/*<div className="invest_info_item">*/}
        {/*  <CurrensyText value={moneyFormat.format(price)} currency={currency} />*/}
        {/*  <span className="invest_info_param">*/}
        {/*    {t("company_page.company_share_price")}*/}
        {/*  </span>*/}
        {/*</div>*/}
        <div className="invest_info_item">
          <Progress
            title={t("company_page.company_raised")}
            percent={percentage}
            dayLeft={daysLeft}
            status={status}
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
        {!isCompanyClosed &&  (
            <div className={`sticky_invest_button_container ${classNameVisible}`}>
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
