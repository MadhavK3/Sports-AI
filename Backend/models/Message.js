const mongoose = require('mongoose');

// Define a schema for storing chat messages
const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },  // 'user' or 'bot'
    text: { type: String, required: true },    // The actual message text
    sport: { type: String, required: true },   // Sport category (e.g., 'football', 'cricket')
    createdAt: { type: Date, default: Date.now },  // Timestamp of the message
  },
  { timestamps: true }
);

// Create the model based on the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
