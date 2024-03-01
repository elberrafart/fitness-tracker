// Load environment variables from .env file
require('dotenv').config({ path: './backend/.env' });

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const workoutSessionRoutes = require('./controllers/workoutSession');
const exerciseRoutes = require('./controllers/exercise');

// Initialize Express app
const app = express();

// Middleware
// Update CORS to allow requests from client application's origin
app.use(cors({
  origin: 'http://localhost:5173' // Make sure this matches the client's origin
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Setup routes
app.use('/api/workoutSessions', workoutSessionRoutes);
app.use('/api/exercises', exerciseRoutes); // Adjusted comment for clarity

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
