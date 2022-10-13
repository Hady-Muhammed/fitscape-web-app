import React from 'react'
import Exercises from '../components/Exercises'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="App main-color">
      <Hero />
      <Exercises/>
    </div>
  )
}

export default Home