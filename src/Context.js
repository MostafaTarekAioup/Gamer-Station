import React ,{useEffect , useState , useContext , useRef , useCallback} from 'react'
import axios from 'axios'

const AppContext = React.createContext()
const AppProvider = ({children})=>{

  const getLocalStorageData = ()=>{
    let localData = localStorage.getItem('favorits')
    if(localData){
      return JSON.parse(localStorage.getItem('favorits'))
    }else{
      return []
    }
  }
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(false)
  const [games , setGames] = useState([])
  const [hasMore , setHasMore] = useState(false)
  const [query , setQuery] = useState('')
  const [pageNumber , setPageNumber] = useState(1)
  const [isSubmenuActive , setIsSubmenuActive] = useState(false)
  const [favorits , setFavorits] = useState(getLocalStorageData())
  // for detect last card of games

  const opsirver = useRef() 

  // for infinity scrool

const lastGame = useCallback( node => {
  // if (loading) return
  if(opsirver.current) opsirver.current.disconnect()
  opsirver.current = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && hasMore){
      setPageNumber(prevBage => prevBage + 1)
    }
  })
  if(node) opsirver.current.observe(node)
},[loading,hasMore])

// clear all cards befor search

  useEffect(()=>{
  setGames([])
  },[query])

  // games data

  useEffect(()=>{
  setError(false)
  let cancle
  axios({
   method:'GET',
   url:'https://api.rawg.io/api/games?key=2db624ca678b4810b40b0979d71a20f7',
   params:{page:pageNumber , search:query},
   cancelToken: new axios.CancelToken(c => cancle = c)
  }).then(res=>{
   setGames(prevgames=>{
    return [...prevgames , ...res.data.results]
   })
   setHasMore(res.data.results.length > 0)
   setLoading(false)
  }).catch(e=>{
   if(axios.isCancel(e)) return
   setError(true)
  })
  return ()=> cancle()
 },
 [query , pageNumber])

 // handle search 
const handelSearch=(e)=>{
  setQuery(e.target.value)
  setPageNumber(1)
 }

// handle favorits 
const handleFavorits = (background_image , id , name  , metacritic)=>{
  let findGame = favorits.find((gameId)=> gameId.id === id)
  if(findGame){
    const newFavorits = favorits.filter((newFav)=> newFav.id !== id)
    setFavorits(newFavorits)
  }else{
    let tampCard = {background_image : background_image , id : id , name : name  , metacritic : metacritic }
    setFavorits([...favorits , tampCard])
  }  
}

// save Favorits Data to Local Storage 
useEffect(()=>{
  localStorage.setItem('favorits',JSON.stringify(favorits))
  console.log(favorits)
},[favorits])






 return <AppContext.Provider value={{ isSubmenuActive , setIsSubmenuActive , games , query , handelSearch ,lastGame , loading , error , favorits , setFavorits , handleFavorits }}>
 {children}
 </AppContext.Provider>
}
export const useGlopalContext = ()=>{
 return useContext(AppContext);
}

export {AppContext,AppProvider}