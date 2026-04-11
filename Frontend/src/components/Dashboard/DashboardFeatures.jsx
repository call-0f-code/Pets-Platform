import React from 'react'
import "./DashboardNav.css";

const DashboardFeatures = ({ image, title, description}) => {
  return (
    <div className="dashboard-features">
            <div className="dashboard-feature-card-img">
                <img src={image} alt={title} />
            </div>

            <div className="dashboard-feature-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
    </div>
  )
}

export default DashboardFeatures
