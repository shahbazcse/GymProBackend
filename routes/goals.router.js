const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const dummyData = require('../db/dummyData');

// Fetches a list of fitness goals API
router.get('/', async (req, res) => {
  try{
    const goals = await getAllGoals();
    if(goals.length === 0){
      seedGoalsData();
    }
    res.status(200).json({
      message: "Goals Found",
      goals
    })
  }catch(e){
    res.status(500).json({
      error: e.message
    })
  }
})

async function getAllGoals(){
  try{
    const allGoals = await Goal.find();
    return allGoals;
  }catch(error){
    throw error;
  }
}

const seedGoalsData = () => {
  dummyData.goals.forEach((goal) => addGoal(goal));
  console.log("Seeded...");
}

// Adds a new fitness goal to the list API
router.post('/', async (req, res) => {
  try{
    const { goalData } = req.body;
    const goal = await addGoal(goalData);
    res.status(201).json({
      message: "Goal Created",
      goal
    })
  }catch(e){
    res.status(500).json({
      error: e.message
    })
  }
})

async function addGoal(goal){
  try{
    const foundGoal = await Goal.findOne({ name: goal.name });
    if(!foundGoal){
      const newGoal = new Goal(goal);
      const createdGoal = await newGoal.save();
      return createdGoal;
    }else{
      throw new Error("Goal Already Exists");
    }
  }catch(error){
    throw error;
  }
}

// Removes a fitness goal from the list by its unique ID API
router.delete('/:goalId', async (req, res) => {
  try{
    const { goalId } = req.params;
    const goals = await removeGoal(goalId);
    res.status(200).json({
      message: "Goal Deleted",
      goals
    })
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

async function removeGoal(goalId){
  try{
    const foundGoal = await Goal.findOne({ _id: goalId });
    if(foundGoal){
      await Goal.findByIdAndDelete(goalId);
      const goals = await Goal.find();
      return goals;
    }else{
      throw new Error("Goal Not Found");
    }
  }catch(error){
    throw error;
  }
}

module.exports = router;