const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const WorkoutSessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  exercises: [ExerciseSchema] // Embedding ExerciseSchema directly
});

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
