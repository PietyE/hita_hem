import React from "react";

const CurrensyText = ({ value, currency }) => {
  return (
    <span className="currensy_text">
      {currency} {value}
    </span>
  );
};

export default CurrensyText;
