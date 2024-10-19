import React from 'react';
import Alert from '../Alert/Alert';

const WeatherCard = ({ city, temp, main, feels_like }) => {

  const alerts = [];

  if (temp > 30) {
    alerts.push({
      message: `Temperature exceeded 30°C in ${city}. Current temp: ${temp.toFixed(2)}°C`,
    });
  }

  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <p>Condition: {main}</p>
      <p>Temperature: {temp.toFixed(2)} °C</p>
      <p>Feels Like: {feels_like.toFixed(2)} °C</p>
      {alerts.length !== 0 && <Alert alert={alerts}/>}
    </div>
  );
};

export default WeatherCard;