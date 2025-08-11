import React, { useEffect, useState } from 'react';
import '../styles/Entries.css';
import Navbar from '../components/Navbar';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'; // trash icon

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
  }, []);

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

  const handleViewEntry = (id) => {
    navigate(`/entry/${id}`);
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      await api.delete(`/diary/${id}`);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Failed to delete entry:', error.message);
    }
  };

  const renderMoodBadge = (mood) => {
    switch (mood) {
      case 'positive':
        return (
          <div className="mood-badge positive" title="Happy mood">
            😊 Happy
          </div>
        );
      case 'negative':
        return (
          <div className="mood-badge negative" title="Sad mood">
            ☹️ Sad
          </div>
        );
      default:
        return (
          <div className="mood-badge neutral" title="Neutral mood">
            😐 Content
          </div>
        );
    }
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
            entries.map((entry) => (
              <div key={entry._id} className="entry-card">
                <div className="entry-header">
                  <div
                    className="entry-title"
                    onClick={() => handleViewEntry(entry._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {entry.title}
                  </div>
                  <FiTrash2
                    className="delete-icon"
                    onClick={() => handleDeleteEntry(entry._id)}
                    title="Delete entry"
                  />
                </div>

                <div className="entry-mood">
                  {renderMoodBadge(entry.mood)}
                </div>

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
