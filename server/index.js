const express = require('express');
const cors = require('cors');

const {getWeatherData, getDailySummary} = require('./controllers/weatherController');
const connectionToDB = require('./config');
require('dotenv').config();

const app = express();
const PORT = 8000;
const interval = process.env.WEATHER_UPDATE_INTERVAL || 300000;

connectionToDB();

app.use(cors());

app.get('/api/weather', async (req, res) => {
    const result = await getWeatherData();
    res.json(result);
});

setInterval(async () => {
    console.log("Fetching weather data every 5 minutes...");
    await getWeatherData();
}, interval);

app.get('/api/summary', getDailySummary);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});