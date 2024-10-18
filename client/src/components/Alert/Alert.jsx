import React from 'react';

const AlertNotification = ({ alert }) => {
  return (
    <div className="alert">
      <h3>Weather Alert</h3>
      <p>{alert.message}</p>
    </div>
  );
};

export default AlertNotification;
