import React, { useState } from 'react';
import useWeatherData from '../Hook/WeatherData';
import WeatherSummary from './SummaryCard';
import { Link } from 'react-router-dom';

const Summary = () => {

  const { dailySummary, loading} = useWeatherData();

  return (
    <div>
      <h1>Daily Weather Summary</h1>
      <Link to="/"><button>Go to home</button></Link>
      <div className='summaryContainer'>
        { loading ? <p>Loading...</p> : dailySummary.map((element) => {
          return <WeatherSummary key={element.city} summary={element} />
        })}
      </div>
    </div>
  );
};

export default Summary;

