"use client"

import React, { useState, useEffect } from "react"
import { useGetAllLectures } from "@/src/services/LectureServices"
import {
  useVoteForLecture,
  useCancelTodaysVote,
} from "@/src/services/LectureVoteServices"
import { useIsAuthenticated } from "@/src/stores/tokenStore"
import { toast } from "sonner"
import { Button } from "@/src/components/ui/button"
import { Heart, Share2, ArrowLeft, User, Building, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"

interface PageProps {
  params: {
    id: string
  }
}

const page = ({ params }: PageProps) => {
  const { data: lectures, isLoading, refetch } = useGetAllLectures()
  const [votedLecturers, setVotedLecturers] = useState<Set<string>>(new Set())
  const isAuthenticated = useIsAuthenticated()
  const { mutate: voteForLecture, isPending: isVoting } = useVoteForLecture()
  const { mutate: cancelVote, isPending: isCancelling } = useCancelTodaysVote()

  // Find the specific lecturer by ID
  const lecturer = lectures?.data?.find((l) => l.id === params.id)

  // Load user's existing votes when component mounts
  useEffect(() => {
    if (isAuthenticated && lectures?.data) {
      setVotedLecturers(new Set())
    }
  }, [isAuthenticated, lectures?.data])

  const handleVote = (lecturerId: string) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để bình chọn")
      return
    }

    const isVoted = votedLecturers.has(lecturerId)

    if (isVoted) {
      // Cancel vote
      cancelVote(lecturerId, {
        onSuccess: () => {
          setVotedLecturers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(lecturerId)
            return newSet
          })
          refetch()
          toast.success("Đã hủy bình chọn thành công")
        },
        onError: (error: any) => {
          console.error("Error cancelling vote:", error)
          toast.error("Có lỗi xảy ra khi hủy bình chọn")
        },
      })
    } else {
      // Vote for lecturer
      voteForLecture(
        { lectureId: lecturerId },
        {
          onSuccess: () => {
            setVotedLecturers((prev) => new Set(prev).add(lecturerId))
            refetch()
            toast.success("Bình chọn thành công!")
          },
          onError: (error: any) => {
            console.error("Error voting:", error)
            toast.error("Có lỗi xảy ra khi bình chọn")
          },
        }
      )
    }
  }

  const handleShare = () => {
    if (lecturer) {
      const shareText = `Hãy bình chọn cho giảng viên ${lecturer.name} trong cuộc thi "Inspiring Instructor Awards 2025"!`
      const shareUrl = `${window.location.origin}/all-show/lecturers/${lecturer.id}`

      if (navigator.share) {
        navigator
          .share({
            title: "Inspiring Instructor Awards 2025",
            text: shareText,
            url: shareUrl,
          })
          .catch(console.error)
      } else {
        navigator.clipboard
          .writeText(`${shareText}\n${shareUrl}`)
          .then(() => {
            toast.success("Đã sao chép link chia sẻ!")
          })
          .catch(() => {
            toast.error("Không thể sao chép link")
          })
      }
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-lg text-white'>Loading lecturer details...</div>
      </div>
    )
  }

  if (!lecturer) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen text-white'>
        <h1 className='text-2xl font-bold mb-4'>Lecturer not found</h1>
        <p className='text-lg mb-6'>
          The lecturer you're looking for doesn't exist.
        </p>
        <Link href='/all-show/lecturers'>
          <Button className='flex items-center gap-2'>
            <ArrowLeft className='w-4 h-4' />
            Back to Lecturers
          </Button>
        </Link>
      </div>
    )
  }

  const isVoted = votedLecturers.has(lecturer.id)

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        {/* Back Button */}
        <div className='mb-6'>
          <Link href='/all-show/lecturers'>
            <button className='flex items-center gap-2 text-white'>
              <ArrowLeft className='w-4 h-4' />
              Back to Lecturers
            </button>
          </Link>
        </div>

        {/* Lecturer Details Card */}
        <div className='max-w-5xl mx-auto '>
          <div className='relative w-full rounded-3xl overflow-hidden border-gradient flex '>
            {/* Image Section */}
            <div className='relative h-96'>
              {lecturer.avatarUrl ? (
                <Image
                  src={lecturer.avatarUrl}
                  alt={lecturer.name}
                  className='w-full h-full object-cover'
                  width={500}
                  height={500}
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
                  <div className='text-gray-400 text-8xl font-bold'>
                    {lecturer.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* Content Section - Similar to LecturerCard */}
            <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-8 md:p-12 w-full '>
              {/* Lecturer Info */}
              <div className='mb-8'>
                <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                  {lecturer.name}
                </h1>

                <div className='flex items-center gap-4 mb-6 text-white/80'>
                  <div className='flex items-center gap-2'>
                    <Building className='w-5 h-5' />
                    <span className='text-lg'>{lecturer.department}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <User className='w-5 h-5' />
                  </div>
                </div>

                {/* Quote */}
                <div className='bg-white/10 rounded-2xl p-6 border border-white/20'>
                  <Quote className='w-8 h-8 text-pink-400 mb-4' />
                  <p className='text-xl text-white italic leading-relaxed'>
                    "{lecturer.quote}"
                  </p>
                </div>
              </div>

              {/* Action Buttons - Similar to LecturerCard */}
              <div className='flex items-center justify-between'>
                {/* Vote Button */}
                <Button
                  variant='default'
                  size='lg'
                  onClick={() => handleVote(lecturer.id)}
                  disabled={isVoting || isCancelling}
                  className={`bg-transparent border-gradient text-white hover:bg-white/20 rounded-2xl ${
                    isVoted ? "bg-white/20" : ""
                  } ${
                    isVoting || isCancelling
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 font-bold ${
                      isVoted ? "fill-current" : ""
                    } ${isVoting || isCancelling ? "animate-pulse" : ""}`}
                  />
                  <span className='text-sm font-medium'>
                    {isVoting || isCancelling
                      ? "..."
                      : lecturer.votes.toString().padStart(3, "0")}
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
        </div>
      </div>
    </div>
  )
}

export default page
