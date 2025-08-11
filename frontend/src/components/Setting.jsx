import React from 'react';
import '../styles/Setting.css'; // Update this CSS too!

const Setting = () => {
  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Your Journal Settings</h1>
      </header>

      <div className="settings-tabs">
        <button className="active-tab">Journal Theme</button>
        <button>Settings</button>
        <button>Export</button>
      </div>

      <main className="settings-body">
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

        <div className="settings-footer">
          <span className="delete-link">🗑 Delete Journal</span>
          <button className="save-btn">Save Changes</button>
        </div>
      </main>
    </div>
  );
};

export default Setting;
