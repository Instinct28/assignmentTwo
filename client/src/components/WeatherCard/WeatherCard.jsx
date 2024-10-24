import React from 'react';
import Alert from '../Alert/Alert';

const WeatherCard = ({ city, temp, main, dt, feels_like, humidity, wind }) => {

  const alerts = [];

  if (temp > 35) {
    alerts.push({
      message: `Temperature exceeded 35°C in ${city}. Current temp: ${temp.toFixed(2)}°C`,
    });
  }

  const formattedDate = new Date(dt).toLocaleDateString('en-GB');

  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <p>Date: {formattedDate}</p>
      <p>Condition: {main}</p>
      <p>Temperature: {temp.toFixed(2)} °C</p>
      <p>Feels Like: {feels_like.toFixed(2)} °C</p>
      <p>Humidity: {humidity} %</p>
      <p>Wind Speed: {wind} m/s</p>
      {alerts.length !== 0 && <Alert alert={alerts}/>}
    </div>
  );
};

export default WeatherCard;