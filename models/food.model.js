const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type:  String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: Number,
  carbohydrates: Number,
  fat: Number,
}, {
  timestamps: true
})

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;