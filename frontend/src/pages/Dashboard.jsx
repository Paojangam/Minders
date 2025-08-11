import React from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
     const navigate = useNavigate();
     const { user } = useAuth();

  return (
    <div className="dashboard">
      <Navbar/>

      <header className="dashboard-header">
        <h1 className="myjournal">My Journal</h1>

      </header>

      <div className="dashboard-main">
        <div className="journal-section">
          <div className="journal-card">
            <h2 className="owner">
              {user?.firstName ? `${user.firstName}'s Journal` : "Your Journal"}
            </h2>
            <div className="card-actions">
              <button onClick={() => navigate('/newentry')}>🖊️ New Entry</button>         
              <button onClick={()=>navigate('/entries')}>📄 Entries </button>
                      <button  className="new-journal-btn" onClick={()=>navigate('/graph')}> 📈 Track Your Progress</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
