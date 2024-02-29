// Import necessary modules
const express = require('express');
const router = express.Router();
const WorkoutSession = require('../models/workoutSession'); // Adjust the path as necessary

// GET all workout sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await WorkoutSession.find({});
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {

    delete req.body._id;

    // Basic validation to check if the required fields are present
    if (!req.body.date || !req.body.exercises) {
        return res.status(400).json({ message: 'Missing date or exercises in request' });
    }

    // Further validation can be added here to check the integrity of each exercise

    try {
        // Assuming req.body is already in the correct format as per your schema
        const newSession = new WorkoutSession(req.body);

        // Validate the session before saving to catch any schema-related errors
        const validationError = newSession.validateSync();
        if (validationError) {
            console.error("Validation error:", validationError.message);
            return res.status(400).json({ message: validationError.message });
        }

        // Save the new workout session to the database
        await newSession.save();
        res.status(201).json(newSession);
    } catch (err) {
        // If saving to the database fails, respond with a server error status code and message
        console.error("Error creating new workout session:", err); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
});


// GET a single workout session by ID
router.get('/:id', async (req, res) => {
    try {
        const session = await WorkoutSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Workout session not found' });
        }
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT to update a workout session by ID
router.put('/:id', async (req, res) => {
    try {
        const session = await WorkoutSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a workout session by ID
router.delete('/:id', async (req, res) => {
    try {
        await WorkoutSession.findByIdAndDelete(req.params.id);
        res.json({ message: 'Workout session deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export the router to use in server.js
module.exports = router;
