import React from 'react'
import {assets} from '../assets/assets.js'
import { FiPower } from 'react-icons/fi'; // React Icons
import { Link } from 'react-router-dom';
const Navbar = ({setToken}) => {
  return (
    <div className=' flex items-center justify-between py-2 px-[4%]'>
        <Link to='/'><img src={assets.logo} alt="" className='h-14 md:h-20'/></Link>
        {/* <h1 className=' text-black text-3xl sm:py-3 lg:text-4xl leading-relaxed uppercase poppins-semibold'>Stray <span className='text-[#3a141b] text-3xl sm:py-3 lg:text-4xl  prata-regular'>Fash.</span></h1> */}
        <button  onClick={()=>setToken('')} className=' text-red-600 cursor-pointer flex gap-2.5 text-xs sm:text-sm'><FiPower/>Logout</button>
        
    </div>
  )
}


// bg-[#18032A]
export default Navbar