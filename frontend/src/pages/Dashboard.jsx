import React from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
     const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Navbar/>

      <header className="dashboard-header">
        <h1 className="myjournal">My Journal</h1>
        <button className="new-journal-btn">+ New Journal</button>
      </header>

      <div className="dashboard-main">
        <div className="journal-section">
          <div className="journal-card">
            <h2 className="owner">Paojangam's Journal</h2>
            <div className="card-actions">
              <button onClick={() => navigate('/newentry')}>🖊️ New Entry</button>         
              <button onClick={()=>navigate('/entries')}>📄</button>
              <button>⚙️</button>
              <button>🔒</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
