const axios = require('axios');
const Weather = require('../models/weather');
require('dotenv').config();
const kelvinToCelsius = require('../utils/temperatureConverter');
const weather = require('../models/weather');
const WeatherSummary = require('../models/summary');

const getWeatherData = async () => {
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
        return data;
    } catch (error) {
        console.log('Failed to retrieve weather data');
    }
};

const getDailySummary = async (req, res) => {
  try {
    // Get the current date (start of the day)
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);  // Set time to midnight

    // Set the end of the day (23:59:59)
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Query the database to get today's weather data
    const summaries = await Weather.aggregate([
      {
        // Match records that belong to today
        $match: {
          dt: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        // Group the weather data by city and date
        $group: {
          _id: {
            city: "$city",
            currentDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$dt" }
            }
          },
          avgTemp: { $avg: "$temp" },            // Average temperature
          maxTemp: { $max: "$temp" },            // Maximum temperature
          minTemp: { $min: "$temp" },            // Minimum temperature
          weatherConditions: { $push: "$main" }, // Collect all weather conditions
        }
      },
      {
        // Sort to ensure proper display order
        $sort: { "_id.day": 1 }
      }
    ]);

    // Determine the dominant weather condition for each city
    const dailySummaries = summaries.map(summary => {
      const weatherCounts = {};

      // Count occurrences of each weather condition
      summary.weatherConditions.forEach(condition => {
        if (weatherCounts[condition]) {
          weatherCounts[condition]++;
        } else {
          weatherCounts[condition] = 1;
        }
      });

      // Find the dominant weather condition
      const dominantCondition = Object.keys(weatherCounts).reduce((a, b) => 
        weatherCounts[a] > weatherCounts[b] ? a : b
      );

      return {
        city: summary._id.city,
        date: summary._id.currentDate,
        avgTemp: summary.avgTemp.toFixed(2),  
        maxTemp: summary.maxTemp.toFixed(2),
        minTemp: summary.minTemp.toFixed(2),
        dominantCondition
      };
    });

    let newSummary = [];

    for (const dailySummary of dailySummaries) {
      // Check if a summary already exists for the city and the current date
      await WeatherSummary.deleteMany({ city: dailySummary.city, date: dailySummary.date });

      // Create a new summary and save it
      const summary = await WeatherSummary.create({
        city: dailySummary.city,
        date: dailySummary.date,
        avgTemp: dailySummary.avgTemp,
        maxTemp: dailySummary.maxTemp,
        minTemp: dailySummary.minTemp,
        dominantCondition: dailySummary.dominantCondition,
        weatherUpdates: []  // Optionally, populate this with detailed updates if needed
      });
      newSummary.push(summary);
    }

    res.status(200).json( newSummary );

  } catch (error) {
    console.error("Error in fetching daily summary", error);
    res.status(500).json({ error: 'Failed to get daily weather summary' });
  }
};

module.exports = {
    getWeatherData,
    getDailySummary
}
