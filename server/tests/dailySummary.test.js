const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const Weather = require('../models/weather');
const weatherController = require('../controllers/weatherController');

// Setup the Express app with routes for testing
const app = express();
app.use(express.json());
app.get('/weather/daily-summary', weatherController.getDailySummary);

beforeAll(async () => {
    const uri = 'mongodb://localhost:27017/testdb'; // Ensure this matches your Docker setup
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clear the test database
    await mongoose.disconnect();
});

describe('Daily Summary', () => {
    test('should get daily weather summary', async () => {
        const response = await request(app).get('/weather/daily-summary');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Ensure the response is an array
    });

    // Add more tests as needed
});
