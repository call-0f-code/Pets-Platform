import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='Navbar'>
        <div className="Navbar-left">
            <h1 className="logo">Petify</h1>
        </div>
        <div className="Navbar-right">
            <button className='Nav-btn'>Login</button>
            <button className='Nav-btn'>Sign In</button>
        </div>
    </nav>
  )
}

export default Navbar
