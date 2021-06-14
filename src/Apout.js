import React from 'react'
import { FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";
const Apout = () => {
 return (
  <div className='Landing-bage-container'>
   <div className="landing-header">
    <div className="container">
     <div className="header-content">
      <div className="header-details">
       <h1>Welcom to <span className='mark game-logo'>Gamer <FaGhost className=' game-logo'/> Station</span></h1>
       <p className='mark'> Comming Soon </p>
       <button className='btn discover-btn'><Link className='route-link' to='/'>Return Home</Link></button>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Apout
