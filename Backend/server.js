// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://MadhavK3:MadhavKhobare3@sportsai.r88zf4y.mongodb.net/?retryWrites=true&w=majority&appName=SportsAI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection failed:", err));

// Optional homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Sports AI Chatbot Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
