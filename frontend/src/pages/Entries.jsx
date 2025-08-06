import React, { useEffect, useState } from 'react';
import '../styles/Entries.css';
import Navbar from '../components/Navbar';
import api from '../api'; // Axios instance

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get('/diary');
        setEntries(res.data);
      } catch (error) {
        console.error("Failed to fetch entries:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="entries-page">
      <Navbar />
      <div className="entries-container">
        <h2 className="entries-heading">My Journal Entries</h2>
        <div className="entries-list">
          {loading ? (
            <p>Loading entries...</p>
          ) : entries.length === 0 ? (
            <p className="no-entries">😕 No entries made so far</p>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry._id || index}
                className="entry-card"
                onClick={() => alert(`Viewing "${entry.title}"`)}
              >
                <div className="entry-title">{entry.title}</div>
                <div className="entry-preview">
                  {entry.content.length > 80
                    ? entry.content.slice(0, 80) + '...'
                    : entry.content}
                </div>
                <div className="entry-date">{formatDate(entry.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Entries;
