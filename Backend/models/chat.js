// models/Chat.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
