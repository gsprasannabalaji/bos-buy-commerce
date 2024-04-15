import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const CustomToast = ({ show, onClose, message, variant="success", header, delay = 3000 }) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ position: 'fixed', top: 0, right: 0, zIndex: 1050 }}>
      <Toast onClose={onClose} show={show} delay={delay} autohide className={`custom-toast--${variant}`}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;