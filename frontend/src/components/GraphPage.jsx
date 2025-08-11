import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import api from '../api';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

import '../styles/GraphPage.css';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const GraphPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get('/diary');
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to fetch entries:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Count moods
  const moodCounts = entries.reduce(
    (acc, entry) => {
      const mood = (entry.mood || 'neutral').toLowerCase();
      if (mood === 'positive') acc.positive++;
      else if (mood === 'negative') acc.negative++;
      else acc.neutral++;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const total = moodCounts.positive + moodCounts.negative + moodCounts.neutral;

  // Overall mood decision
  let overallMood = 'neutral';
  if (total > 0) {
    if (
      moodCounts.positive > moodCounts.negative &&
      moodCounts.positive > moodCounts.neutral
    ) {
      overallMood = 'positive';
    } else if (
      moodCounts.negative > moodCounts.positive &&
      moodCounts.negative > moodCounts.neutral
    ) {
      overallMood = 'negative';
    }
  }

  const moodMessage = {
    positive: "You're doing great! Keep up the positive vibes! 🌟",
    negative: 'Stay strong! Every day is a new chance to improve. 💪',
    neutral: 'Keep steady and content. Balance is key! 🙂',
  };

  // Doughnut chart data
  const doughnutData = {
    labels: ['Happy', 'Content', 'Sad'],
    datasets: [
      {
        data: [moodCounts.positive, moodCounts.neutral, moodCounts.negative],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'], // green, yellow, red
        hoverBackgroundColor: ['#388e3c', '#fdd835', '#d32f2f'],
      },
    ],
  };

  // Line chart data (mood trend)
  const moodToNum = (m) => {
    if (m === 'positive') return 1;
    if (m === 'negative') return -1;
    return 0;
  };

  const lineData = {
    labels: entries.map((_, i) => `Entry ${i + 1}`),
    datasets: [
      {
        label: 'Mood Trend',
        data: entries.map((e) => moodToNum((e.mood || 'neutral').toLowerCase())),
        fill: false,
        borderColor: '#666',
        tension: 0.3,
        pointBackgroundColor: entries.map((e) => {
          const mood = (e.mood || 'neutral').toLowerCase();
          if (mood === 'positive') return '#4caf50';
          if (mood === 'negative') return '#f44336';
          return '#ffeb3b';
        }),
        pointRadius: 6,
        borderWidth: 3,
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (val) => {
            if (val === 1) return 'Happy';
            if (val === 0) return 'Content';
            if (val === -1) return 'Sad';
            return val;
          },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed.y;
            if (val === 1) return 'Happy';
            if (val === 0) return 'Content';
            if (val === -1) return 'Sad';
            return val;
          },
        },
      },
    },
  };

  if (loading)
    return (
      <div className="graph-page">
        <Navbar />
        <p className="loading-text">Loading data...</p>
      </div>
    );

  if (total === 0)
    return (
      <div className="graph-page">
        <Navbar />
        <p className="no-entries-text">No entries to display chart.</p>
      </div>
    );

  return (
    <div className="graph-page">
      <Navbar />

      <h2 className="graph-title">Mood Variation Chart & Trend</h2>

      <div className="charts-row">
        <div className="chart-container">
          <Doughnut data={doughnutData} />
          <div className="percentages">
            <p>Happy: {((moodCounts.positive / total) * 100).toFixed(1)}%</p>
            <p>Content: {((moodCounts.neutral / total) * 100).toFixed(1)}%</p>
            <p>Sad: {((moodCounts.negative / total) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="chart-container">
          <Line data={lineData} options={lineOptions} />
          <div className="trend-note">Trend showing mood per journal entry.</div>
        </div>
      </div>

      <div className="overall-message">{moodMessage[overallMood]}</div>
    </div>
  );
};

export default GraphPage;
