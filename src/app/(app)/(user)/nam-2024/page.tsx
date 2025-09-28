"use client"

import React from "react"
import Top10Lecturers from "../../../../components/Top10Lecturers"
import LenisProvider from "../../../../utils/lenis"
import Image from "next/image"

const page = () => {
  return (
    <div className='min-h-screen relative'>
      <Image
        src='/images/top-24.png'
        alt='Nam 2024'
        width={500}
        height={500}
        className='mx-auto'
      />

      <Top10Lecturers />
    </div>
  )
}

export default page
