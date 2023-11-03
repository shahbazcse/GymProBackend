const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type:  String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  caloriesBurned: Number,
}, {
  timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;