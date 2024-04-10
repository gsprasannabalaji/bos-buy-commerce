import Toast from 'react-bootstrap/Toast';

const CustomToast = ({ toastMessage = "", toastHeader = "", showToast, toggleToast, position }) => {
  return (
    <Toast className='custom-toast' onClose={toggleToast} show={showToast} animation={false} autohide={true} position={position}>
      {toastHeader && (
        <Toast.Header>
          <p className="me-auto">{toastHeader}</p>
        </Toast.Header>
      )}
      {toastMessage && (
        <Toast.Body>{toastMessage}</Toast.Body>
      )}
    </Toast>
  );
};

export default CustomToast;
