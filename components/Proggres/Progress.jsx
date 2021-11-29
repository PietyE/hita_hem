import React from "react";
// import { useTranslation } from "react-i18next";

const Progress = ({
  title = "",
  percent = "",
  // daysLeftToStart = "",
  // daysLeftToEnd = "",
  leftDate='',
  target = "",
  // status = "",
  currency = 0,
}) => {
  // const { t } = useTranslation();

  // let dayLeftValue;
  //
  // if (status === 2) {
  //   dayLeftValue = t("company_page.company_completed");
  // } else if (status === 4) {
  //   dayLeftValue = t("company_page.company_successfully_closed");
  // } else if (status === 3) {
  //   dayLeftValue = daysLeftToEnd === 1 ? `${daysLeftToEnd} ${t("company_page.company_day_left")}` : `${daysLeftToEnd} ${t("company_page.company_days_left")}`;
  // } else if(status === 1) {
  //   dayLeftValue = daysLeftToStart === 1 ? `${daysLeftToStart} ${t("company_page.company_day_left_to_start")}` :`${daysLeftToStart} ${t("company_page.company_days_left_to_start")}`;
  // }

  return (
    <div className="progress_container">
      {!!title && <span className="progress_title">{title}</span>}
      <div className="values">
        <span className="percent">{percent}%</span>
        <span className="day_left">
          {target ? `${currency} ` : ""} {target || leftDate}
        </span>
      </div>
      <div className="progress_line">
        <span
          style={{ width: `${percent}%` }}
          className="progress_end_line"
        ></span>
      </div>
    </div>
  );
};

export default Progress;
