import React from 'react'
import {useGlopalContext} from '../../Context'
import { FaSearch } from "react-icons/fa";
import './style.css'

const Search = () => {
const {query,handelSearch} = useGlopalContext()
 return (
  <div className='search-container'>
   <div className="form-container">
    <form>
     <div className="input-group" >
     <input type="text" required placeholder='Search for Game' value={query} onChange={handelSearch}/>
     <button className='btn search-btn'><FaSearch /></button>
    </div>
    </form>
   </div>
  </div>
 )
}

export default Search
