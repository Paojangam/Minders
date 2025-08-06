import React, { useState } from "react";
import "../styles/NewEntry.css";
import Navbar from "../components/Navbar";
import api from "../api"; // Axios instance

const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric"
  });

  const handleSave = async () => {
    try {
      setMessage("Saving your journal...");

      await api.post('/diary', {
        title,
        content,
        mood: 'neutral' // Optional: Add mood tracking later
      });

      setMessage("✅ Saved successfully!");
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Failed to save. Try again.");
    }
  };

  return (
    <div className="new-entry-page">
      <Navbar />

      <div className="entry-container">
        <div className="entry-card">
          <input
            type="text"
            className="entry-title"
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="entry-meta">
            <span className="entry-date">📅 {today}</span>
            <span className="entry-save" onClick={handleSave}>💾 Save now</span>
          </div>
          <textarea
            className="entry-text"
            placeholder="Your entry here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {message && <p className="entry-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
