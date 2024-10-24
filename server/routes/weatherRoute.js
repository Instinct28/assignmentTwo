const express = require('express');
const router = express.Router();
const {getWeatherData, getDailySummary} = require('../controllers/weatherController');
require('dotenv').config();

const interval = process.env.WEATHER_UPDATE_INTERVAL || 300000;

setInterval(async () => {
    router.get('/weather', getWeatherData);
}, interval);
router.get('/summary', getDailySummary);

module.exports = router;