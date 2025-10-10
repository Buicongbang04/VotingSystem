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
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden ${className} border-gradient ${"cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation"}`}
    >
      {/* Image Section - 60% height */}
      <div className='relative h-sm -z-2'>
        {lecturer.avatarUrl ? (
          <Image
            src={lecturer.avatarUrl}
            alt={lecturer.name}
            className='w-full h-full object-cover'
            width={300}
            height={300}
            sizes='(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 180px, 200px'
            priority={false}
            loading='lazy'
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          />
        ) : (
          <div className='w-full h-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='text-gray-400 text-2xl sm:text-4xl font-bold'>
              {lecturer.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Content Section - 40% height with hot pink background */}
      <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-2 sm:p-4 flex flex-col justify-between min-h-[60px] sm:min-h-[80px]'>
        {/* Text Content */}
        <div className='text-white space-y-1'>
          <div className='flex items-center gap-1 sm:gap-2'>
            <h3 className='text-sm sm:text-base md:text-lg font-semibold truncate'>
              {lecturer.name}
            </h3>
            <Star className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 fill-current flex-shrink-0' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockLecturerCard
