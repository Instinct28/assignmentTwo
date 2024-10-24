const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI;

const connectionToDB = () => {
    mongoose.connect('mongodb://localhost:27017/weather_monitoring').then(() => {
        console.log("Database connected");
    }).catch(() => {
        console.log("Error in database connection");
    })
}

module.exports = connectionToDB;