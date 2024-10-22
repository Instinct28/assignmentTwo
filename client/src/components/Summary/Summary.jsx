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
    <div className='container'>
      <h1>Daily Weather Summary</h1>
      <div className='d-flex justify-content-between'>
      <Link to="/"><button className='btn btn-primary'>Go to home</button></Link>
      <form className='d-flex justify-content-around' onSubmit={handleSubmit}>
        <input type='date' onChange={(event) => handleChange(event)} />
        <button className='button-div btn btn-primary' type='submit'>Submit</button>
      </form>
      </div>
      {
        dailySummary.length !== 0 ? 
        <div className='summaryContainer'>
          { loading ? <p>Loading...</p> : dailySummary.map((element) => {
            return <WeatherSummary key={element._id} summary={element} />
          })}
        </div> : <h3 className='block'>We can't predict Future</h3>
      } 
    </div>
  );
};

export default Summary;

