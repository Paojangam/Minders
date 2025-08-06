import React, { useState } from 'react';
import '../styles/Myaccount.css';
import Navbar from '../components/Navbar';

const Myaccount = () => {
  const [form, setForm] = useState({
    firstName: 'Paojangam',
    lastName: 'Kipgen',
    email: 'kipgenpaojangam@gmail.com',
    timeZone: '(GMT+05:30) India Standard Time',
    journalOrder: 'Most Recently Updated',
    dateFormat: 'Tue. 8/5/2025',
    autoLogout: 'Do not auto-logout'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="account-page">
        <Navbar/>
      <div className="account-wrapper">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <p className="back-link">« All Journals</p>
          <h3>Account Settings</h3>
          <ul>
            <li><a href="#">Plans & Billing</a></li>
            <li><a href="#">Delete Account</a></li>
          </ul>
        </aside>

        {/* Main Form */}
        <div className="account-form">
          <h2>Account Info</h2>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <button className="password-btn">Change Password</button>

          <h2>Account Settings</h2>

          <div className="form-group">
            <label>Time Zone</label>
            <select name="timeZone" value={form.timeZone} onChange={handleChange}>
              <option>(GMT+05:30) India Standard Time</option>
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT+00:00) UTC</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Journal Order</label>
              <select name="journalOrder" value={form.journalOrder} onChange={handleChange}>
                <option>Most Recently Updated</option>
                <option>Alphabetical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Entry Date Format</label>
              <select name="dateFormat" value={form.dateFormat} onChange={handleChange}>
                <option>Tue. 8/5/2025</option>
                <option>08/05/2025</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Auto-logout</label>
            <select name="autoLogout" value={form.autoLogout} onChange={handleChange}>
              <option>Do not auto-logout</option>
              <option>After 15 minutes</option>
              <option>After 1 hour</option>
            </select>
          </div>

          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
