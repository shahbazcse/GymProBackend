const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type:  String,
    required: true,
  },
  description: String,
  targetDate: Date,
  targetCalories: Number,
  status: String,
}, {
  timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;