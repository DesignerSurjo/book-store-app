import React from 'react'
import {assets} from '../assets/assets.js'
const Navbar = ({setToken}) => {
  return (
    <div className=' flex items-center justify-between py-2 px-[4%]'>
        <img src={assets.logo} alt="" className='h-14 md:h-20'/>
        {/* <h1 className=' text-black text-3xl sm:py-3 lg:text-4xl leading-relaxed uppercase poppins-semibold'>Stray <span className='text-[#3a141b] text-3xl sm:py-3 lg:text-4xl  prata-regular'>Fash.</span></h1> */}
        <button onClick={()=>setToken('')} className='bg-[#18032A] text-white cursor-pointer px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
        
    </div>
  )
}

export default Navbar