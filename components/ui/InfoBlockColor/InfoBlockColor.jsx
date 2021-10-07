import React from "react";

const InfoBlockColor = ({ className = "", styled = "", children }) => {
  return (
    <div className={`info_color_block ${className} ${styled}`}>{children}</div>
  );
};

export default InfoBlockColor;
