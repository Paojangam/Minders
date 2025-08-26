// EducationalContent.jsx
import React, { useState } from "react";
import "../styles/EducationalContent.css";

const TABS = [
  { id: "core", label: "Core Topics", icon: "🧠" },
  { id: "coping", label: "Coping Tools", icon: "🛠️" },
  { id: "social", label: "Social & Emotional", icon: "💬" },
  { id: "help", label: "When to Seek Help", icon: "🚦" },
  { id: "formats", label: "Formats", icon: "📚" },
];

const CONTENT = {
  core: [
    {
      title: "Understanding Mental Health",
      emoji: "🌱",
      points: [
        "What mental health is & why it matters",
        "Common myths vs facts",
        "How to talk about mental health without stigma",
      ],
    },
    {
      title: "Stress & Anxiety",
      emoji: "😌",
      points: [
        "What stress does to your body & mind",
        "Anxiety signs & triggers",
        "Everyday calming practices",
      ],
    },
    {
      title: "Depression",
      emoji: "🌧️",
      points: [
        "Symptoms & misconceptions",
        "Self-care vs professional care",
        "Support options & resources",
      ],
    },
    {
      title: "Sleep & Mental Health",
      emoji: "🛏️",
      points: [
        "Why sleep quality matters",
        "Sleep hygiene checklist",
        "Wind-down routines",
      ],
    },
    {
      title: "Self-esteem & Self-compassion",
      emoji: "💜",
      points: [
        "Inner critic vs inner coach",
        "Self-compassion exercises",
        "Building realistic goals",
      ],
    },
  ],
  coping: [
    {
      title: "Breathing Exercises",
      emoji: "🌬️",
      points: [
        "Box breathing (4x4x4x4)",
        "Physiological sigh (double inhale + long exhale)",
        "Paced breathing (inhale 4, exhale 6)",
      ],
    },
    {
      title: "Mindfulness & Meditation",
      emoji: "🧘",
      points: [
        "1-minute mindful check-in",
        "Body scan basics",
        "Noticing thoughts without judgment",
      ],
    },
    {
      title: "Journaling",
      emoji: "📓",
      points: [
        "How writing helps regulate emotions",
        "Prompts to start today",
        "Gratitude in 3 lines",
      ],
    },
    {
      title: "Grounding Techniques",
      emoji: "🪵",
      points: [
        "5-4-3-2-1 sensory method",
        "Name objects by color/shape",
        "Temperature reset (cool water splash)",
      ],
    },
    {
      title: "Healthy Routines",
      emoji: "⏰",
      points: [
        "Tiny habits that stick",
        "Movement snacks",
        "Nutritious, simple choices",
      ],
    },
  ],
  social: [
    {
      title: "Managing Relationships",
      emoji: "🤝",
      points: [
        "Healthy vs. toxic patterns",
        "Boundaries without guilt",
        "Repairing after conflict",
      ],
    },
    {
      title: "Communication Skills",
      emoji: "🗣️",
      points: [
        "I-statements (feel, need, ask)",
        "Active listening in 3 steps",
        "Saying no kindly",
      ],
    },
    {
      title: "Dealing with Loneliness",
      emoji: "🌙",
      points: [
        "Reframing solitude",
        "Micro-connections",
        "Community ideas",
      ],
    },
    {
      title: "Digital Well-being",
      emoji: "📱",
      points: [
        "Screen-time boundaries",
        "Curate feeds for calm",
        "Night mode & sleep",
      ],
    },
  ],
  help: [
    {
      title: "Recognizing Red Flags",
      emoji: "🚩",
      points: [
        "Persistent sadness or worry",
        "Loss of interest, sleep/appetite shifts",
        "Thoughts of self-harm: act now",
      ],
    },
    {
      title: "How Therapy Works",
      emoji: "🛋️",
      points: [
        "What to expect in the first session",
        "Types of therapy (CBT, ACT, etc.)",
        "How to prepare & set goals",
      ],
    },
    {
      title: "Crisis Resources",
      emoji: "📞",
      points: [
        "Use local emergency numbers",
        "Text/Call hotlines (add country-specific in app)",
        "Stay with a trusted person if unsafe",
      ],
    },
  ],
  formats: [
    {
      title: "Short Articles",
      emoji: "📰",
      points: ["2–3 min reads", "Plain language", "Actionable takeaways"],
    },
    {
      title: "Infographics",
      emoji: "🧩",
      points: ["Visual how-tos", "Checklists", "Do/Don't cards"],
    },
    {
      title: "Videos & Animations",
      emoji: "🎥",
      points: ["Explain concepts simply", "Subtitles & quiet audio", "1–3 min"],
    },
    {
      title: "Quizzes",
      emoji: "🧪",
      points: ["Myth vs fact", "Burnout signs", "Stress triggers"],
    },
    {
      title: "Daily Tips",
      emoji: "✨",
      points: ["Tiny prompts", "Gentle nudges", "Streaks & badges (optional)"],
    },
  ],
};

export default function EducationalContent() {
  const [active, setActive] = useState("core");
  const [query, setQuery] = useState("");

  const items = CONTENT[active].filter(
    (card) =>
      card.title.toLowerCase().includes(query.toLowerCase()) ||
      card.points.some((p) => p.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className="edu-root">
      <header className="edu-hero">
        <div className="edu-hero__badge">💜 Learn & Grow</div>
        <h1 className="edu-hero__title">Mental Health Library</h1>
        <p className="edu-hero__subtitle">
          Small, friendly lessons—built to calm, inform, and support you.
        </p>
        <div className="edu-actions">
          <div className="edu-search">
            <span aria-hidden>🔎</span>
            <input
              type="text"
              placeholder="Search topics, e.g., breathing, sleep, anxiety…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search educational content"
            />
            {query && (
              <button
                className="edu-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                title="Clear"
              >
                ✖
              </button>
            )}
          </div>

          <nav className="edu-tabs" aria-label="Content categories">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`edu-tab ${active === t.id ? "is-active" : ""}`}
                onClick={() => setActive(t.id)}
                aria-pressed={active === t.id}
              >
                <span className="edu-tab__icon" aria-hidden>
                  {t.icon}
                </span>
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="edu-grid" role="list">
        {items.map((card, idx) => (
          <article className="edu-card" key={idx} role="listitem">
            <div className="edu-card__head">
              <span className="edu-emoji" aria-hidden>
                {card.emoji}
              </span>
              <h3 className="edu-card__title">{card.title}</h3>
            </div>
            <ul className="edu-card__list">
              {card.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <button className="edu-cta" onClick={() => {}}>
              Learn more →
            </button>
          </article>
        ))}
        {items.length === 0 && (
          <div className="edu-empty">
            <div className="edu-empty__emoji" aria-hidden>
              🔍
            </div>
            <p>No results. Try a different keyword.</p>
          </div>
        )}
      </div>

      <footer className="edu-footer" aria-live="polite">
        <p>
          🚨 If you are in immediate danger or thinking about self-harm, contact
          local emergency services right away. You’re not alone.
        </p>
      </footer>
    </section>
  );
}
