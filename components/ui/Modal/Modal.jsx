import React from "react";
import Modal from "react-bootstrap/Modal";

const ModalContainer = ({
  children,
  isCloseButton = true,
  bodyClassName,
  onHide,
  className,
  dialogClassName,
  ...rest
}) => {
  const handleClose = () => {
    if (onHide && typeof onHide === "function") {
      onHide(false);
    }
  };
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
      <Modal.Body className={`dialog_modal_body ${bodyClassName}`}>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
