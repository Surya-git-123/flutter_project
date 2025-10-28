// models/JournalEntry.js

const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    default: 'N/A',
  },
  location: {
    type: String,
    default: 'N/A',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
