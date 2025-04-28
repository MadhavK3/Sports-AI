import React, { useState } from 'react';
import { fetchSportByName } from '../services/api';

function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [sport, setSport] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetchSportByName(prompt);
      setSport(res.data);
    } catch (error) {
      console.error('Error fetching sport:', error);
      setSport(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Type a sport (e.g., Cricket)" 
      />
      <button onClick={handleSearch}>Search</button>

      {sport && (
        <div style={{ marginTop: '20px' }}>
          <h2>{sport.name}</h2>
          <p><b>Description:</b> {sport.description}</p>
          <p><b>History:</b> {sport.history}</p>
          <p><b>Rules:</b> {sport.rules}</p>
          <p><b>Famous Players:</b> {sport.famousPlayers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
