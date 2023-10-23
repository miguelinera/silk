const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/mydatabase";
require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // your frontend server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const paymentRoutes = require('./routes/payments');
const rewardRoutes = require('./routes/rewards');
const userRoutes = require('./routes/users');

// Use routes
//app.use('/api/payments', paymentRoutes);
//app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the super new Silk API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Route to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    console.error("Detailed Error:", error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

