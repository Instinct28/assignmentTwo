import React from 'react';
import useWeatherData from '../Hook/WeatherData';
import WeatherSummary from './SummaryCard';

const Summary = () => {

  const { dailySummary, loading } = useWeatherData();

  return (
    <div>
      <h1>Daily Weather Summary</h1>
      <div className='summaryContainer'>
        { loading ? <p>Loading...</p> : dailySummary.map((element) => {
          return <WeatherSummary key={element._id} summary={element} />
        })}
      </div>
    </div>
  );
};

export default Summary;

