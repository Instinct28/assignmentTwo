const express = require('express');
const router = express.Router();
const {getWeatherData, getDailySummary} = require('../controllers/weatherController');

router.get('/weather', getWeatherData);
router.get('/summary', getDailySummary);

module.exports = router;