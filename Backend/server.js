// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://MadhavK3:MadhavKhobare3@sportsai.r88zf4y.mongodb.net/?retryWrites=true&w=majority&appName=SportsAI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/chat', chatRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
