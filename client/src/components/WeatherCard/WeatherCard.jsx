import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ city, temp, main, feels_like }) => {
  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <p>Condition: {main}</p>
      <p>Temperature: {temp.toFixed(2)} °C</p>
      <p>Feels Like: {feels_like.toFixed(2)} °C</p>
    </div>
  );
};

export default WeatherCard;