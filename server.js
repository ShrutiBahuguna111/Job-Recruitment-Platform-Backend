const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (or specify origins in the options)
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Use Routes
app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
