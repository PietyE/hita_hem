import React, { useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  RAISE_ROUTE,
  INVEST_ROUTE,
  ABOUT_US_ROUTE,
  LAUNCHING_SOON,
} from "constants/routesConstant";
import Button from "../../ui/Button";
import SplitLine from "../../ui/SplitLine";
import SocialTab from "../../ui/SocialTab";
import { logOut } from "redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { setShowSignIn, setShowSignUp } from "redux/actions/authPopupWindows";
import { getIsSignInUserSelector } from "redux/reducers/user";

import Link from "next/link";
import { changeLanguage } from "redux/actions/language";
import { lang } from "constants/languageConstant";
import { getSelectedLangSelector } from "redux/reducers/language";
import { useTranslation } from "react-i18next";
import {recaptcha} from "../../../utils/recaptcha";

const socials = [
  {
    url: 'https://www.allabolag.se/what/accumeo',
    name: 'allabolag'
  },
  {
    url: 'https://www.linkedin.com/company/accumeo/',
    name: 'linkedin'
  },
  {
    url: 'https://twitter.com/accumeo',
    name: 'twitter'
  },
  {
    url: 'https://www.facebook.com/Accumeo/',
    name: 'facebook'
  },
  {
    url: 'https://www.instagram.com/accumeo/',
    name: 'instagram'
  },
]

const Navigation = ({ className, initLang }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { pathname, locale } = router;

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsSignInUserSelector);
  const selectedLanguage = initLang || useSelector(getSelectedLangSelector);
  const menuBtn = useRef();
  //const [showSubMenu, setShowSubMenu] = useState(false);
  //const submenuClass = showSubMenu
  // ? "nav_item_about_us"
  // : "nav_item_about_us_disable";
  // const arrowButton =  showSubMenu? faChevronDown:faChevronRight ;

  const handleShowSignIn = () => {
    dispatch(setShowSignIn(true));
  };
  const handleShowSignUp = () => {
    dispatch(setShowSignUp(true));
  };

  const _logOut = useCallback((data) => {
    dispatch(logOut(data));
  }, [dispatch]);

  const handleLogOut = () => {
    recaptcha('logout',_logOut)
  }

  // const handleOpenSubMenu = (e) => {
  //   e.stopPropagation();
  //   setShowSubMenu(!showSubMenu);
  // };

  const handleSelectLang = (e) => {
    dispatch(changeLanguage(lang[e.target.dataset.ln]?.code));
  };

  // const closeSubMen = () => {
  //   if (menuBtn.current?.children[0]?.ariaExpanded) {
  //     setShowSubMenu(false);
  //   }
  // };
  return (
    <>
      <Navbar
        collapseOnSelect={true}
        className={className}
        //onClick={closeSubMen}
      >
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="nav_toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav_block">
            <NavDropdown
              id="basic-nav-dropdown"
              className="nav_dropdown"
              ref={menuBtn}
            >
              <NavDropdown.Item as="div" className="nav_item nav_item_invest">
                <Link href={INVEST_ROUTE} prefetch={false}>
                  <a
                    className={`${
                      pathname.includes(INVEST_ROUTE) ? "active" : ""
                    }`}
                  >
                    {t("header.invest").toLocaleUpperCase()}
                  </a>
                </Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Item as="div" className={submenuClass}>
                <Link href={ABOUT_US_ROUTE} prefetch={false}>
                  <a
                    className={`${
                      pathname.includes(ABOUT_US_ROUTE) ? "active" : ""
                    }`}
                  >
                    {t("header.about_us").toLocaleUpperCase()}
                  </a>
                </Link>
              </NavDropdown.Item> */}
              <NavDropdown.Item as="div" className="nav_item">
                <Link href={RAISE_ROUTE} prefetch={false}>
                  <a
                    className={`${
                      pathname.includes(RAISE_ROUTE) ? "active" : ""
                    }`}
                  >
                    {t("header.raise").toLocaleUpperCase()}
                  </a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as="div" className="nav_item">
                <Link href={ABOUT_US_ROUTE} prefetch={false}>
                  <a
                    className={`${
                      pathname.includes(ABOUT_US_ROUTE) ? "active" : ""
                    }`}
                  >
                    {t("header.about_us").toLocaleUpperCase()}
                  </a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as="div" className="nav_item">
                <a className="footer_nav_link"
                   target="_blank"
                   rel="noopener noreferrer"
                   href= {selectedLanguage === 'en' ? 'https://intercom.help/accumeo/en/' : 'https://intercom.help/accumeo/sv/'}
                >FAQ</a>
              </NavDropdown.Item>

              {/*<NavDropdown.Item as="div" className="nav_item">*/}
              {/*  <Link href={LAUNCHING_SOON} prefetch={false}>*/}
              {/*    <a*/}
              {/*      className={`${*/}
              {/*        pathname.includes(LAUNCHING_SOON) ? "active" : ""*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      {t("header.launching_soon").toLocaleUpperCase()}*/}
              {/*    </a>*/}
              {/*  </Link>*/}
              {/*</NavDropdown.Item>*/}
              <NavDropdown.Item as="div" className="nav_item_socials">
                <SocialTab socials={socials} />
              </NavDropdown.Item>
              <SplitLine className="nav_btn_split_line" />
              <NavDropdown.Item as="div" className="nav_item_buttons">
                {!isAuth && (
                  <>
                    <Button
                      colorStyle="link"
                      className="nav_btn_log_in"
                      onClick={handleShowSignIn}
                    >
                      {t("header.log_in")}
                    </Button>
                    <Button
                      colorStyle="red"
                      className="nav_btn_sign_up"
                      onClick={handleShowSignUp}
                    >
                      {t("header.sign_up")}
                    </Button>
                  </>
                )}
                {isAuth && (
                  <Button
                    colorStyle="red"
                    className="nav_btn_sign_up"
                    onClick={handleLogOut}
                  >
                    {" "}
                    Log out
                  </Button>
                )}
                <div className="nav_language_container">
                  <span
                    className={
                      selectedLanguage === "en"
                        ? "nav_language_en-active"
                        : "nav_language_en"
                    }
                    data-ln="en"
                    onClick={handleSelectLang}
                  >
                    En
                  </span>
                  <span
                    className={
                      selectedLanguage === "sv"
                        ? "nav_language_sv-active"
                        : "nav_language_sv"
                    }
                    data-ln="sv"
                    onClick={handleSelectLang}
                  >
                    Sv
                  </span>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};



export default Navigation;
