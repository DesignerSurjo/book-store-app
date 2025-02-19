import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="sm:px-16 px-4 flex items-center justify-between py-4 bg-white shadow-md">
      <Link to="/">
        <img src={assets.logo} className="h-12 md:h-20" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6">
        <NavLink to="/" className="text-lg text-gray-700 hover:text-[#C31C37] transition">
          হোম
        </NavLink>
        <NavLink to="/collection" className="text-lg text-gray-700 hover:text-[#C31C37] transition">
          ক্যাটাগরিস
        </NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => !isMobile && setDropdownOpen(true)}
          onMouseLeave={() => !isMobile && setDropdownOpen(false)}
        >
          <img
            onClick={() => isMobile && (token ? setDropdownOpen(!dropdownOpen) : navigate('/login'))}
            className="w-6 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />

          {token && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
              <p
                onClick={() => {
                  navigate('/order');
                  setDropdownOpen(false);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-[#C31C37] hover:text-white transition-all text-gray-700 text-center"
              >
                Orders
              </p>
              <p
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-[#C31C37] hover:text-white transition-all text-gray-700 text-center"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-6" />
          <p className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center bg-[#C31C37] text-white rounded-full text-xs">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ${
          visible ? 'w-64' : 'w-0 overflow-hidden'
        } z-50`}
      >
        <div className="flex flex-col text-gray-700">
          <div onClick={() => setVisible(false)} className="flex items-center p-4 cursor-pointer">
            <img className="h-5 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p className="ml-2">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b border-gray-200"
            to="/"
          >
            হোম
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b border-gray-200"
            to="/collection"
          >
            ক্যাটাগরিস
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

