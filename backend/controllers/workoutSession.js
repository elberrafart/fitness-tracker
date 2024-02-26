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

// POST a new workout session
router.post('/', async (req, res) => {
    try {
        const newSession = await WorkoutSession.create(req.body);
        res.status(201).json(newSession);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
