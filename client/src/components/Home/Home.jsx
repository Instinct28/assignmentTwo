import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import useWeatherData from '../Hook/WeatherData';
import { Link } from 'react-router-dom';

const Home = () => {
  const { weatherData, loading } = useWeatherData();

  return (
    <div className='container'>
      <h1>Weather Monitoring</h1>
      <div className='float-end'>
      <Link to="/summary"><button className='btn btn-primary'>See detailed summary</button></Link>
      </div>
      <div className='WeatherContainer'>
        {loading ? (
            <p>Loading...</p>
        ) : (
            weatherData.map((weather) => (
            <WeatherCard key={weather._id} {...weather} />
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
