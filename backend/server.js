require('dotenv').config();
console.log(process.env.MONGODBURI);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const workoutSession = require('./controllers/workoutSession'); // Correct import statement

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Directly defined routes
app.get('/api/workoutSessions', workoutSession.getAllSessions);
app.post('/api/workoutSessions', workoutSession.createSession);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
