require('./db/db.connection');

const express = require('express');
const app = express();
app.use(express.json());

const exerciseRouter = require('./routes/exercises.router');
const foodRouter = require('./routes/food.router');
const goalRouter = require('./routes/goals.router');

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'https://thegympro.vercel.app'],
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mounting /exercises Router
app.use('/exercises', exerciseRouter);

// Mounting /food Router
app.use('/food', foodRouter);

// Mounting /goals Router
app.use('/goals', goalRouter);