import React from "react";
import { useSelector } from "react-redux";
import { getUserPaymentsSelector } from "redux/reducers/user";
import MobileInvestment from "./MobileInvestment";
import Button from "components/ui/Button";
import { useTranslation } from "react-i18next";
import {getSelectedLangSelector} from "redux/reducers/language";
import useMoneyFormat from "customHooks/useMoneyFormat";

const Investment = () => {
  const { t } = useTranslation();
    const currentLanguage = useSelector(getSelectedLangSelector);
    const moneyFormat = useMoneyFormat()

  const paymentsList = useSelector(getUserPaymentsSelector);
  return (
    <section className="profile_campaigns_section">
      <h2 className="profile_campaigns_title">
        {t("profile_page.investments.title")}
      </h2>
      <div className="profile_campaigns_table_container">
        <div className="profile_campaigns_table_header">
          <p className="profile_campaigns_table_header_text table_invest_header_name">
            {t("profile_page.investments.name")}
          </p>
          <p className="profile_campaigns_table_header_text table_invest_header_link">
            {t("profile_page.investments.link")}
          </p>
          <p className="profile_campaigns_table_header_text table_invest_header_amount">
            {t("profile_page.investments.amount")}
          </p>
          <p className="profile_campaigns_table_header_text table_invest_header_shares">
            {t("profile_page.investments.shares")}
          </p>
        </div>
        <ul className="profile_campaigns_list">
          {paymentsList?.length > 0 &&
            paymentsList?.map((payment, index) => {
                let _link;
                let textLink;
                if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
                    _link = currentLanguage === 'en'?`https://dev.accumeo.com/company/${payment.company_id}`:`https://dev.accumeo.com/sv/company/${payment.company_id}`
                    textLink = `https://accumeo.com/company/${payment.company_id}`
                }
                if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'staging') {
                    _link = currentLanguage === 'en'?`https://stage.accumeo.com/company/${payment.company_id}`:`https://stage.accumeo.com/sv/company/${payment.company_id}`
                    textLink =   `https://accumeo.com/company/${payment.company_id}`
                }
                if(process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'production'){
                    _link = currentLanguage === 'en'?`https://preprod.accumeo.com/company/${payment.company_id}`:`https://preprod.accumeo.com/sv/company/${payment.company_id}`
                    textLink =   `https://accumeo.com/company/${payment.company_id}`
                }

              return (
                <li key={index} className="profile_campaigns_item">
                  <p className="profile_campaigns_table_item_text table_item_name">
                    {index + 1}
                    {". "}
                    {payment.company_name}
                  </p>
                  <a
                    href={_link}
                    className="profile_campaigns_table_item_text table_item_invest_link"
                  >
                    {textLink}
                  </a>
                  <p className="profile_campaigns_table_item_text table_item_invest_amount">
                    {payment.amount_currency} {moneyFormat.format(payment.amount)}
                  </p>
                  <p className="profile_campaigns_table_item_text table_item_invest_shares">
                    {payment.shares}
                  </p>
                  <div className="table_item_contact">
                    <a href={"mailto:" + payment.company_owner_email}>
                      <Button
                        colorStyle="dark-green"
                        className="profile_investment_item_invest_button"
                      >
                        {t("profile_page.investments.button")}
                      </Button>
                    </a>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <MobileInvestment data={paymentsList} />
    </section>
  );
};

export default Investment;
