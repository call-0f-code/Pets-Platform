import React from 'react'
import { Link } from "react-router-dom"
import './Footer.css'

const Footer = () => {
  return (
      <div className="footer">
        <div className="footer-logo">
            <h1>Petify</h1>
        </div>
        <ul className="footer-pages">
          <Link>
            <li>Community Feed</li>
          </Link>
          <Link to={'/dashboard'}>
            <li>Dashboard</li>
          </Link>
          <Link to={'/vet-finder'}>
            <li>Vet Finder</li>
          </Link>
          <Link>
            <li>Chatbots</li>
          </Link>
        </ul>
      </div>
  )
}

export default Footer