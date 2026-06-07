import React from 'react';

const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
