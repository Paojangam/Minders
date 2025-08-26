import { FaWind, FaHeart, FaMusic, FaPenFancy, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/MentalHealth.css";

function MentalHealth() {
  const navigate = useNavigate();

  const exercises = [
    {
      title: "Breathing Exercise",
      description: "Follow a guided breathing routine to calm your mind.",
      icon: <FaWind />,
      link: "/breathing",
    },
    {
      title: "Positive Affirmations",
      description: "Read uplifting affirmations to boost your mood.",
      icon: <FaHeart />,
      link: "/affirmations",
    },
    {
      title: "Mindfulness Sounds",
      description: "Listen to soothing sounds like rain or ocean waves.",
      icon: <FaMusic />,
      link: "/mindful-music",
    },
    {
      title: "Mini Journal",
      description: "Write quick reflections or gratitude notes.",
      icon: <FaPenFancy />,
      link: "/myjournal",
    },
    {
      title: "Grounding Exercise",
      description: "Practice the 5-4-3-2-1 method to feel present.",
      icon: <FaLeaf />,
      link: "/grounding",
    },
  ];

  return (
    <div className="mental-container">
      <h1 className="mental-title">Mental Health Exercises</h1>
      <p className="mental-subtitle">Choose an exercise to relax, reflect, and recharge.</p>

      <div className="mental-grid">
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="mental-card"
            onClick={() => navigate(ex.link)} // whole card is clickable
          >
            <div className="mental-icon">{ex.icon}</div>
            <h2>{ex.title}</h2>
            <p>{ex.description}</p>
            <button
              className="mental-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevents bubbling when clicking button
                navigate(ex.link);
              }}
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentalHealth;
