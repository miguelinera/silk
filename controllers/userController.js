const User = require('../models/user'); // Import your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // Validate user input (you can use libraries like 'joi' for this)
  
  // Check if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // Create new user
  user = new User({
    email: req.body.email,
    password: hashedPassword,
    // other fields
  });
  
  // Save user to database
  await user.save();
  
  res.send('User registered successfully');
};

exports.login = async (req, res) => {
  // Validate user input
  
  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
  
  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  
  // Generate JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  
  res.send(token);
};
