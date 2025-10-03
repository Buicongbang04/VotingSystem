"use client"

import React from "react"

import Image from "next/image"
import Top10Lecturers from "@/src/components/Top10Lecturers2023"

const page = () => {
  return (
    <div className='min-h-screen relative'>
      <Image
        src='/images/top-23.png'
        alt='Nam 2023'
        width={500}
        height={500}
        className='mx-auto'
      />

      <Top10Lecturers />
    </div>
  )
}

export default page
