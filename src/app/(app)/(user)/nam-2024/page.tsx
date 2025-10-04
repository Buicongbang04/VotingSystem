"use client"

import React from "react"
import Top10Lecturers from "../../../../components/Top10Lecturers2024"
import Image from "next/image"

const page = () => {
  return (
    <div className='min-h-screen relative'>
      <Image
        src='/images/top-24.png'
        alt='Nam 2024'
        width={700}
        height={700}
        className='mx-auto'
      />

      <Top10Lecturers />
    </div>
  )
}

export default page
