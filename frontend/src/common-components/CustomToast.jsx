import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const CustomToast = ({ show, onClose, message, header, bgColor = 'success', delay = 3000 }) => {
  const headerStyle = {
    backgroundColor: bgColor, 
    color: 'white', 
    fontWeight: 'bold'
  };

  const bodyStyle = {
    backgroundColor: bgColor,
    color: 'white',
    opacity: 1  
  };

  return (
    <ToastContainer className="p-3" position="top-end" style={{ position: 'fixed', top: 0, right: 0, zIndex: 1050 }}>
      <Toast onClose={onClose} show={show} delay={delay} autohide style={bodyStyle}>
        <Toast.Header style={headerStyle}>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;


/*
This is for success message: 
setToastConfig({ header: 'Success', message: 'Product has been successfully deleted!', bgColor: '#198754' });

This is for error message:
setToastConfig({ header: 'Error', message: 'Failed to delete product!', bgColor: '#dc3545' });


*/