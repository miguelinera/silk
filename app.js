const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/mydatabase";

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
  res.send('Welcome to the Silk API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Import mongoose model

const RecordModel = require('./models/mongooseModel');

// Database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  // Define a route to retrieve all records
app.get('/api/records', (req, res) => {
  // Use Mongoose to fetch all records from MongoDB
  YourModel.find({}, (err, records) => {
    if (err) {
      // Handle error
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the records as JSON response
      res.json(records);
    }
  });
});
