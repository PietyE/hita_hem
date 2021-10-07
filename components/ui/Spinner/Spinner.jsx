import React from "react";
import Spinner from "react-bootstrap/Spinner";

const SpinnerStyled = () => {
  return (
    <div className="spinner_container">
      <Spinner animation="border" variant="success" />
    </div>
  );
};

export default SpinnerStyled;
