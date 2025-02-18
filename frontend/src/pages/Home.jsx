import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Title from '../components/Title'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Banner></Banner>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      
    </div>
  )
}

export default Home