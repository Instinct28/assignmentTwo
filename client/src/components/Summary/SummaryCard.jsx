import React from 'react';
import Alert from '../Alert/Alert';

const WeatherSummary = ({ summary }) => {

  const alerts = [];

  if (summary.maxTemp > 30) {
    alerts.push({
      message: `Temperature exceeded 30°C in ${summary.city}. Current temp: ${summary.maxTemp.toFixed(2)}°C`,
    });
  }

  return (
    <div className="summaryCard">
      <h2>Daily Weather Summary</h2>
      <p>City: {summary.city} </p>
      <p>Average Temp: {summary.avgTemp} °C</p>
      <p>Max Temp: {summary.maxTemp} °C</p>
      <p>Min Temp: {summary.minTemp} °C</p>
      <p>Dominant Condition: {summary.dominantCondition}</p>
      {alerts.length !== 0 && <Alert alert={alerts}/>}
    </div>
  );
};

export default WeatherSummary;
