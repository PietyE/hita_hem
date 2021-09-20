import React from "react";
import { useTranslation } from "react-i18next";

const Progress = ({
  title = "",
  percent = "",
  dayLeft = "",
  target = "",
  status = "",
  currency = 0,
}) => {
  const { t } = useTranslation();
  let dayLeftValue;
  if (status === 4 || status === 2) {
    dayLeftValue = t("company_page.company_closed");
  } else if (dayLeft >= 0) {
    dayLeftValue = `${dayLeft} ${t("company_page.company_days_left")}`;
  } else {
    dayLeftValue = `0 ${t("company_page.company_days_left")}`;
  }

  return (
    <div className="progress_container">
      {!!title && <span className="progress_title">{title}</span>}
      <div className="values">
        <span className="percent">{percent}%</span>
        <span className="day_left">
          {target ? `${currency} ` : ""} {target || dayLeftValue}
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
