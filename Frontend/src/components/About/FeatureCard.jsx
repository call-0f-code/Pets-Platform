import React from 'react'
import './FeatureCard.css'

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="feature-card">

        <div className="card-img">
          <img src={image} alt={title} />
        </div>

        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

    </div>
  )
}

export default FeatureCard
