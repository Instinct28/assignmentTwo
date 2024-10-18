const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI;

const connectionToDB = () => {
    mongoose.connect(url).then(() => {
        console.log("Database connected");
    }).catch(() => {
        console.log("Error in database connection");
    })
}

module.exports = connectionToDB;