"use client"

import React from "react"
import Top10Lecturers from "../../../../components/Top10Lecturers2024"
import Image from "next/image"

const page = () => {
  return (
    <div className='min-h-screen relative px-2 sm:px-4'>
      <div className='pt-4 sm:pt-8'>
        <Image
          src='/images/top-24.png'
          alt='Nam 2024'
          width={700}
          height={700}
          className='mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'
          priority
          sizes='(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px'
        />
      </div>

      <Top10Lecturers />
    </div>
  )
}

export default page
