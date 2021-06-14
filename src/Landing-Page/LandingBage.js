import React from 'react'
import './style.css'
// import { GiBladeBite } from "react-icons/gi";
import { FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";
const LandingBage = () => {
 return (
  <div className='Landing-bage-container'>
   <div className="landing-header">
    <div className="container">
     <div className="header-content">
      <div className="header-details">
       <h1>Welcom to <span className='mark game-logo'>Gamer <FaGhost className=' game-logo'/> Station</span></h1>
       <p>Right place to find your Games from all Platforms</p>
       <p>Discover more than <span className='mark'>350000+ game</span> and there metacritic rate </p>
       <button className='btn discover-btn'><Link className='route-link' to='/discover'>Discover Games Now</Link></button>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default LandingBage
