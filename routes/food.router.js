const express = require('express');
const router = express.Router();
const Food = require('../models/food.model');
const dummyData = require('../db/dummyData');

// Fetches a list of food items API
router.get("/", async (req, res) => {
  try{
    const foods = await getAllFood();
    if(foods.length === 0){
      seedFoodsData();
    }
    res.status(200).json({
      message: "Foods Found",
      foods
    })
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

async function getAllFood(){
  try{
    const foods = await Food.find();
    return foods;
  }catch(error){
    throw error;
  }
}

const seedFoodsData = () => {
  dummyData.foods.forEach((food) => addFood(food));
  console.log("Seeded...");
}

// Adds a new food item to the list API
router.post('/', async (req, res) => {
  try{
    const { foodData } = req.body;
    const food = await addFood(foodData);
    res.status(201).json({
      message: "Food Created",
      food
    })
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

async function addFood(food){
  try{
    const foundFood = await Food.findOne({ name: food.name });
    if(!foundFood){
      const newFood = new Food(food);
      const createdFood = await newFood.save();
      return createdFood;
    }else{
      throw new Error("Food Already Exists");
    }
  }catch(error){
    throw error;
  }
}

// Removes a food item from the list by its unique ID API
router.delete('/:foodId', async (req, res) => {
  try{
    const { foodId } = req.params;
    const foods = await removeFood(foodId);
    res.status(200).json({
      message: "Food Deleted",
      foods
    })
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

async function removeFood(foodId){
  try{
    const foundFood = await Food.findOne({ _id: foodId });
    if(foundFood){
      await Food.findByIdAndDelete(foodId);
      const foods = await Food.find();
      return foods;
    }else{
      throw new Error("Food Not Found");
    }
  }catch(error){
    throw error;
  }
}

module.exports = router;