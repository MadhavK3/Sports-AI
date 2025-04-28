// src/App.js

import { useState } from 'react';
import { SendHorizonal, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './App.css';

// Static Data
const sportsData = [
  { id: 'football', name: 'Football', emoji: '⚽', legends: ["Messi", "Ronaldo", "Neymar", "Mbappé"] },
  { id: 'cricket', name: 'Cricket', emoji: '🏏', legends: ["Kohli", "Dhoni", "Sharma", "Smith"] },
  { id: 'tennis', name: 'Tennis', emoji: '🎾', legends: ["Federer", "Nadal", "Djokovic", "Williams"] },
  { id: 'basketball', name: 'Basketball', emoji: '🏀', legends: ["James", "Jordan", "Bryant", "Curry"] },
  { id: 'more', name: 'More Sports', emoji: '🏆' }
];

// Responses
const responses = {
  football: [
    `Football is the beautiful game! ⚽ Messi has 7 Ballon d'Or awards!`,
    `Ronaldo holds the record for most international goals!`,
    `The World Cup is the biggest football event!`
  ],
  cricket: [
    `Cricket is huge in India! 🏏 Dhoni is a legend!`,
    `The IPL is one of the biggest T20 leagues!`,
    `Test cricket shows real patience and skill!`
  ],
  tennis: [
    `Federer, Nadal, and Djokovic have ruled tennis! 🎾`,
    `Wimbledon is the most prestigious tennis event!`,
    `Serena Williams is a tennis icon!`
  ],
  basketball: [
    `The NBA is where amazing happens! 🏀`,
    `Michael Jordan is considered the GOAT!`,
    `Steph Curry changed basketball with 3-pointers!`
  ],
  general: [
    `Sports bring people together! 🏆`,
    `Athletes inspire millions worldwide!`,
    `Which sport inspires you the most?`
  ]
};

// Helper functions
const detectSport = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('football') || /messi|ronaldo|neymar|mbappé/.test(lower)) return 'football';
  if (lower.includes('cricket') || /Dhoni|Kohli|sharma|smith/.test(lower)) return 'cricket';
  if (lower.includes('tennis') || /federer|nadal|djokovic|williams/.test(lower)) return 'tennis';
  if (lower.includes('basketball') || /james|jordan|bryant|curry/.test(lower)) return 'basketball';
  return 'general';
};

const generateBotReply = (inputText) => {
  const sport = detectSport(inputText);
  const sportResponses = responses[sport] || responses.general;
  const randomResponse = sportResponses[Math.floor(Math.random() * sportResponses.length)];
  return { sender: 'bot', text: randomResponse, sport };
};

const getSportEmoji = (sport) => {
  const found = sportsData.find(s => s.id === sport);
  return found ? found.emoji : '🏆';
};

// Main Component
function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hey Champ! 🌟 Ask me anything about sports!", sport: 'general' }
  ]);
  const [input, setInput] = useState('');
  const [activeSport, setActiveSport] = useState('all');

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      sender: 'user',
      text: trimmed,
      sport: detectSport(trimmed)
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      await axios.post('http://localhost:5000/api/chat/message', userMsg);
      const botMsg = generateBotReply(trimmed);
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">🏆 SportsTalk AI 🏆</h1>
            <div className="sports-nav">
              {sportsData.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => setActiveSport(sport.id)}
                  className={`sport-btn ${activeSport === sport.id ? 'active' : ''}`}
                >
                  <span className="sport-emoji">{sport.emoji}</span>
                  <span>{sport.name}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="chat-area">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {msg.sender === 'bot' ? (
                  <>
                    <span className="sport-icon">{getSportEmoji(msg.sport)}</span>
                    <Bot className="icon" />
                  </>
                ) : (
                  <User className="icon" />
                )}
                <span className="message-text">{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Dhoni,Messi, Kohli, Federer..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-btn">
            <SendHorizonal className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
