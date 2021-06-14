import React from 'react'
import {useGlopalContext} from '../Context'
import SingleCard from './SingleCard'
import { FaSearch } from "react-icons/fa";

const AllGamesCards = () => {

const {games, query , handelSearch} = useGlopalContext()





  return <>
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
   <main className='main-Content'>
     <div className="App cards-container">
       {
        games.map((singleGame)=>{   
            return<SingleCard key={singleGame.id} {...singleGame}/>  
        })
      }
    </div>
   </main>
  </>;
}

export default AllGamesCards
