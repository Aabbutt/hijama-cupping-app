import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="hc-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
