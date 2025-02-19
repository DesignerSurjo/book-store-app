import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext);


  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})

  }

  return (
    <div className='sm:px-16 px-2 gap-3 flex items-center justify-between py-5 bg-white'>
      <Link to='/'><img src={assets.logo} className='sm:py-3 h-15 leading-relaxed' alt="" /></Link>
      <ul className='hidden sm:flex gap-5 '>
        <NavLink to='/' className='flex flex-col items-center gap-5'>
          <p className='text-xl text-[#444] hover:text-[#C31C37] hover:transition-all '>হোম</p>
          <hr className='w-2/4 border-none h-[2.5px] bg-[#C31C37] hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex items-center gap-2 flex-col'>

          <p className='text-xl text-[#444] hover:text-[#C31C37] transition-all duration-300 ease-in-out'>
            ক্যাটাগরিস
          </p>

        </NavLink>




      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />

        <div className='group relative'>

          <img onClick={() => token ? null : navigate('/login')} className='min-w-5 w-5 cursor-pointer' src={assets.profile_icon} alt="" />

          {token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className=' flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 items-center justify-center'>
                <p onClick={() => navigate('/order')} className='cursor-pointer hover:text-white hover:bg-[#C31C37] hover:w-full hover:transition-all hover:text-center'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-white hover:bg-[#C31C37] hover:w-full hover:transition-all hover:text-center'>Logout</p>
              </div>


            </div>

          }
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
          <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#C31C37] text-white rounded-full text-[8px] aspect-square'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className=' w-5 cursor-pointer sm:hidden' />

      </div>



      {/* small device menu bar */}

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all ${visible ? 'w-80' : 'w-0'}`}>
        <div className=' flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className=' flex items-center p-3 cursor-pointer gap-4 '>
            <img className=' h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className=' py-2 pl-6 border border-gray-100' to='/'>হোম</NavLink>
          <NavLink onClick={() => setVisible(false)} className=' py-2 pl-6 border border-gray-100' to='/collection'>ক্যাটাগরিস</NavLink>

        </div>

      </div>

    </div>




  )
}

export default Navbar