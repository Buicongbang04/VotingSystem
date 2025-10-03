"use client"

import React from "react"
import { Star } from "lucide-react"
import { MockLecture } from "../interfaces/Lecture/Lecture"
import Image from "next/image"

interface MockLecturerCardProps {
  lecturer: MockLecture
  className?: string
}

const MockLecturerCard = ({
  lecturer,
  className = "",
}: MockLecturerCardProps) => {
  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden ${className} border-gradient ${"cursor-pointer hover:scale-105 transition-transform duration-300"}`}
    >
      {/* Image Section - 60% height */}
      <div className='relative h-sm -z-2'>
        {lecturer.avatarUrl ? (
          <Image
            src={lecturer.avatarUrl}
            alt={lecturer.name}
            className='w-full h-full object-cover '
            width={300}
            height={300}
          />
        ) : (
          <div className='w-full h-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='text-gray-400 text-4xl font-bold'>
              {lecturer.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Content Section - 40% height with hot pink background */}
      <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-4 flex flex-col justify-between'>
        {/* Text Content */}
        <div className='text-white space-y-1'>
          <div className='flex items-center gap-2'>
            <h3 className='text-lg font-semibold truncate'>{lecturer.name}</h3>
            <Star className='w-4 h-4 text-yellow-300 fill-current' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockLecturerCard
