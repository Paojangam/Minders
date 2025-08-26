import React from "react";
import "../styles/MyJournal.css";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { FaPenFancy, FaBookOpen, FaChartLine } from "react-icons/fa";

const MyJournal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="myjournal-dashboard">
      <Navbar />

      <header className="journal-header">
        <h1>Hello, {user?.firstName || "Writer"}!</h1>
        <p>Welcome back to your creative space ✨</p>
      </header>

      <main className="journal-main">
        {/* Main Journal Card */}
        <div className="journal-card">
          <h2 className="journal-owner">
            {user?.firstName ? `${user.firstName}'s Journal` : "Your Journal"}
          </h2>
          <div className="journal-actions">
            <button onClick={() => navigate('/newentry')}>
              <FaPenFancy /> New Entry
            </button>
            <button onClick={() => navigate('/entries')}>
              <FaBookOpen /> View Entries
            </button>
            <button className="track-btn" onClick={() => navigate('/graph')}>
              <FaChartLine /> Track Progress
            </button>
          </div>
        </div>

        {/* Suggestions / Side Panel */}
        <div className="journal-suggestions">
          <h3>Ideas to get started</h3>
          <ul>
            <li>📝 Write about your day</li>
            <li>💭 Reflect on a thought</li>
            <li>🌈 Record a happy memory</li>
            <li>📚 Note a favorite quote</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MyJournal;
