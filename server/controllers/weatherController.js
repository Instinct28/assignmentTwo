const axios = require('axios');
const Weather = require('../models/weather');
require('dotenv').config();
const kelvinToCelsius = require('../utils/temperatureConverter');
const weather = require('../models/weather');

const getWeatherData = async (req, res) => {
    try {
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
        const apiKey = process.env.API_KEY;
        let weatherData = [];
        for (const city of cities) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const tempInCelsius = kelvinToCelsius(response.data.main.temp);
            weatherData.push({
                city,
                temp: tempInCelsius,
                main: response.data.weather[0].main,
                feels_like: kelvinToCelsius(response.data.main.feels_like),
                dt: new Date(response.data.dt * 1000),
            });
        }
        const data = await Weather.insertMany(weatherData);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve weather data' });
    }
};

const getDailySummary = async (req, res) => {
  try {
    // Logic to aggregate daily weather summaries (average, max, min, dominant weather condition)
    const summary = await weather.find();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve daily summary' });
  }
};

module.exports = {
    getWeatherData,
    getDailySummary
}
