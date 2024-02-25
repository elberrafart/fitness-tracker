const mongoose = require('mongoose');

const WorkoutSessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
});

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
