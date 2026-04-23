import React from 'react'
import "./DashboardNav.css";
import { useNavigate } from "react-router-dom"
import profileImg from '../../assets/images/Dashboard/profile-img.png'

const DashboardNav = () => {
  const navigate = useNavigate();
  return (
    <div className="Dashboard-navbar">
      <div className="nav-left">
        <h2 className="nav-logo">Petify</h2>
        <button onClick={() => navigate("/community-feed")} className="nav-link">Community Feed</button>
      </div>

      <div className="nav-right">
        <button className="profile-btn">
          <img src={profileImg} alt="profile" />
        </button>
        <button className="reminder-btn">
            Reminder
        </button>
      </div>
    </div>
  )
}

export default DashboardNav