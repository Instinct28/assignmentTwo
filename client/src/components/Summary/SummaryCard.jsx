import React from 'react';
import Alert from '../Alert/Alert';

const WeatherSummary = ({ summary }) => {

  const alerts = [];

  if (summary.maxTemp > 35) {
    alerts.push({
      message: `Temperature exceeded 35°C in ${summary.city}. Current temp: ${summary.maxTemp}°C`,
    });
  }

  const formattedDate = new Date(summary.date).toLocaleDateString('en-GB');

  return (
    <div className="summaryCard" >
      <h2>Daily Weather Summary</h2>
      <p>Date: {formattedDate}</p>
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
