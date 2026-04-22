import React from 'react'
import "./DashboardNav.css";

const DashboardNav = () => {
  return (
    <div className="Dashboard-navbar">
      <div className="nav-left">
        <h2 className="nav-logo">Petify</h2>
        <span className="nav-link">Community Feed</span>
      </div>

      <div className="nav-right">
        <button className="profile-btn">
          <img src="images/Dashboard/profile-img.png" alt="profile" />
        </button>
        <button className="reminder-btn">
            Reminder
        </button>
      </div>
    </div>
  )
}

export default DashboardNav