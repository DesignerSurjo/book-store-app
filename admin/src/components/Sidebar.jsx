import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPlusCircle, FiList, FiShoppingBag, FiUser, FiBox } from 'react-icons/fi'; // React Icons
import {  FaBox } from 'react-icons/fa'; // React Icons

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2 border-gray-300 bg-[#18032A] text-white'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

                <NavLink
                    className='flex items-center gap-3  border-r-0 px-3 py-2 rounded-l  transition duration-300'
                    to='/dashboard'
                >
                    <FaBox className='w-5 h-5' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                {/* Add Items */}
                <NavLink
                    className='flex items-center gap-3  border-r-0 px-3 py-2 rounded-l  transition duration-300'
                    to='/add'
                >
                    <FiPlusCircle className='w-5 h-5' />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                {/* List Items */}
                <NavLink
                    className='flex items-center gap-3  border-r-0 px-3 py-2 rounded-l  transition duration-300'
                    to='/list'
                >
                    <FiList className='w-5 h-5' />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                {/* Orders */}
                <NavLink
                    className='flex items-center gap-3  border-r-0 px-3 py-2 rounded-l  transition duration-300'
                    to='/orders'
                >
                    <FiShoppingBag className='w-5 h-5' />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

                <NavLink
                    className='flex items-center gap-3  border-r-0 px-3 py-2 rounded-l  transition duration-300'
                    to='/users'
                >
                    <FiUser className='w-5 h-5' />
                    <p className='hidden md:block'>Users</p>
                </NavLink>

            </div>
        </div>
    );
};

export default Sidebar;
