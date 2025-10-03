import React from "react"
import { Heart, Share2 } from "lucide-react"
import { Lecture } from "../interfaces/Lecture/Lecture"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface LecturerCardProps {
  lecturer: Lecture
  onVote?: (lecturerId: string) => void
  onShare?: (lecturerId: string) => void
  isVoted?: boolean
  voteCount?: number
  isLoading?: boolean
  showLink?: boolean
  className?: string
}

const LecturerCard = ({
  lecturer,
  onVote,
  onShare,
  isVoted = false,
  voteCount = 0,
  isLoading = false,
  showLink = true,
  className = "",
}: LecturerCardProps) => {
  const handleVote = () => {
    if (onVote) {
      onVote(lecturer.id)
    }
  }

  const handleShare = () => {
    if (onShare) {
      onShare(lecturer.id)
    }
  }

  const CardContent = () => (
    <div
      className={`relative w-full rounded-3xl overflow-hidden ${className} border-gradient ${
        showLink
          ? "cursor-pointer hover:scale-105 transition-transform duration-300"
          : ""
      }`}
    >
      {/* Image Section - 60% height */}
      <div className='relative h-sm '>
        {lecturer.avatarUrl ? (
          <Link href={`/all-show/lecturers/${lecturer.id}`}>
            <Image
              src={lecturer.avatarUrl}
              alt={lecturer.name}
              className='w-full h-full object-cover'
              width={50}
              height={50}
            />
          </Link>
        ) : (
          <div className='w-full h-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='text-gray-400 text-4xl font-bold'>
              {lecturer.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Content Section - 40% height with hot pink background */}
      <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-4 h-40 flex flex-col justify-between'>
        {/* Text Content */}
        <div className='text-white space-y-1'>
          <h3 className='text-lg font-semibold truncate'>{lecturer.name}</h3>
          <p className='text-sm opacity-90 truncate'>{lecturer.department}</p>
          <p className='text-xs opacity-75 truncate italic'>
            "{lecturer.quote}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-between mt-2'>
          {/* Like Button */}
          <Button
            variant='default'
            size='lg'
            onClick={handleVote}
            disabled={isLoading}
            className={` bg-transparent border-gradient text-white hover:bg-white/20  rounded-2xl ${
              isVoted ? "bg-white/20" : ""
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart
              className={`w-5 h-5 mr-2 font-bold ${
                isVoted ? "fill-current" : ""
              } ${isLoading ? "animate-pulse" : ""}`}
            />
            <span className='text-sm font-medium'>
              {isLoading ? "..." : voteCount.toString().padStart(3, "0")}
            </span>
          </Button>

          {/* Share Button */}
          <Button
            variant='link'
            size='lg'
            onClick={handleShare}
            className='bg-white/10 text-white hover:bg-white/20 border-gradient rounded-2xl'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='30'
              viewBox='0 -960 960 960'
              width='30'
              fill='#e3e3e3'
            >
              <path d='M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z' />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )

  return <CardContent />
}

export default LecturerCard
