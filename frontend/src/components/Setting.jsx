import React, { useEffect, useRef } from 'react';
import '../styles/Setting.css';

const Setting = ({ onClose }) => {
  const modalRef = useRef();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="settings-modal" ref={modalRef}>
        <div className="modal-header">
          <h2>Paojangam's Journal</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button className="active-tab">Journal Theme</button>
          <button>Settings</button>
          <button>Export</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Journal Cover</label>
            <div className="color-box" style={{ backgroundColor: '#ff85d4' }}></div>
          </div>

          <div className="form-group font-group">
            <label>Font</label>
            <select>
              <option>Lora</option>
              <option>Roboto</option>
              <option>Open Sans</option>
            </select>
            <select>
              <option>17px</option>
              <option>18px</option>
              <option>19px</option>
            </select>
          </div>

          <div className="form-group">
            <label>Page Theme</label>
            <div className="theme-box" style={{ backgroundColor: '#f4d7af' }}></div>
          </div>

          <div className="form-group">
            <label>Pad Theme</label>
            <div className="theme-box" style={{ backgroundColor: '#f2f2f2' }}></div>
          </div>

          <div className="modal-footer">
            <span className="delete-link">🗑 Delete Journal</span>
            <button className="save-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
