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
  // Removed the date field as the workout session will have a date
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
