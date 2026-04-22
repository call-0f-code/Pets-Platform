import React from 'react'
import SectionHeader from './SectionHeader'
import FeatureCard from './FeatureCard'
import './FeatureCard.css'

const AboutSection = () => {
  return (
    <div className="AboutSection">
        <div className="AboutSection-header">
          <SectionHeader />
        </div>
        <img src="images/AboutSection/bone.png" alt="" className="bone" />
        <img src="images/AboutSection/paws.png" alt="" className="paws" />
        {/* <img src="images/AboutSection/wool.png" alt="" className="wool" /> */}
        <div className="AboutSection-features">
          <FeatureCard image={'images/AboutSection/community.png'} title={"Community Feed"} description={"Connect with fellow pet lovers, share photos, stories, and tips about your pets in a vibrant community."} />
          <FeatureCard image={'images/AboutSection/chatbot.png'} title={"Chatbots"} description={"Get instant answers to your pet-related questions, from health tips to daily care guidance."} />
          <FeatureCard image={'images/AboutSection/dietplanner.png'} title={"Diet Planner"} description={"Create personalized meal plans to keep your pet healthy, active, and well-nourished."} />
          <FeatureCard image={'images/AboutSection/recordmanager.png'} title={"Record Manager"} description={"Store and manage your pet’s medical records, vaccinations, and important documents in one place."} />
          <FeatureCard image={'images/AboutSection/remainder.png'} title={"Reminder"} description={"Never miss a feeding time, vet visit, or medication schedule with smart reminders."} />
          <FeatureCard image={'images/AboutSection/vetfinder.png'} title={"Vet Finder"} description={"Locate nearby veterinarians and clinics quickly for emergencies or regular checkups."} />
        </div>
    </div>
  )
}

export default AboutSection
