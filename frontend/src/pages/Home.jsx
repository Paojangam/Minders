import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import '../styles/Home.css';
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
          Minders is a mental health app designed to support your well-being and personal growth. 
          Reflect through private journal entries, share your thoughts anonymously in a safe chat,
           try guided mental wellness exercises, and explore educational content to better understand and care for your mind.
        </p>
        <img src="/assets/gpt.png" alt="MindVerse concept" className="about-image" />
      </section>
      <section id='features' className="info-section">
        <h2>Why Minders?</h2>
        <p>Minders is your safe space to journal, reflect, and grow. Stay consistent with helpful prompts and track your emotional journey privately.</p>
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
