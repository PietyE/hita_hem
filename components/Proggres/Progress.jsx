import React from "react";

const Progress = ({
  title = "",
  percent = "",
    className,
  leftDate='',
  target = "",
  currency = 0,
}) => {

  return (
    <div className= {`${className} progress_container`}>
      {!!title && <span className="progress_title">{title}</span>}
      <div className="values">
        <span className="day_left">
          {target ? `${currency} ` : ""} {target || leftDate}
        </span>
          <span className="percent">{percent}%</span>

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
