import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import Users from './pages/Users'
import Dashboard from './pages/Dashboard'
import AddCoupon from './pages/Coupon'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '৳'
const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer></ToastContainer>
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken}></Navbar>
          <hr className='text-gray-300' />
          <div className='flex w-full'>
            <Sidebar></Sidebar>

            <div className='w-[70%] mx-auto ml[max(5vw,25px)] my-8 text-gray-600 text-base'>

              <Routes>
                <Route path='/add' element={<Add token={token}></Add>} />
                <Route path='/list' element={<List token={token}></List>} />
                <Route path='/orders' element={<Orders token={token}></Orders>} />
                <Route path='/users' element={<Users token={token}></Users>} />
                <Route path='/dashboard' element={<Dashboard token={token}></Dashboard>} />
                <Route path='/coupon' element={<AddCoupon token={token}></AddCoupon>} />


              </Routes>
            </div>
          </div>

        </>
      }

    </div>
  )
}

export default App
