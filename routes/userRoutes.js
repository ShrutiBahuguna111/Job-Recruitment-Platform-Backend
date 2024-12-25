const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).send('All fields are required!');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();
  res.status(201).send('User registered successfully on JobConnect!');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required!');
  }

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).send('Invalid credentials');
  }

  res.status(200).send('Login successful!');
});

module.exports = router;
