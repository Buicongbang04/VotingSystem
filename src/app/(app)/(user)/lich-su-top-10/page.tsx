"use client"

import EventComponent from "@/src/components/EventComponent"
import React, { useState, useEffect } from "react"

const page = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const today = new Date()

    const october10th = new Date()
    october10th.setMonth(9) // October (0-based)
    october10th.setDate(10)
    october10th.setHours(23, 59, 59, 999)

    const isAfterOctober10th = today > october10th

    if (!isAfterOctober10th) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return
    }

    // target: 31/10
    const targetDate = new Date()
    targetDate.setMonth(9) // October (0-based)
    targetDate.setDate(31)
    targetDate.setHours(23, 59, 59, 999)

    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatCountdown = () => {
    const days = timeLeft.days.toString().padStart(2, "0")
    const hours = timeLeft.hours.toString().padStart(2, "0")
    const minutes = timeLeft.minutes.toString().padStart(2, "0")
    const seconds = timeLeft.seconds.toString().padStart(2, "0")

    return `${days}D ${hours}H ${minutes}M ${seconds}S`
  }

  return (
    <>
      <div className='flex p-10 gap-6'>
        <EventComponent to='/nam-2023'>
          <h1 className='text-white text-4xl font-bold'>TOP 10</h1>
          <div className='text-white text-2xl '>Giảng viên</div>
          <div className='text-white text-2xl '>Truyền cảm hứng 2023</div>
        </EventComponent>
        <EventComponent to='/nam-2024'>
          <h1 className='text-white text-4xl font-bold'>TOP 10</h1>
          <div className='text-white text-2xl '>Giảng viên</div>
          <div className='text-white text-2xl '>Truyền cảm hứng 2024</div>
        </EventComponent>
      </div>
      <div className='px-10'>
        <EventComponent to='/all-show'>
          <h1 className='text-white text-4xl font-bold'>Top 10 Giảng viên</h1>
          <div className='text-white text-4xl font-bold'>
            truyền cảm hứng 2025
          </div>
          <div className='pt-10 text-white text-xl'>Đang đếm ngược</div>
          <div className='text-white text-4xl font-mono font-bold tracking-wider'>
            {formatCountdown()}
          </div>
        </EventComponent>
      </div>
    </>
  )
}

export default page
