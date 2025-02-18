import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa';  // FaCall এর বদলে FaPhoneAlt ব্যবহার করুন

const Header = () => {
  return (
    <div>
      <div className='sm:flex hidden gap-5 text-base md:h-13 justify-between bg-[#C31C37] text-white h-20 py-4 px-15 uppercase sm:text-sm'>
        <div className='flex gap-4'>
          <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.fb} alt="Facebook" />
          <Link to="">
            <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.insta} alt="Instagram" />
          </Link>
          <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.whatsapp} alt="WhatsApp" />
        </div>
        <p>Welcome To Our Beloved BD Books - Buy books online!</p>

        <p >  
          Product Request {' '}
          <span className="font-thin">
            <FaPhoneAlt className="inline-block sm:text-sm text-sm ml-5" />
            09639002255
          </span>
        </p>

      </div>
    </div>
  )
}

export default Header
