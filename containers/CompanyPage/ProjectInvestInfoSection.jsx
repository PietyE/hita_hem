import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Button from "components/ui/Button";
import CurrensyText from "components/CurrensyText";
import Progress from "components/Proggres";
import SignUpMessage from "components/SignUpMessage";
import { setShowSignIn } from "redux/actions/authPopupWindows";
import {
  getBusinessStartDaySelector,
  getBusinessEndDaySelector,
  getBusinessGoalSelector,
  getBusinessInvestedSelector,
  getBusinessShapePriceSelector,
  getCompanyTabSelected,
  getBusinessCurrencySelector,
  getPercentageSelector,
  getDaysLeftSelector,
  getCompanyIdSelector,
  getCompanyStatusInNumbersSelector,
  canUserInvestSelector,
  getIsCompanyClosedSelector,
} from "redux/reducers/companies";
import { getSelectedLangSelector } from "redux/reducers/language";
import { companyTabConstants } from "constants/companyTabConstant";
import { useTranslation } from "react-i18next";

const ProjectInvestInfoSection = ({ isAuth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useRouter();

  const sectionRef = useRef();

  const prevSelectedTab = useRef();
  const companyId = useSelector(getCompanyIdSelector);
  const selectedTab = useSelector(getCompanyTabSelected);
  const currentLanguage = useSelector(getSelectedLangSelector);
  const startDay = useSelector(getBusinessStartDaySelector);
  const endDay = useSelector(getBusinessEndDaySelector);
  const goal = useSelector(getBusinessGoalSelector);
  const invested = useSelector(getBusinessInvestedSelector);
  const price = useSelector(getBusinessShapePriceSelector);
  const currency = useSelector(getBusinessCurrencySelector);
  const percentage = useSelector(getPercentageSelector);
  const daysLeft = useSelector(getDaysLeftSelector);
  const status = useSelector(getCompanyStatusInNumbersSelector);
  const userCanInvest = useSelector(canUserInvestSelector);
  const isCompanyClosed = useSelector(getIsCompanyClosedSelector);
  const HEADER_HEIGHT = 100;
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

  const scrollScreenValue = useRef();

  const setInitPositionSection = () => {
    const element = sectionRef.current;
    element.style.position = "static";
    element.style.left = "unset";
    element.style.top = "unset";
    element.style.zIndex = "unset";
  };

  const setNewPositionSection = () => {
    const element = sectionRef.current;
    const { x } = element.getBoundingClientRect();
    element.style.position = "fixed";
    element.style.left = `${x}px`;
    element.style.top = `${HEADER_HEIGHT - 1}px`;
    element.style.zIndex = 4;
  };

  const changePositionSection = useCallback(() => {
    const element = sectionRef.current;
    const { y } = element.getBoundingClientRect();

    if (y <= HEADER_HEIGHT) {
      scrollScreenValue.current = scrollScreenValue.current
        ? scrollScreenValue.current
        : document.documentElement.scrollTop;
      if (selectedTab === companyTabConstants.IDEA) {
        setNewPositionSection();
      }
      if (
        prevSelectedTab?.current !== selectedTab &&
        selectedTab === companyTabConstants.IDEA
      ) {
        setNewPositionSection();
      }
    }

    if (scrollScreenValue.current > document.documentElement.scrollTop) {
      setInitPositionSection();
    }
  }, [selectedTab]);

  // useLayoutEffect(() => {
  //   document.addEventListener('scroll', changePositionSection)
  //   return () => {
  //     setInitPositionSection()
  //     document.removeEventListener('scroll', changePositionSection)
  //   }
  // }, [changePositionSection, selectedTab])

  // useEffect(() => {
  //   prevSelectedTab.current = selectedTab
  // }, [selectedTab])

  const handleClickInvest = () => {
    if (isAuth) {
      history.push(`/invest-form/${companyId}`);
    } else {
      dispatch(setShowSignIn(true));
    }
  };

  return (
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
          <CurrensyText value={invested} currency={currency} />
          <span className="invest_info_param">
            {t("company_page.company_invested")}
          </span>
        </div>
        <div className="invest_info_item">
          <CurrensyText value={goal} currency={currency} />
          <span className="invest_info_param">
            {t("company_page.company_goal")}
          </span>
        </div>
        <div className="invest_info_item">
          <CurrensyText value={price} currency={currency} />
          <span className="invest_info_param">
            {t("company_page.company_share_price")}
          </span>
        </div>
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
        <a href={"mailto:" + "info@accumeo.com"}>
          <Button colorStyle="dark-green" className="invest_button">
            {t("company_page.button_contact")}
          </Button>
        </a>
      )}

      {!isAuth && <SignUpMessage />}
    </div>
  );
};

export default ProjectInvestInfoSection;
