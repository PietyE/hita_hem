import { useSelector } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import {
  RAISE_ROUTE,
  INVEST_ROUTE,
  ABOUT_US_ROUTE,
  LAUNCHING_SOON,
} from "constants/routesConstant";
import Logo from "components/Logo";
import { getPrivacyPolicyDocument } from "redux/reducers/documents";

const Footer = () => {
  const { t } = useTranslation();
  const documentUrl = useSelector(getPrivacyPolicyDocument);
  return (
    <footer className="footer_container">
      <div className="footer_item logo_container">
        <Logo classNameText="footer_text" />
      </div>
      <div className="footer_item footer_nav">
        <Link href={INVEST_ROUTE} prefetch={false}>
          <a className="footer_nav_link">{t("footer.invest_link")}</a>
        </Link>
        <Link href={RAISE_ROUTE} prefetch={false}>
          <a className="footer_nav_link">{t("footer.raise_link")}</a>
        </Link>
        <Link href={ABOUT_US_ROUTE} prefetch={false}>
          <a className="footer_nav_link">{t("footer.about_us_link")}</a>
        </Link>
        <Link href={LAUNCHING_SOON} prefetch={false}>
          <a className="footer_nav_link">{t("footer.launching_soon_link")}</a>
        </Link>
        <a
          className="footer_nav_link"
          target="_blank"
          rel="noopener noreferrer"
          href={documentUrl?.file || documentUrl?.url}
        >
          {t("footer.privacy_policy_link")}
        </a>
      </div>
      <div className="footer_item social_footer_item">
        <a
          className="social_button"
          href="https://www.linkedin.com/company/accumeo/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className="social_icon" />
        </a>
        <a
          className="social_button"
          href="https://twitter.com/accumeo"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} className="social_icon" />
        </a>
        <a
          className="social_button"
          href="https://www.facebook.com/Accumeo/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} className="social_icon" />
        </a>
        <a
          className="social_button"
          href="https://www.instagram.com/accumeo/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="social_icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
