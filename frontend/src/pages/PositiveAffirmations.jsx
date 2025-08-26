import { useState } from "react";
import { FaLeaf, FaHeart, FaSun } from "react-icons/fa";
import "../styles/PositiveAffirmations.css";

function PositiveAffirmations() {
  const affirmations = [
    "🌸 I am worthy of love and kindness.",
    "🌿 Every breath I take fills me with calm and peace.",
    "☀️ I choose to focus on what I can control.",
    "🌈 I am growing, learning, and becoming stronger every day.",
    "🦋 I release what no longer serves me and welcome new beginnings.",
    "💖 I radiate positivity and attract good energy."
  ];

  const [index, setIndex] = useState(0);

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div className="affirmations-container">
      <div className="affirmations-card">
        <div className="affirmations-icon">
          {index % 3 === 0 ? <FaLeaf /> : index % 3 === 1 ? <FaHeart /> : <FaSun />}
        </div>
        <h1 className="affirmations-title">Positive Affirmations</h1>
        <p className="affirmations-subtitle">
          Pause. Breathe. Let these words flow through you.
        </p>

        <div className="affirmation-text">{affirmations[index]}</div>

        <button className="affirmations-btn" onClick={nextAffirmation}>
          🌿 Next Affirmation
        </button>
      </div>
    </div>
  );
}

export default PositiveAffirmations;
