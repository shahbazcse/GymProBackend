const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');
const dummyData = require('../db/dummyData');

// Fetches a list of exercises API
router.get('/', async (req, res) => {
  try {
    const allExercises = await getAllExercises();
    if (allExercises.length === 0) {
      seedExercisesData();
    }
    res.status(200).json({
      message: "Exercises Found",
      exercises: allExercises
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

async function getAllExercises() {
  try {
    const allExercises = await Exercise.find();
    return allExercises;
  } catch (error) {
    throw error;
  }
}

const seedExercisesData = () => {
  dummyData.exercises.forEach((exercise) => addExercise(exercise));
  console.log("Seeded...");
}

// Adds a new exercise to the list API
router.post('/', async (req, res) => {
  try {
    const { exerciseData } = req.body;
    const exercise = await addExercise(exerciseData);
    res.status(201).json({
      message: "Exercise Added",
      exercise
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

async function addExercise(exercise) {
  try {
    const foundExercise = await Exercise.findOne({ name: exercise.name });
    if (!foundExercise) {
      const newExercise = new Exercise(exercise);
      const createdExercise = await newExercise.save();
      return createdExercise;
    } else {
      throw new Error("Exercise Already Exists");
    }
  } catch (error) {
    throw error;
  }
}

//  Removes an exercise from the list by its unique ID API
router.delete('/:exerciseId', async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const allExercises = await removeExercise(exerciseId);
    res.status(200).json({
      message: "Exercise Deleted",
      exercises: allExercises
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

async function removeExercise(exerciseId) {
  try {
    const exercise = await Exercise.findOne({ _id: exerciseId });
    if (exercise) {
      await Exercise.findByIdAndDelete(exerciseId);
      const allExercises = Exercise.find();
      return allExercises;
    } else {
      throw new Error("Exercise Not Found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = router;