import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Search = () => {
    const {search,setSearch,showSearch,setShowSearch} =useContext(ShopContext)
    const [visible, setVisible] = useState(false);
    const location = useLocation();
   useEffect(()=>{
    if(location.pathname.includes('collection')){
        setVisible(true);


    }else{
        setVisible(false);
    }
   },[location])

   
  return showSearch && visible ? (
    <div className='bg-gray-50 text-center py-4'>
    <div className='flex items-center px-4 py-2 my-5 mx-auto rounded-full max-w-lg bg-gray-50'>
        <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='flex-1 outline-none border-gray-300 rounded-full py-2 bg-transparent text-base text-gray-700 px-2 placeholder-gray-500' 
            type="text" 
            placeholder='Search Here....' 
        />
        <img 
            src={assets.search_icon} 
            alt="Search" 
            className='w-5 cursor-pointer opacity-70 mr-1 ' 
        />
        <img 
            onClick={() => setShowSearch(false)} 
            src={assets.cross_icon} 
            alt="Close" 
            className='w-5 cursor-pointer opacity-70' 
        />
    </div>
</div>


    
  ): null
}

export default Search