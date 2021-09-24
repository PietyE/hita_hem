import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const ModalContainer = ({
  children,
  isCloseButton = true,
  bodyClassName,
  onHide,
  className,
  dialogClassName,
  isFetchIndicator,
  ...rest
}) => {
  const handleClose = () => {
    if (onHide && typeof onHide === "function") {
      onHide(false);
    }
  };

  const fetchIndicatorClassName = isFetchIndicator ? "fetching" : "";

  return (
    <Modal
      onHide={handleClose}
      backdrop={true}
      keyboard={false}
      className={`modal_container ${className}`}
      dialogClassName={`dialog_modal_container ${dialogClassName}`}
      {...rest}
    >
      {isCloseButton && (
        <button className="close_button" onClick={handleClose}></button>
      )}
      <Modal.Body
        className={`dialog_modal_body ${bodyClassName} ${fetchIndicatorClassName}`}
      >
        {children}
        {!!isFetchIndicator && (
          <Spinner
            variant="success"
            animation="border"
            className="modal_spinner"
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
