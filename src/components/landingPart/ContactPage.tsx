"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"

const ContactPage = () => {
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

    // target: 10/11 + 30 days (giữ nguyên logic của bạn)
    const targetDate = new Date()
    targetDate.setMonth(10) // November
    targetDate.setDate(10)
    targetDate.setHours(23, 59, 59, 999)
    targetDate.setDate(targetDate.getDate() + 30)

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

  const timeUnits = [
    { value: timeLeft.days, label: "NGÀY" },
    { value: timeLeft.hours, label: "GIỜ" },
    { value: timeLeft.minutes, label: "PHÚT" },
    { value: timeLeft.seconds, label: "GIÂY" },
  ]

  // Responsive circle size
  const [circleSize, setCircleSize] = useState(200)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setCircleSize(120)
      else if (width < 1024) setCircleSize(160)
      else setCircleSize(200)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section
      id='contact'
      className='
        min-h-dvh flex flex-col items-start snap-section relative
        px-4 sm:px-6 lg:px-8
      '
    >
      {/* Background decorative elements */}
      <div className='absolute top-10 left-10 w-32 h-32 border-2 border-pink-400/30 rounded-full opacity-20'></div>
      <div className='absolute top-20 right-20 w-24 h-24 border-2 border-cyan-400/30 opacity-20 transform rotate-45'></div>
      <div className='absolute bottom-20 left-20 w-28 h-28 border-2 border-pink-400/30 opacity-20 transform rotate-12'></div>
      <div className='absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-400/30 rounded-full opacity-20'></div>

      {/* Nội dung */}
      <div className='relative z-10 w-full min-w-0 mb-30'>
        {/* Main Title */}
        <div
          className='
                            flex justify-center md:justify-center items-start pt-[13vh] sm:pt-[15vh] md:pt-[13vh] lg:pt-[15vh] xl:pt-[10vh]
                            xl:mb-50 lg:mb-60 md:mb-10 sm:mb-20 mb-16
                          '
        >
          <Image
            src='/images/time_left.png'
            alt='logo'
            width={900}
            height={500}
            priority
            className='
                              h-auto
                              w-[90vw] max-w-[520px]
                              sm:w-[70vw] sm:max-w-[640px]
                              md:w-[80vw] md:max-w-[720px]
                              lg:w-[820px] lg:max-w-[820px]
                              xl:w-[877px] xl:max-w-[877px]
                            '
            sizes='
                              (min-width:1280px) 877px,
                              (min-width:1024px) 820px,
                              (min-width:768px) 80vw,
                              (min-width:640px) 70vw,
                              80vw
                            '
          />
        </div>

        {/* Countdown Timer */}
        <div className='flex flex-wrap justify-center items-start gap-6 w-full min-w-0'>
          {timeUnits.map((unit, idx) => (
            <Circle
              key={idx}
              value={unit.value}
              label={unit.label}
              size={circleSize}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export type HUDCircleProps = {
  size?: number
  value?: number | string
  label?: string
  className?: string
}

const Circle: React.FC<HUDCircleProps> = ({
  size = 200,
  value,
  label,
  className = "",
}) => {
  const cardW = size * 0.95
  const cardH = size * 1.15

  const display = String(value ?? 0).padStart(2, "0")

  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      style={{ width: cardW }}
    >
      {/* OUTER GRADIENT RIM */}
      <div
        className='relative p-[1.6px] rounded-t-[56px] rounded-b-[28px]
                   bg-[linear-gradient(80deg,#C81568_0%,#FEE9F3_100%)]
                   shadow-[0_4px_20px_rgba(255,118,199,0.40)]'
        style={{ width: cardW, height: cardH }}
      >
        {/* CARD SURFACE */}
        <div
          className='relative h-full w-full overflow-hidden rounded-t-[56px] rounded-b-[28px]'
          style={{
            // base background like Gradient 3
            background: "linear-gradient(180deg, #010101 30%, #65002F 100%)",
          }}
        >
          {/* Subtle top-left glossy bloom */}
          <div
            className='pointer-events-none absolute inset-0 mix-blend-screen'
            style={{
              background:
                "radial-gradient(240px 160px at 24% 12%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 40%, transparent 60%)",
            }}
          />

          {/* Pink sweep from left to right (Gradient 2) */}
          <div
            className='pointer-events-none absolute inset-0'
            style={{
              background:
                "linear-gradient(90deg, rgba(245,75,175,0) 0%, rgba(245,75,175,0.6) 55%, #F54BAF 100%)",
              opacity: 0.65,
            }}
          />

          {/* Inner bevel / depth */}
          <div className='pointer-events-none absolute inset-0 rounded-t-[56px] rounded-b-[28px] shadow-[inset_0_8px_18px_rgba(255,255,255,0.08),inset_0_-10px_24px_rgba(0,0,0,0.45)]' />

          {/* Value */}
          <div className='relative flex h-full w-full items-center justify-center'>
            <span
              className='text-white font-black leading-none tracking-[0.08em]'
              style={{ fontSize: size * 0.44 }}
            >
              {display}
            </span>
          </div>
        </div>

        {/* Glowing rim just inside the edge */}
        <div
          className='pointer-events-none absolute inset-0 rounded-t-[56px] rounded-b-[28px]'
          style={{
            boxShadow:
              "inset 0 0 0 0.5px rgba(255,255,255,0.15), inset 0 0 36px rgba(245,75,175,0.25)",
          }}
        />
      </div>

      {/* Label */}
      {label && (
        <span
          className='mt-3 font-bold uppercase text-white tracking-[0.28em] drop-shadow-[0_0_16px_rgba(245,75,175,0.6)]'
          style={{ fontSize: Math.max(12, size * 0.18) }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default ContactPage
