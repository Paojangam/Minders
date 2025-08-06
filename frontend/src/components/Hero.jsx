import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>
          Write your own <br />
          <span>Private diary!</span>
        </h1>
        <div className="hero-buttons">
          <button className="outline-btn">Learn More</button>
          <button className="outline-btn">Download</button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
