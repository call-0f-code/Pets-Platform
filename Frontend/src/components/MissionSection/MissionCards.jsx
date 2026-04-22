import React from 'react'
import './MissionCards.css'

const MissionCards = ({ image, head, paragraph }) => {
  return (
    <div className='Mission-cards' >
        
        <div className='missioncard-img'>
          <img src={image} alt="" />
        </div>

        <div className='missioncard-para'>
          <h2>{head}</h2>
          <p>{paragraph}</p>
        </div>
    </div>
  )
}

export default MissionCards
