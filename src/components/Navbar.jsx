import React from 'react'
import './styles/Navbar.css'

function Navbar() {
  return (
    <div className='navbar-container'>
      <div className="logo">
        <div className="mark">?</div>
        <h1 className="header">QuizMaster</h1>
      </div>
    
      <ul className="nav-ui">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar
