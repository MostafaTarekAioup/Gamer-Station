import React from 'react'
import {useGlopalContext} from '../Context'
import SingleCard from './SingleCard'
const AllGamesCards = () => {
const {games} = useGlopalContext()
  return <>
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
