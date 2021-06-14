import React , {useState , useEffect} from 'react'
import { useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleUp , FaAngleDown , FaExternalLinkAlt } from "react-icons/fa";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import SwiperCore, { Pagination ,Navigation } from 'swiper/core';
import './gameDetails.css'
import Loading from '../LoadingScreen/Loading'

SwiperCore.use([Pagination ,Navigation]);


const GameDetails = () => {

 const [gameData , setGameData] = useState([])
 const [screenShots , setScreenShots] = useState([])
 const [isGameReady , setIsGameReady] = useState(false)
 const {id} =useParams()
 const [gameId ] = useState(id)
 const url = `https://api.rawg.io/api/games/${gameId}?key=2db624ca678b4810b40b0979d71a20f7`
 const screenShotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=2db624ca678b4810b40b0979d71a20f7`
 const trailersUrl = `https://api.rawg.io/api/games/${id}/movies?key=2db624ca678b4810b40b0979d71a20f7`
 const [gameDescription , setGameDescription] = useState(false)
 const [gameDetails , setGameDtails] = useState(true)
 const [gameRequeriments , setGameRequeriments] = useState(false)
 const [gameScreenshots , setGameScreenshots] = useState(true)
 const [trailers , setTrailers] = useState([])
 const [trailercont , setTrailerCon] = useState(false)

 const [istoTop , setIsTOTop] = useState(false)

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

 useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsTOTop(true);
      } else {
        setIsTOTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

 const fetchSingleGame = async ()=>{
  const response = await fetch(url)
  const tempGameData = await response.json()
  setGameData(tempGameData)
  setIsGameReady(true)
 }
 const fetchScreenShots = async ()=>{
  const response = await fetch(screenShotsUrl)
  const tempGameData = await response.json()
  setScreenShots(tempGameData)
  setIsGameReady(true)
 }
 const fetchTrailers = async ()=>{
  const response = await fetch(trailersUrl)
  const tempGameData = await response.json()
  setTrailers(tempGameData)
  setIsGameReady(true)
 }

 useEffect(()=>{
  fetchSingleGame()
  fetchScreenShots()
  fetchTrailers()
 },[])
//  console.log(gameData)
//  console.log(trailers.results)

 const {name , background_image , description ,platforms , metacritic , metacritic_url ,tags , released , genres} = gameData
 if(!isGameReady || tags === undefined || screenShots.results === undefined || platforms === undefined || trailers.results === undefined){
  return <Loading/>
 }
let gameRrquerimentsData = platforms.find((platReu)=> platReu.platform.name === 'PC' )
//  console.log(gameRrquerimentsData)

 return (
  <div className='container'>
    <div onClick={scrollToTop} className={`${istoTop ?'to-top-page to-top-page-active'  :  'to-top-page'}`}>
   <FaAngleUp/>
    </div>
   <div className="game-details-container">
    <div className="header-title">
     <h1>{name}</h1>
     <p className='game-rate'>{metacritic}</p>
    </div>
    <div  className="game-image-container container">
     <img src={background_image} alt={name} />
    </div>
    {/* ///////// Game Description ///////////// */}
    <div onClick={()=>setGameDescription(!gameDescription)} className="header-title header-title-details">
     <h2> Description</h2>
     {!gameDescription ? <FaAngleDown className='more-logo'/> : <FaAngleUp className='more-logo'/>}
    </div>
    <div className={`${!gameDescription? 'discription-container container':'active-details discription-container container'}`}>
    <div dangerouslySetInnerHTML={{ __html: description }} />
    <br />
    <hr />
    </div>
     {/* ///////// End Game Description ///////////// */}


    {/* ///////// Game Details ///////////// */}

    <div onClick={()=>setGameDtails(!gameDetails)} className="header-title header-title-details">
     <h2> Details</h2>
     {!gameDetails ? <FaAngleDown className='more-logo'/> : <FaAngleUp className='more-logo'/>}
    </div>
    <div className={`${!gameDetails? 'discription-container container':'active-details discription-container container'}`}>
     <p className='desc-mark'>Released : {released}</p>
      <hr></hr>
     <p className='desc-mark'>Review : {metacritic_url? <a className='game-review-link' href={metacritic_url} target={name} rel="noreferrer" >Metacritic<FaExternalLinkAlt className='external-link-icon'/></a>: '  no review'}</p>
      <hr></hr>
      <p ><span className='desc-mark'>Genres :</span> {
      genres.map((genre)=>{
       const {name ,id} = genre 
       return<span key={id} className='genre-tag'>{name}</span>
      })
      
      }</p>
        <hr></hr>
      <p ><span className='desc-mark'>Platforms :</span> {
      platforms.map((plat)=> {
       let platformName = plat.platform.name
       let platformId = plat.platform.id
       return<span key={platformId} className='genre-tag'>{platformName}</span>
      })
      
      }</p>
  
    <hr />
    </div>
    {/* ///////// End  Game details ///////////// */}

      {/* /////////   Game Requeriments ///////////// */}



  <div onClick={()=>setGameRequeriments(!gameRequeriments)} className="header-title header-title-details">
     <h2> Requeriments</h2>
     {!gameRequeriments ? <FaAngleDown className='more-logo'/> : <FaAngleUp className='more-logo'/>}
    </div>
    <div className={`${!gameRequeriments? 'discription-container container':'active-details discription-container container'}`}>
      {
        gameRrquerimentsData?
        <div className="reqirments">
            <div className="minimum">
             {
              gameRrquerimentsData.requirements.minimum? <p> <span>Minimum : </span> {gameRrquerimentsData.requirements.minimum}</p> : <p> <span>Minimum : </span>Not Available </p>
            }
            </div>
            <hr />
            {
              gameRrquerimentsData.requirements.recommended? <p> <span>Recommended : </span> {gameRrquerimentsData.requirements.recommended}</p> : <p> <span>Recommended :</span>  Not Available </p>
            }
          </div> :'Not Available To pc'
      }
    <hr />
    </div>



   {/* /////////  End Game Requeriments ///////////// */}


         {/* /////////   Game ScreenShots ///////////// */}



  <div onClick={()=>setGameScreenshots(!gameScreenshots)} className="header-title header-title-details">
     <h2> Screenshots</h2>
     {!gameScreenshots ? <FaAngleDown className='more-logo'/> : <FaAngleUp className='more-logo'/>}
    </div>
    <div className={`${!gameScreenshots? 'discription-container container':'active-details discription-container container'}`}>
    <div className="game-details">

     <div className="screen-shots">
      <Swiper pagination={{"type": "fraction" }} navigation={true} className="mySwiper">
      {
       screenShots.results.map((screen)=>{
        const {id , image} = screen
        return<SwiperSlide key={id}>
         <img src={image} alt="." />
        </SwiperSlide>
        
       })
      }
      </Swiper>
     </div>
      <div className="">
    
      </div>
    </div>
    <hr />
    </div>



   {/* /////////  End Game ScreenShots ///////////// */}


           {/* /////////   Game Trailers ///////////// */}



  <div onClick={()=>setTrailerCon(!trailercont)} className="header-title header-title-details">
     <h2> Trailers</h2>
     {!trailercont ? <FaAngleDown className='more-logo'/> : <FaAngleUp className='more-logo'/>}
    </div>
    <div className={`${!trailercont? 'discription-container container':'active-details discription-container container'}`}>
      {
        trailers.results.length === 0 ? <p><span>Trailers : </span> Not Available</p> : trailers.results.map((trailer)=>{
          const {id } = trailer
          let trailervid = trailer.data.max
          return <div key={id} className="gameTrailer">
            <ReactPlayer className='trailer-video' light={true}  controls={true} url={trailervid}/>
          </div>
        })
      }
    <hr />
    </div>



   {/* /////////  End Game Trailers ///////////// */}
   {/* <ReactPlayer controls={true} url='https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie480.mp4' /> */}
   </div>
  </div>
 )
}

export default GameDetails
