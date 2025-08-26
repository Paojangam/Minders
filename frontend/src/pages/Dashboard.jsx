import React from 'react';
import '../styles/Dashboard.css';
import { FaRegSmile, FaRegComments, FaBrain, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="quote-card">
          <p>“Your daily inspiration goes here”</p>
          <div className="quote-author">
            <img src="https://i.pravatar.cc/40" alt="author" />
            <div>
              <h4>Title</h4>
              <p>Description</p>
            </div>
          </div>
        </div>
        <div className="ai-chatbot">
          <FaRegComments size={30} />
          <span>AI Chatbot</span>
        </div>
      </header>

      <main className="dashboard-cards">
        <div
          className="card"
          onClick={() => navigate('/myjournal')}
          style={{ cursor: 'pointer' }}
        >
          <FaRegSmile className="card-icon" size={30} />
          <h2>My Journal</h2>
          <p>Write your thoughts, quotes, anecdotes, or short stories.</p>
          <button onClick={(e) => { e.stopPropagation(); navigate('/myjournal'); }}>Go</button>
        </div>

        <div
          className="card"
          onClick={() => navigate('/anonymous-chat')}
          style={{ cursor: 'pointer' }}
        >
          <FaRegComments className="card-icon" size={30} />
          <h2>Anonymous Chat</h2>
          <p>Talk to someone anonymously and share your thoughts safely.</p>
          <button onClick={(e) => { e.stopPropagation(); navigate('/anonymous-chat'); }}>Start Chat</button>
        </div>

        <div
          className="card"
          onClick={() => navigate('/mental-exercise')}
          style={{ cursor: 'pointer' }}
        >
          <FaBrain className="card-icon" size={30} />
          <h2>Mental Exercise</h2>
          <p>Try exercises to improve your mental health and wellbeing.</p>
          <button onClick={(e) => { e.stopPropagation(); navigate('/mental-exercise'); }}>Try</button>
        </div>

        <div
          className="card"
          onClick={() => navigate('/educational-content')}
          style={{ cursor: 'pointer' }}
        >
          <FaBook className="card-icon" size={30} />
          <h2>Educational Content</h2>
          <p>Read articles, tips, and educational content on mental health.</p>
          <button onClick={(e) => { e.stopPropagation(); navigate('/educational-content'); }}>Read</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
