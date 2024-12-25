const express = require('express');
const Job = require('../models/job'); 
const User = require('../models/user'); 
const router = express.Router();

router.post('/post-job', async (req, res) => {
  const { title, location, userId } = req.body;
  if (!title || !location || !userId) {
    return res.status(400).send('Title, location, and user ID are required!');
  }

  const user = await User.findById(userId);
  if (!user || user.role !== 'employer') {
    return res.status(400).send('Only employers can post jobs');
  }

  const newJob = new Job({ title, location, postedBy: userId });
  await newJob.save();
  res.status(201).send('Job posted successfully on JobConnect!');
});

router.get('/search', async (req, res) => {
  const { title, location } = req.query;

  const query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (location) query.location = { $regex: location, $options: 'i' };

  const jobs = await Job.find(query).populate('postedBy', 'name');
  res.status(200).json(jobs);
});

module.exports = router;
