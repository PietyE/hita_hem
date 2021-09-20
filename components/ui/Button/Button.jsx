import React, { forwardRef } from "react";
import Button from "react-bootstrap/Button";

const ButtonStyled = forwardRef((props, ref) => {
  const { children, className, colorStyle, ...rest } = props;
  return (
    <Button
      className={`styled_button ${className} ${colorStyle}`}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default ButtonStyled;
