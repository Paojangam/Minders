import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Newentry.css";
import Navbar from "../components/Navbar";
import api from "../api"; // Axios instance

const NewEntry = () => {
  const { id } = useParams(); // Get entry ID if available
  const isEditing = Boolean(id); // true if editing
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric"
  });

  // Fetch entry if editing
  useEffect(() => {
    const fetchEntry = async () => {
      if (!isEditing) return;
      try {
        const res = await api.get(`/api/diary/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Failed to load entry:", err);
        setMessage("❌ Failed to load entry");
      }
    };

    fetchEntry();
  }, [id, isEditing]);

  // Save or update entry
  const handleSave = async () => {
    try {
      setMessage(isEditing ? "Updating your journal..." : "Saving your journal...");

      if (isEditing) {
        await api.put(`/api/diary/${id}`, {
          title,
          content
        });
        setMessage("✅ Entry updated!");
      } else {
        await api.post('/api/diary', {
          title,
          content,
          mood: 'neutral' // Optional
        });
        setMessage("✅ Saved successfully!");
        setTitle('');
        setContent('');
      }
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
            <span className="entry-save" onClick={handleSave}>
              💾 {isEditing ? "Update" : "Save now"}
            </span>
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
