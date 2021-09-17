import React from "react";
import Button from "components/ui/Button";

import Link from "next/link";
import { HOME_ROUTE } from "constants/routesConstant";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="page_404_container">
        <div className="page_404_error_wrapper">
          <div className="page_404_back_block1 page_404_block"></div>
          <div className="page_404_back_block2 page_404_block"></div>
          <div className="page_404_error_block page_404_block">
            <p className="page_404_header">{t("not_found_page.title")}</p>
            <span className="page_404_text_error">
              {t("not_found_page.error")}
            </span>
            <span className="page_404_title">404</span>
            <span className="page_404_text">
              {t("not_found_page.text_oops")}
            </span>
            <p className="page_404_text page_404_text_long">
              {t("not_found_page.text")}
            </p>
          </div>
        </div>

        <Link href={HOME_ROUTE}>
          <a>
            <Button colorStyle="red" className="page_404_button">
              {t("not_found_page.button")}
            </Button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
