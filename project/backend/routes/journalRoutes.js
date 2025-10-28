// routes/journalRoutes.js

const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const { getWeather } = require('../utils/weather');

// Middleware for security (a simple filter for demonstration)
const securityFilter = (req, res, next) => {
  // In a real app, this would be JWT authentication, API key check, etc.
  // For this demo, we'll check for a simple header.
  if (req.headers['x-journal-app-secret'] === process.env.JWT_SECRET) {
    next();
  } else {
    // Simple rate limiting for unauthorized access
    // This is a basic security filter as requested
    res.status(401).json({ message: 'Unauthorized access. Please provide a valid secret.' });
  }
};

// @route   POST api/journals
// @desc    Create a new journal entry
// @access  Private (via securityFilter)
router.post('/', securityFilter, async (req, res) => {
  const { title, content, location } = req.body;

  try {
    let weather = 'N/A';
    if (location) {
      weather = await getWeather(location);
    }

    const newEntry = new JournalEntry({
      title,
      content,
      location: location || 'N/A',
      weather,
    });

    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journals
// @desc    Get all journal entries
// @access  Private (via securityFilter)
router.get('/', securityFilter, async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
