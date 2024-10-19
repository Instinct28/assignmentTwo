import React from 'react';

const Alert = ({ alert }) => {
  return (
    <div className="alert">
      <h3>Weather Alert</h3>
      <p>{alert.map(item => item.message)}</p>
    </div>
  );
};

export default Alert;
