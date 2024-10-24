const axios = require('axios');
const Weather = require('../models/weather');
const kelvinToCelsius = require('../utils/temperatureConverter');
const WeatherSummary = require('../models/summary');
require('dotenv').config();

// Function to fetch weather data for multiple cities
const getWeatherData = async () => {
  try {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const apiKey = process.env.API_KEY;
    let weatherData = [];

    for (const city of cities) {
      // Fetch weather data for each city
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const tempInCelsius = kelvinToCelsius(response.data.main.temp);

      // Push formatted weather data to the array
      weatherData.push({
        city,
        temp: tempInCelsius,
        main: response.data.weather[0].main,
        feels_like: kelvinToCelsius(response.data.main.feels_like),
        dt: new Date(response.data.dt * 1000),
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed
      });
    }

    // Save weather data to the database
    const data = await Weather.create(weatherData);
    return data;
  } catch (error) {
    console.log('Failed to retrieve weather data', error);
    throw new Error('Error retrieving weather data');
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
            $gte: new Date(startOfDay),
            $lte: new Date (endOfDay)
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
        $sort: { "_id.city": 1 }
      }
    ]);

    // Determine the dominant weather condition for each city
    const dailySummaries = summaries.map(summary => {

        if(summary._id.city === null){
            return "";
        }
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
        date: new Date(summary._id.currentDate),  // Convert to Date object
        avgTemp: summary.avgTemp.toFixed(2),  
        maxTemp: summary.maxTemp.toFixed(2),
        minTemp: summary.minTemp.toFixed(2),
        dominantCondition
      };
    });

    // Save each summary to the database after removing the old ones
    for (const dailySummary of dailySummaries) {
      // Check if a summary already exists for the city and the current date
      await WeatherSummary.deleteMany({ city: dailySummary.city, date: dailySummary.date });

      // Create a new summary and save it
      const newSummary = new WeatherSummary({
        city: dailySummary.city,
        date: dailySummary.date,
        avgTemp: dailySummary.avgTemp,
        maxTemp: dailySummary.maxTemp,
        minTemp: dailySummary.minTemp,
        dominantCondition: dailySummary.dominantCondition,
        weatherUpdates: []  // Optionally, populate this with detailed updates if needed
      });

      await newSummary.save();  // Save the new summary
    }

    // Return the new summaries as a response
    res.status(200).json(dailySummaries);

  } catch (error) {
    console.error("Error in fetching and saving daily summary", error);
    res.status(500).json({ error: 'Failed to get and save daily weather summary' });
  }
};
  

module.exports = {
  getWeatherData,
  getDailySummary
};
