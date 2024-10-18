import React from 'react';

const WeatherSummary = ({ summary }) => {
  return (
    <div className="summaryCard">
      <h2>Daily Weather Summary</h2>
      <p>Average Temp: {summary.avgTemp} °C</p>
      <p>Max Temp: {summary.maxTemp} °C</p>
      <p>Min Temp: {summary.minTemp} °C</p>
      <p>Dominant Condition: {summary.dominantCondition}</p>
    </div>
  );
};

export default WeatherSummary;
