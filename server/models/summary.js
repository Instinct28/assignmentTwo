const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now },
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantCondition: String,
    weatherUpdates: Array 
});

const WeatherSummary = mongoose.model('WeatherSummary', summarySchema);

module.exports = WeatherSummary;