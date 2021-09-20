import React from "react";
import { useSelector } from "react-redux";
import { getUserPaymentsSelector } from "redux/reducers/user";
import MobileInvestment from "./MobileInvestment";
import Button from "components/ui/Button";
import { useTranslation } from "react-i18next";

const Investment = () => {
  const { t } = useTranslation();

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
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
                _link = `https://dev.accumeo.com/company/${payment.company_id}`;
              }
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
                _link = `https://stage.accumeo.com/company/${payment.company_id}`;
              }
              if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
                _link = `https://prod.accumeo.com/company/${payment.company_id}`;
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
                    {_link}
                  </a>
                  <p className="profile_campaigns_table_item_text table_item_invest_amount">
                    {payment.amount_currency} {payment.amount}
                  </p>
                  <p className="profile_campaigns_table_item_text table_item_invest_shares">
                    {payment.shares}
                  </p>
                  <div className="table_item_contact">
                    <a href={"mailto:" + payment.owner_email}>
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
