import { useCallback, forwardRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";

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
import { isSignInUserSelector } from "redux/reducers/user";

const UserPanel = dynamic(() => import("components/UserPanel"));
const Navigation = dynamic(() => import("./components/Navigation"));

const LinkStyled = (props) => {
  const { children, to = "", ...extra } = props;
  return (
    <Link href={to} {...extra} prefetch={false}>
      <a {...extra}>{children}</a>
    </Link>
  );
};

const Header = ({ cookLng }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedLanguage = cookLng || useSelector(getSelectedLangSelector);
  const isAuth = useSelector(isSignInUserSelector);

  const handleSelectLang = useCallback(
    (e) => {
      dispatch(changeLanguage(lang[e.target.dataset.ln].code));
    },
    [dispatch]
  );

  const handleShowSignUp = useCallback(() => {
    dispatch(setShowSignUp(true));
  }, [dispatch]);

  const handleShowSignIn = useCallback(() => {
    dispatch(setShowSignIn(true));
  }, [dispatch]);

  return (
    <>
      <div className="header_container">
        <Navigation className="header_mobile_navigation" />
        <div className="header_item logo left">
          <Logo
            classNameContainer={"header_logo_container"}
            classNameText={"header_logo_text"}
          />
        </div>
        <>
          <div className="header_item middle">
            <div className="menu_container">
              <span className="menu_item">
                <Button
                  colorStyle="link"
                  as={LinkStyled}
                  to={INVEST_ROUTE}
                  className="menu_item_link"
                >
                  {t("header.invest").toLocaleUpperCase()}
                </Button>
              </span>
              <span className="menu_item">
                <Button
                  className="menu_item_link menu_item_link_raise"
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
                  className="menu_item_link menu_item_link_about"
                >
                  {t("header.about_us").toLocaleUpperCase()}
                </Button>
              </span>
              <span className="menu_item">
                <Button
                  className="menu_item_link"
                  colorStyle="link"
                  as={LinkStyled}
                  to={LAUNCHING_SOON}
                >
                  {t("header.launching_soon").toLocaleUpperCase()}
                </Button>
              </span>
            </div>
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
            <Dropdown className="ln_button_container sign_in_item">
              <Dropdown.Toggle as={CustomToggle}>
                {lang[selectedLanguage]?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown_menu"
                onClick={handleSelectLang}
              >
                {Object.keys(lang).map((l) => {
                  return (
                    <Dropdown.Item
                      key={l}
                      className="dropdown_menu_item"
                      data-ln={lang[l].code}
                    >
                      {lang[l].name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      </div>
    </>
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
