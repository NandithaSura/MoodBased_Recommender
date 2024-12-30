import React from 'react';

const Alert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert-container" style={styles.alertContainer}>
      <div className="alert-box" style={styles.alertBox}>
        <p>{message}</p>
        <button onClick={onClose} style={styles.closeButton}>Dismiss</button>
      </div>
    </div>
  );
};

const styles = {
  alertContainer: {
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 999,
  },
  alertBox: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #f5c6cb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#721c24',
    cursor: 'pointer',
  },
};

export default Alert;
