// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const WorkoutSession = require('../models/workoutSession'); 

// Fetch all exercises for a given workout session
router.get('/:sessionId/exercises', async (req, res) => {
    try {
        // Attempt to find the workout session by its ID
        const session = await WorkoutSession.findById(req.params.sessionId);
        if (!session) {
            // If no session is found, respond with a 404 status
            return res.status(404).json({ message: 'Workout session not found' });
        }
        
        // If found, respond with the exercises array from that session
        res.json(session.exercises);
    } catch (err) {
        // Log any server errors and respond with a 500 status
        console.error("Error fetching exercises:", err);
        res.status(500).json({ message: err.message });
    }
});

// Add a new exercise to a specific workout session
router.post('/:sessionId/exercises', async (req, res) => {
    try {
        // Find the specified workout session by ID
        const session = await WorkoutSession.findById(req.params.sessionId);
        if (!session) {
            // If not found, respond with a 404 status
            return res.status(404).json({ message: 'Workout session not found' });
        }
        
        // Add the new exercise (from request body) to the session's exercises array
        session.exercises.push(req.body);
        
        // Save the session with the new exercise added
        await session.save();
        
        // Respond with the updated workout session
        res.status(201).json(session);
    } catch (err) {
        // Log any errors and respond with a 500 status
        console.error("Error adding exercise:", err);
        res.status(500).json({ message: err.message });
    }
});

// Update details of a specific exercise within a workout session
router.put('/:sessionId/exercises/:exerciseId', async (req, res) => {
    try {
        // Find the workout session by ID
        const session = await WorkoutSession.findById(req.params.sessionId);
        if (!session) {
            // If the session is not found, respond with a 404 status
            return res.status(404).json({ message: 'Workout session not found' });
        }
        
        // Attempt to find the specific exercise by ID within the session
        let exercise = session.exercises.id(req.params.exerciseId);
        if (!exercise) {
            // If the exercise is not found, respond with a 404 status
            return res.status(404).json({ message: 'Exercise not found' });
        }
        
        // Update the exercise with the new details from the request body
        Object.assign(exercise, req.body);
        // Save the session with the updated exercise
        await session.save();
        
        // Respond with the updated session
        res.json(session);
    } catch (err) {
        // Log any errors and respond with a 500 status
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific exercise from a workout session
router.delete('/:sessionId/exercises/:exerciseId', async (req, res) => {
    try {
        // Find the workout session by ID
        const session = await WorkoutSession.findById(req.params.sessionId);
        if (!session) {
            // If the session is not found, respond with a 404 status
            return res.status(404).json({ message: 'Workout session not found' });
        }

        // Remove the specified exercise by filtering out the one with the matching ID
        const exercises = session.exercises.filter(exercise => exercise._id.toString() !== req.params.exerciseId);

        // Assign the filtered list back to the session's exercises
        session.exercises = exercises;

        // Save the session after removing the exercise
        await session.save();

        // Respond with a success message
        res.json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        // Log any errors and respond with a 500 status
        console.error("Error deleting exercise:", err);
        res.status(500).json({ message: 'Internal server error', error: err.message, stack: err.stack });
    }
});

// Export the router so it can be used by the rest of the app
module.exports = router;
