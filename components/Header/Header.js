import React, { useCallback, forwardRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Logo from "components/Logo";
import IconChevronDown from "components/ui/IconChevronDown";
import Button from "components/ui/Button";

import {
  ABOUT_US_ROUTE,
  RAISE_ROUTE,
  INVEST_ROUTE,
  LAUNCHING_SOON,
} from "constants/routesConstant";
import { lang } from "constants/languageConstant";
import { getSelectedLangSelector } from "redux/reducers/language";
import { changeLanguage } from "redux/actions/language";
import { setShowSignUp, setShowSignIn } from "redux/actions/authPopupWindows";
import { getIsSignInUserSelector } from "redux/reducers/user";

const UserPanel = dynamic(() => import("components/UserPanel"));
const Navigation = dynamic(() => import("./components/Navigation"));
const DropDownComponent = dynamic(() =>
  import("components/ui/DropDownComponent")
);
const DropdownToggle = dynamic(() =>
  import("components/ui/DropDownComponent").then((c) => c.DropdownToggle)
);
const DropdownMenu = dynamic(() =>
  import("components/ui/DropDownComponent").then((c) => c.DropdownMenu)
);
const DropdownItem = dynamic(() =>
  import("components/ui/DropDownComponent").then((c) => c.DropdownItem)
);

const LinkStyled = (props) => {
  const { children, to = "", ...extra } = props;
  return (
    <Link href={to} {...extra} prefetch={false}>
      <a {...extra}>{children}</a>
    </Link>
  );
};

const Header = ({ initLang }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, locale } = router;

  const { t } = useTranslation();
  const _selectedLanguage = useSelector(getSelectedLangSelector);
  const isAuth = useSelector(getIsSignInUserSelector);

  const selectedLanguage = initLang || _selectedLanguage;

  const handleSelectLang = (e) => {
    if (locale === lang[e.target.dataset.ln].code) return;
    dispatch(changeLanguage(lang[e.target.dataset.ln].code));
  };

  const handleShowSignUp = useCallback(() => {
    dispatch(setShowSignUp(true));
  }, [dispatch]);

  const handleShowSignIn = useCallback(() => {
    dispatch(setShowSignIn(true));
  }, [dispatch]);

  return (
    <header className="header_container">
      <div className="header_content_container">
        <Navigation className="header_mobile_navigation" initLang={initLang} />
        <div className="header_item logo left">
          <Logo
            classNameContainer={"header_logo_container"}
            classNameText={"header_logo_text"}
          />
        </div>
        <>
          <div className="header_item middle">
            <nav className="menu_container">
              <span className="menu_item">
                <Button
                  colorStyle="link"
                  as={LinkStyled}
                  to={INVEST_ROUTE}
                  className={`menu_item_link ${
                    pathname.includes(INVEST_ROUTE) ? "active" : ""
                  }`}
                >
                  {t("header.invest").toLocaleUpperCase()}
                </Button>
              </span>
              <span className="menu_item">
                <Button
                  className={`menu_item_link menu_item_link_raise ${
                    pathname.includes(RAISE_ROUTE) ? "active" : ""
                  }`}
                  colorStyle="link"
                  as={LinkStyled}
                  to={RAISE_ROUTE}
                >
                  {t("header.raise").toLocaleUpperCase()}
                </Button>
              </span>
              <span className="menu_item ">
                <Button
                  colorStyle="link"
                  as={LinkStyled}
                  to={ABOUT_US_ROUTE}
                  className={`menu_item_link menu_item_link_about ${
                    pathname.includes(ABOUT_US_ROUTE) ? "active" : ""
                  }`}
                >
                  {t("header.about_us").toLocaleUpperCase()}
                </Button>
              </span>
              <a className="menu_item_link menu_item_link_faq"
                 target="_blank"
                 rel="noopener noreferrer"
                 href= {selectedLanguage === 'en' ? 'https://intercom.help/accumeo/en/' : 'https://intercom.help/accumeo/sv/'}
              >{t("faq")}</a>
              {/*<span className="menu_item">*/}
              {/*  <Button*/}
              {/*    className={`menu_item_link ${*/}
              {/*      pathname.includes(LAUNCHING_SOON) ? "active" : ""*/}
              {/*    }`}*/}
              {/*    colorStyle="link"*/}
              {/*    as={LinkStyled}*/}
              {/*    to={LAUNCHING_SOON}*/}
              {/*  >*/}
              {/*    {t("header.launching_soon").toLocaleUpperCase()}*/}
              {/*  </Button>*/}
              {/*</span>*/}
            </nav>
          </div>
          <div className="header_item right">
            {!isAuth && (
              <>
                <Button
                  colorStyle="link"
                  className="logn_in_button_container sign_in_item"
                  onClick={handleShowSignIn}
                >
                  {t("header.log_in")}
                </Button>
                <Button
                  className="sing_up_button_container sign_in_item"
                  colorStyle="dark-green"
                  onClick={handleShowSignUp}
                >
                  {t("header.sign_up")}
                </Button>
              </>
            )}
            {!!isAuth && <UserPanel />}
            <DropDownComponent className="ln_button_container sign_in_item">
              <DropdownToggle as={CustomToggle}>
                {lang[selectedLanguage]?.name}
              </DropdownToggle>
              <DropdownMenu
                className="dropdown_menu"
                onClick={handleSelectLang}
              >
                {Object.keys(lang).map((l) => {
                  return (
                    <DropdownItem
                      key={l}
                      className="dropdown_menu_item"
                      data-ln={lang[l].code}
                    >
                      {lang[l].name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </DropDownComponent>
          </div>
        </>
      </div>
    </header>
  );
};

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <Button
    ref={ref}
    colorStyle="link"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <IconChevronDown className="chevron_icon" />
  </Button>
));

export default Header;
