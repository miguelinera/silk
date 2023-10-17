const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require('../controllers/userController');
const mongoose = require('mongoose');
const User = require('../models/user'); // Import your Mongoose model


// Use either the controller method or the inline method for /register, not both
// router.post('/register', userController.register);

router.post('/register', async (req, res) => {
    try {
        // Validate user input
        if (!req.body.email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User already registered.' });
        }

        // Create new user
        user = new User({
            email: req.body.email,
            password: req.body.password,
            // other fields
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ message: 'Server errorrrrrr', error: error });
    }
});


router.post('/login', async (req, res) => {
    try {
        // Validate user input
        // TODO: Add validation logic

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

        // Add this line for debugging:
        console.log(process.env.JWT_SECRET);

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    } catch (error) {
        console.error("Detailed Error:", error); // Log the actual error object
        res.status(500).json({ message: 'Server errorrrrrr', error: error }); // Send the error object in the response
    }       
});

router.get('/some-protected-route', authenticate, (req, res) => {
    // Your code here
    res.status(200).json({ message: 'Protected route accessed' });
});

// Route to retrieve all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Retrieve all users from the database
      res.json(users); // Send the users as a JSON response
    } catch (error) {
      console.error("Detailed Error:", error);
      res.status(500).json({ message: 'Server error', error: error });
    }
  });
  

module.exports = router;