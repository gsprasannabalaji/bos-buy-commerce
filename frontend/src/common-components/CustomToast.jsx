import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

/**
 * CustomToast component displays a customizable toast message.
 * 
 * @param {boolean} show - Whether the toast should be visible.
 * @param {function} onClose - Function to call when the toast is closed.
 * @param {string} message - The message content to display in the toast.
 * @param {string} variant - The variant of the toast (e.g., "success", "error").
 * @param {number} delay - Time in milliseconds before the toast automatically closes. Default is 3000ms.
 * @returns {JSX.Element} - Returns the JSX element for the CustomToast component.
 */
const CustomToast = ({ show, onClose, message, variant="success", delay = 3000 }) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ position: 'fixed', top: 0, right: 0, zIndex: 1050 }}>
      <Toast onClose={onClose} show={show} delay={delay} autohide className={`custom-toast--${variant}`}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;