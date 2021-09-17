import React from "react";
import Image from "next/image";

import Button from "../Button";
import icon1 from "public/images/navtab1.svg";
import icon2 from "public/images/navTab2.svg";
import icon3 from "public/images/navTab3.svg";
import icon4 from "public/images/navTab4.svg";
import icon1w from "public/images/navtab1w.svg";
import icon2w from "public/images/navTab2w.svg";
import icon3w from "public/images/navTab3w.svg";
import icon4w from "public/images/navTab4w.svg";
import { useTranslation } from "react-i18next";

function NavTab({ tab, change }) {
  const { t } = useTranslation();

  return (
    <section className="nav_tabs">
      <div className="nav_tabs_button_container">
        <Button
          className={
            tab === "investment" ? "nav_tabs_button_active" : "nav_tabs_button"
          }
          onClick={() => change("investment")}
          aria-controls="investment"
          aria-expanded={"open"}
        >
          <Image
            className="nav_tabs_img"
            src={tab === "investment" ? icon1w : icon1}
          />
        </Button>
        <p className="nav_tabs_text">{t("profile_page.investment")}</p>
      </div>
      <div className="nav_tabs_button_container">
        <Button
          className={
            tab === "personal_details"
              ? "nav_tabs_button_active"
              : "nav_tabs_button"
          }
          onClick={() => change("personal_details")}
          aria-controls="personal_details"
          aria-expanded={"open"}
        >
          <Image src={tab === "personal_details" ? icon2w : icon2} />
        </Button>
        <p className="nav_tabs_text">{t("profile_page.personal_details")}</p>
      </div>
      <div className="nav_tabs_button_container">
        <Button
          className={
            tab === "account_settings"
              ? "nav_tabs_button_active"
              : "nav_tabs_button"
          }
          onClick={() => change("account_settings")}
          aria-controls="account_settings"
          aria-expanded={"open"}
        >
          <Image src={tab === "account_settings" ? icon3w : icon3} />
        </Button>
        <p className="nav_tabs_text">{t("profile_page.account_settings")}</p>
      </div>
      <div className="nav_tabs_button_container">
        <Button
          className={
            tab === "campaigns" ? "nav_tabs_button_active" : "nav_tabs_button"
          }
          onClick={() => change("campaigns")}
          aria-controls="campaigns"
          aria-expanded={"open"}
        >
          <Image src={tab === "campaigns" ? icon4w : icon4} />
        </Button>

        <p className="nav_tabs_text">{t("profile_page.profile_campaigns")}</p>
      </div>
    </section>
  );
}

export default NavTab;
