import { useState } from "react";
import "../styles/GroundingExercise.css";

function GroundingExercise() {
  const steps = [
    { number: 5, text: "Look around and name 5 things you can SEE 👀" },
    { number: 4, text: "Touch 4 things around you that you can FEEL ✋" },
    { number: 3, text: "Listen and identify 3 things you can HEAR 👂" },
    { number: 2, text: "Notice 2 things you can SMELL 👃" },
    { number: 1, text: "Acknowledge 1 thing you can TASTE 👅" },
  ];

  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
  };

  const resetExercise = () => setCurrent(0);

  return (
    <div className="grounding-container">
      <div className="grounding-guide">
        <h1>🌿 Grounding Exercise</h1>
        <p>
          When anxiety rises, return to the present moment using the{" "}
          <strong>5-4-3-2-1 technique</strong>. Follow each step to feel calm
          and centered.
        </p>
      </div>

      <div className="grounding-card">
        <h2>Step {steps[current].number}</h2>
        <p>{steps[current].text}</p>

        <div className="grounding-buttons">
          {current < steps.length - 1 ? (
            <button onClick={nextStep} className="grounding-btn">
              Next ➡️
            </button>
          ) : (
            <button onClick={resetExercise} className="grounding-btn">
              Restart 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroundingExercise;
