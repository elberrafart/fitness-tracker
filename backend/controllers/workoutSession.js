// Corrected path to require the WorkoutSession model
const WorkoutSession = require('../models/workoutSession');

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSession = async (req, res) => {
  const session = new WorkoutSession({
    date: req.body.date,
    exercises: req.body.exercises
  });

  try {
    const newSession = await session.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add more CRUD functions as needed
