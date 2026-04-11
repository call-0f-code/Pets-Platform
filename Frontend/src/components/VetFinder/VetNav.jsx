import React from 'react'
import './VetNav.css'

const VetNav = () => {
  return (
    <nav>
        <div className="nav-heading">
            <h1>Vet-Finder</h1>
        </div>
        <ul className="nav-features">
          <li>Chatbots</li>
          <li>Community Feed</li>
          <li>Diet Planner</li>
          <li>Record Manager</li>
        </ul>
    </nav>
  )
}

export default VetNav
