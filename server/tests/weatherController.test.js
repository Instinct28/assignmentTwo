const mongoose = require('mongoose');
const Weather = require('../models/weather');
const weatherController = require('../controllers/weatherController');

beforeAll(async () => {
    const uri = 'mongodb://localhost:27017/testdb'; // Ensure this matches your Docker setup
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clear the test database
    await mongoose.disconnect();
});

describe('Weather Controller', () => {
    test('should fetch weather data for cities', async () => {
        const data = await weatherController.getWeatherData();
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0); // Ensure some data is fetched
    });

    // Add more tests as needed
});
