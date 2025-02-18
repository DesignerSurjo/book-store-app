import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Collection from './pages/Collection';
import Fotter from './components/Fotter';
import Search from './components/Search';
import { Product } from './pages/Product';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Login from './pages/Login';
import Verify from './pages/Verify';

function App() {

  return (
    <div >
      <ToastContainer></ToastContainer>
      <Header></Header>
      <Navbar></Navbar>
      <Search></Search>

      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/product/:productId' element={<Product></Product>} />
          <Route path='/cart' element={<Cart></Cart>}/>
          <Route path='/place-order' element={<PlaceOrder></PlaceOrder>}/>
          <Route path='/order' element={<Order></Order>}/> 
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/verify' element={<Verify></Verify>}/>
          
        </Routes>
      </div>
      <Fotter></Fotter>
    </div>
  )
}

export default App
