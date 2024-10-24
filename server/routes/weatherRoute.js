const express = require('express');
const router = express.Router();
const {getWeatherData, getDailySummary} = require('../controllers/weatherController');

const interval = 300000;

setInterval(async () => {
    router.get('/weather', getWeatherData);
}, interval);
router.get('/summary', getDailySummary);

module.exports = router;