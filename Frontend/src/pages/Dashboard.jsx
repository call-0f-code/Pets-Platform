import React from 'react'
import { Link, Links } from 'react-router-dom'
import DashboardNav from '../components/Dashboard/DashboardNav';
import DashBoardHero from '../components/Dashboard/DashBoardHero';
import DashboardFeatures from '../components/Dashboard/DashboardFeatures';
import '../components/Dashboard/DashboardNav.css'
import DashboardFeatureHead from '../components/Dashboard/DashboardFeatureHead';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className='dashboard-nav-section'>
        <DashboardNav />
      </div>
      <div className='dashboard-hero-section'>
        <DashBoardHero />
      </div>
      <div className="dashboard-feature-head">
        <DashboardFeatureHead />
      </div>
      <div className='dashboard-feature-section'>
        <Link className="dashboard-link" to="">
          <DashboardFeatures image={'images/AboutSection/community.png'} title={"Community Feed"} description={"Connect with fellow pet lovers, share photos, stories, and tips about your pets in a vibrant community."} />
        </Link>
        <Link className="dashboard-link" to="">
          <DashboardFeatures image={'images/AboutSection/chatbot.png'} title={"Chatbots"} description={"Get instant answers to your pet-related questions, from health tips to daily care guidance."} />
        </Link>
        <Link className="dashboard-link" to="">
          <DashboardFeatures image={'images/AboutSection/dietplanner.png'} title={"Diet Planner"} description={"Create personalized meal plans to keep your pet healthy, active, and well-nourished."} />
        </Link>
        <Link className="dashboard-link" to="">
          <DashboardFeatures image={'images/AboutSection/recordmanager.png'} title={"Record Manager"} description={"Store and manage your pet’s medical records, vaccinations, and important documents in one place."} />
        </Link>
        <Link className="dashboard-link" to="">
          <DashboardFeatures image={'images/AboutSection/remainder.png'} title={"Remainder"} description={"Never miss a feeding time, vet visit, or medication schedule with smart reminders."} />
        </Link>
        <Link className="dashboard-link" to="/vet-finder">
          <DashboardFeatures image={'images/AboutSection/vetfinder.png'} title={"Vet Finder"} description={"Locate nearby veterinarians and clinics quickly for emergencies or regular checkups."} />
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
