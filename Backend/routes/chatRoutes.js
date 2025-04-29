// backend/routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Simple bot logic
function generateBotReply(userMessage) {
  const lower = userMessage.toLowerCase();

  if (lower.includes('messi')) return "Messi is the 🐐 in football!";
  if (lower.includes('ronaldo')) return "Ronaldo is a goal machine! ⚽";
  if (lower.includes('kohli')) return "Kohli dominates cricket like a boss! 🏏";
  if (lower.includes('federer')) return "Federer is a tennis legend! 🎾";
  return "That's interesting! Tell me more about your favorite sports.";
}

// Route for sending a message
router.post('/message', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const newMessage = new Chat({ message });
    await newMessage.save();

    const botReply = generateBotReply(message);

    res.status(200).json({
      user: message,
      bot: botReply
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
