import React from 'react'
import "./DashBoardHero.css";

const DashBoardHero = () => {
  return (
    <div className="Dashboard-Hero">
      <div className="dashboard-content">
        <img src="https://images.unsplash.com/photo-1733131404035-9bc3b0e6a5ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9yaXpvbnRhbCUyMHBldHN8ZW58MHx8MHx8fDA%3D" alt="pet" />

        <div className="hero-text">
          <h2>Welcome to your Dashboard</h2>
          <p>Your pet waits for the best services</p>
        </div>

      </div>
    </div>
  )
}

export default DashBoardHero
