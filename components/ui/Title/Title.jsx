import React from "react";

const Title = ({ className, title }) => {
  return <h3 className={`title_styled ${className}`}>{title}</h3>;
};

export default Title;
