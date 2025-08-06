import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import '../styles/Home.css';
import gpt from '../assets/gpt.png';
import { FaLock, FaBrain, FaFeatherAlt, FaSmile } from 'react-icons/fa'; 

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />

      {/* Scrollable content below hero */}
      <section id="about" className="about-section">
        <h2>About</h2>
        <p>
          MindVerse is a private diary app designed for deep reflection, emotional clarity, and personal growth. 
          We combine simplicity and privacy with AI-powered prompts to help you unlock your thoughts and patterns.
        </p>
        <img src={gpt} alt="MindVerse concept" className="about-image" />
      </section>
      <section id='features' className="info-section">
        <h2>Why MindVerse?</h2>
        <p>MindVerse is your safe space to journal, reflect, and grow. Stay consistent with helpful prompts and track your emotional journey privately.</p>
  <div className="features-grid">
    <div className="feature-item">
      <FaLock className="feature-icon" />
      <h3>Privacy First</h3>
      <p>Your thoughts stay with you — always encrypted and safe.</p>
    </div>
    <div className="feature-item">
      <FaBrain className="feature-icon" />
      <h3>AI-Powered Insights</h3>
      <p>Get reflective prompts and emotional clarity powered by AI.</p>
    </div>
    <div className="feature-item">
      <FaFeatherAlt className="feature-icon" />
      <h3>Simple Writing</h3>
      <p>A clean, peaceful space for daily journaling without distractions.</p>
    </div>
    <div className="feature-item">
      <FaSmile className="feature-icon" />
      <h3>Emotional Wellness</h3>
      <p>Track your emotional journey and watch your growth unfold.</p>
    </div>
  </div>
      </section>
    </div>
  );
};

export default Home;
