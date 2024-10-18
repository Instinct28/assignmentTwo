const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weatherRoute');
const connectionToDB = require('./config');

const app = express();
const PORT = 8000;

connectionToDB();

app.use(cors());

app.use('/api', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});