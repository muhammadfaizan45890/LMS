import Hero from '@/components/Hero'
import React from 'react'
import Middle from './Middle'
import PlatformStats from './PlatformStats'
// import ExploreCourses from './ExploreCourses'

const Home = () => {
  return (
    <div>
      <Hero/>
      <PlatformStats/>
      {/* <ExploreCourses/> */}
      <Middle/>
    </div>
  )
}

export default Home
