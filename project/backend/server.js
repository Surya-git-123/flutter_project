// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Security and Rate Limiting Middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(helmet());
app.use(limiter);

// Database connection (using a placeholder for now)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/journaldb';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use Journal Routes
const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journals', journalRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Journal App Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
