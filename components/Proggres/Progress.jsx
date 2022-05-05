import React from "react";

const Progress = ({
  title = "",
  percent = "",
    className,
  leftDate='',
  target = "",
  currency = 0,
    type,
}) => {

  const _termlessStyle = type === 2 ? { opacity: '0'} : {}

  return (
    <div className= {`${className} progress_container`}>
      {!!title && <span className="progress_title"  style={_termlessStyle}>{title}</span>}
      <div className="values" style={_termlessStyle}>
        <span className="day_left">
          {target ? `${currency} ` : ""} {target || leftDate}
        </span>
          <span className="percent">{percent}%</span>

      </div>
      <div className="progress_line"  style={_termlessStyle}>
        <span
          style={{ width: `${percent}%` }}
          className="progress_end_line"
        ></span>
      </div>
    </div>
  );
};

export default Progress;
