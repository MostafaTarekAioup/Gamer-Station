import React ,{useState }from 'react'
import {useGlopalContext} from '../../Context'
import { FaSearch } from "react-icons/fa";
import './style.css'
import useAxios from '../../useAxios'
const Search = () => {
// const {serachValue , setSearchValue} = useGlopalContext()

const [query , setQuery] = useState('')
const [pageNumber , setPageNumber] = useState(1)

const {loading , error , games , hasMore} = useAxios(query , pageNumber)


 const handelSearch=(e)=>{
  setQuery(e.target.value)
  setPageNumber(1)
 }
 return (
  <div className='search-container'>
   <div className="form-container">
    <form>
     <div className="input-group" >
     <input type="text" required placeholder='Search for Game' onChange={handelSearch}/>
     <button className='btn search-btn'><FaSearch /></button>
    </div>
    </form>
   </div>
  </div>
 )
}

export default Search
