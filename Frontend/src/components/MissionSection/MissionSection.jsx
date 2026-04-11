import React from 'react'
import MissionHead from './MissionHead'
import MissionCards from './MissionCards'
import './MissionCards.css'

const MissionSection = () => {
  return (
    <div className='Mission-section'>
        <div className='MissionSection-head'>
            <MissionHead />
        </div>
        <div className='MissionSection-cards'>
            <MissionCards image={'images/MissionSection/pet1.avif'} head={"Customize your pets diet to achieve a nutritious and delicious meal."} paragraph={"Understand what your pet really needs, from diet plans to feeding habits. Ensure they receive balanced nutrition tailored to their age, breed, and lifestyle for a healthier and happier life."} />
            <MissionCards image={'images/MissionSection/pet2.avif'} head={"Learn more about your pets health and find your nearest vets in the time of need."} paragraph={"Track health, learn symptoms, and stay one step ahead of problems. Monitor your pet’s well-being with ease and take timely action when it matters most."} />
            <MissionCards image={'images/MissionSection/pet3.avif'} head={"Interact with our bots to learn more on your pets behaviours and have meaningful insights."} paragraph={"Solve common behavior issues and build a stronger bond with your pet. Turn challenges into moments of trust, love, and better communication."} />
        </div>
    </div>
  )
}

export default MissionSection


