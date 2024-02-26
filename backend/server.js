// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express'); // Express framework to simplify HTTP server creation
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const bodyParser = require('body-parser'); // Body-parser middleware to parse request bodies

// Import routes from controllers
const workoutSessionRoutes = require('./controllers/workoutSession'); // Routes for workout sessions
const exerciseRoutes = require('./controllers/exercise'); // Routes for managing exercises

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients)

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log('Connected to MongoDB')) // Log success message upon connection
  .catch(err => console.error('Could not connect to MongoDB:', err)); // Log any errors

// Setup routes
// Mount workout session routes at '/api/workoutSessions'
app.use('/api/workoutSessions', workoutSessionRoutes);
// Mount exercise routes at '/api/workoutSessions'
// Note: This shares the same base path as workoutSessionRoutes, which might lead to confusion or overlap
app.use('/api/workoutSessions', exerciseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log the server's running status
});
