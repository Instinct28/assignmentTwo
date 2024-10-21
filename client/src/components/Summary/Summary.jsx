import React, { useState } from 'react';
import useWeatherData from '../Hook/WeatherData';
import WeatherSummary from './SummaryCard';
import { Link } from 'react-router-dom';

const Summary = () => {

  const { dailySummary, loading, setDailySummary } = useWeatherData();
  const [date, setDate] = useState("");

  const handleChange = async (event) => {
    setDate(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetch('http://localhost:8000/api/summary', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date})
    });
    const summary = await result.json();
    setDailySummary(summary);
  }

  return (
    <div>
      <h1>Daily Weather Summary</h1>
      <form onSubmit={handleSubmit}>
        <input type='date' onChange={(event) => handleChange(event)} />
        <button className='button-div' type='submit'>Submit</button>
      </form>
      <Link to="/"><button>Go to home</button></Link>
      <div className='summaryContainer'>
        { loading ? <p>Loading...</p> : dailySummary.map((element) => {
          return <WeatherSummary key={element._id} summary={element} />
        })}
      </div>
    </div>
  );
};

export default Summary;

