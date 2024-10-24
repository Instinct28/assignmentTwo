const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  main: String,
  dt: { type: Date, default: Date.now },
  humidity: Number,
  wind: Number
});

module.exports = mongoose.model('weathers', WeatherSchema);