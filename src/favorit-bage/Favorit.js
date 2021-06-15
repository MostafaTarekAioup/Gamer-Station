import React from 'react'
import {useGlopalContext} from '../Context'
import SingleCard from '../MainBageContent/SingleCard'
const Favorit = () => {
   const { favorits } = useGlopalContext()
   
   const reverseFavorits = [...favorits].reverse()
 return <>
   <main className='main-Content'>
      <br /><br /><br />
     <div className="App cards-container">
       {
        reverseFavorits.map((singleGame)=>{   
            return<SingleCard key={singleGame.id} {...singleGame}/>  
        })
      }
    </div>
   </main>
  </>;
}

export default Favorit
