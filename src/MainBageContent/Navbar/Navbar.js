import React from 'react'
import './style.css'
import { FaAlignJustify  , FaGhost} from "react-icons/fa";
import {useGlopalContext} from '../../Context'
import { Link } from "react-router-dom";
const Navbar = () => {
 const {isSubmenuActive,setIsSubmenuActive } = useGlopalContext()
 return (
 <div className="nav-container">
   <div className="container  nav-items">
    <div className="logo-container">
      <Link className='route-link' to='/'><h1 className='logo'><span className='mark game-logo'>Gamer <FaGhost className=' game-logo'/> Station</span></h1></Link>
     
    </div>
    <div className="nav-menu">
     <nav>
      <ul className='active'>
       <li><Link to='/'>Home</Link></li>
       <li><Link to='/discover'>Discover</Link></li>
       <li><Link to='/favorit'>Favorits</Link></li>
       <li><Link to='/apout'>About</Link></li>
      </ul>
      <FaAlignJustify onClick={()=> setIsSubmenuActive(!isSubmenuActive) } className='menu-icon'/>
     </nav>
     
    </div>
   </div>
 </div>
 )
}

export default Navbar
