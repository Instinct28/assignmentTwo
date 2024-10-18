import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import useWeatherData from '../Hook/WeatherData';

const Home = () => {
  const { weatherData, loading } = useWeatherData();

  return (
    <div>
      <h1>Weather Monitoring</h1>
      <div className='WeatherContainer'>
        {loading ? (
            <p>Loading...</p>
        ) : (
            weatherData.map((weather) => (
            <WeatherCard key={weather.city} {...weather} />
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
