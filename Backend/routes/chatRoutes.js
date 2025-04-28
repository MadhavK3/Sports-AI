// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat'); // model

// POST route to save message
router.post('/message', async (req, res) => {
  try {
    const { sender, text, sport } = req.body;
    const newChat = new Chat({ sender, text, sport });
    await newChat.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
