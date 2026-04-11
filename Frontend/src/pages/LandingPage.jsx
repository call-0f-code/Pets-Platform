import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import AboutSection from '../components/About/AboutSection'
import MissionSection from '../components/MissionSection/MissionSection'
import Footer from '../components/Footer/Footer'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <Footer />
    </div>
  )
}

export default LandingPage