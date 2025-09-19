import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'
import Loading from '../assets/Loading4.webm' // ✅ Import your loading animation

const Home = () => {
  const [loading, setLoading] = useState(true) // ✅ Step 1: loading state

  // ✅ Step 2: Simulate Carousel image loading delay
  // You can replace this with a callback from Carousel if you want
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // ⏳ wait 1.5s before showing Carousel (you can adjust)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='overflow-x-hidden'>
      {loading ? (
        // ✅ Step 3: Show loading animation while waiting
        <div className='flex items-center justify-center min-h-[300px]'>
          <video muted autoPlay loop className="w-28 h-28">
            <source src={Loading} type='video/webm' />
          </video>
        </div>
      ) : (
        // ✅ Only show Carousel after loading finishes
        <>
          <Carousel />
          <MidBanner />
          <Features />
        </>
      )}
    </div>
  )
}

export default Home
