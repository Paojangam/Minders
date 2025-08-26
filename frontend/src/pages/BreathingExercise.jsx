import { useEffect, useState, useRef } from "react";
import "../styles/BreathingExercise.css";

function BreathingExercise() {
  const [phase, setPhase] = useState("Ready?");
  const [circleSize, setCircleSize] = useState("small");
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startExercise = () => {
    if (running) return; // prevent multiple intervals
    setRunning(true);

    let phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    let index = 0;

    intervalRef.current = setInterval(() => {
      setPhase(phases[index]);
      setCircleSize(index === 0 ? "large" : index === 2 ? "small" : "medium");
      index = (index + 1) % phases.length;
    }, 4000);

    // start immediately with first phase
    setPhase(phases[0]);
    setCircleSize("large");
  };

  const resetExercise = () => {
    clearInterval(intervalRef.current);
    setPhase("Ready?");
    setCircleSize("small");
    setRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup
  }, []);

  return (
    <div className="breathing-container">
      <div className="breathing-main">
        <h1 className="breathing-title">Breathing Exercise</h1>
        <p className="breathing-subtitle">
          Find calmness. Follow the rhythm. Inhale serenity, exhale stress.
        </p>

        <div className={`breathing-circle ${circleSize}`}></div>
        <p className="breathing-phase">{phase}</p>

        <div className="breathing-controls">
          {!running ? (
            <button className="start-btn" onClick={startExercise}>
              Start
            </button>
          ) : (
            <button className="reset-btn" onClick={resetExercise}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="breathing-guide">
        <h2>Guide</h2>
        <ul>
          <li>🔵 <b>Breathe In</b> – Slowly inhale for 4 seconds.</li>
          <li>⏸ <b>Hold</b> – Hold your breath for 4 seconds.</li>
          <li>🔵 <b>Breathe Out</b> – Exhale gently for 4 seconds.</li>
          <li>⏸ <b>Hold</b> – Pause before the next cycle.</li>
        </ul>
        <p>
          Repeat this cycle for 5–10 minutes to calm your mind and reduce stress. 
          Stay relaxed, keep your posture straight, and let your breath flow naturally.
        </p>
      </div>
    </div>
  );
}

export default BreathingExercise;
