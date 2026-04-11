import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="Hero">

        <div className="left">
            <h1>Can you resist the adorable faces?</h1>
            <p>Connect with fellow pet parents, share moments, and manage your pet's care, all in one place</p>
            <button className='hero-btn'>Get Started</button>
        </div>

        <div className="right">
            <img className="right-img" src="https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGV0fGVufDB8fDB8fHww" alt="Loading..." />
        </div>

    </section>
  )
}

export default HeroSection
