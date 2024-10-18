import React from 'react';
import useWeatherData from '../Hook/WeatherData';
import WeatherSummary from './SummaryCard';

const Summary = () => {
  const { dailySummary, loading } = useWeatherData();

  return (
    <div className='summaryContainer'>
      <h1>Daily Weather Summary</h1>
      {loading ? <p>Loading...</p> : <WeatherSummary summary={dailySummary} />}
    </div>
  );
};

export default Summary;

