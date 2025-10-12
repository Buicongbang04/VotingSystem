"use client"

import React, { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useGetAllLectures } from "@/src/services/LectureServices"
import {
  useVoteForLecture,
  useCancelTodaysVote,
  useGetTodaysVotesByLecture,
} from "@/src/services/LectureVoteServices"
import { useIsAuthenticated, useUser } from "@/src/stores/tokenStore"
import { toast } from "sonner"
import { Button } from "@/src/components/ui/button"
import { Heart, Share2, ArrowLeft, User, Building, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const page = ({ params }: PageProps) => {
  const resolvedParams = React.use(params)
  const queryClient = useQueryClient()
  const { data: lectures, isLoading, refetch } = useGetAllLectures()
  const [votedLecturers, setVotedLecturers] = useState<Set<string>>(new Set())
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()
  const { mutate: voteForLecture, isPending: isVoting } = useVoteForLecture()
  const { mutate: cancelVote, isPending: isCancelling } = useCancelTodaysVote()

  // Check if user has voted for this specific lecturer today
  const { data: todaysVotes, isLoading: isLoadingVotes } =
    useGetTodaysVotesByLecture(resolvedParams.id)

  // Find the specific lecturer by ID
  const lecturer = lectures?.data?.find((l) => l.id === resolvedParams.id)

  // Check if current user has voted for this lecturer today
  const hasUserVoted =
    todaysVotes?.data?.some((vote) => vote.email === user?.email) || false

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

    if (hasUserVoted) {
      // Cancel vote
      cancelVote(lecturerId, {
        onSuccess: (response) => {
          setVotedLecturers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(lecturerId)
            return newSet
          })
          // Invalidate relevant queries to update the UI
          queryClient.invalidateQueries({
            queryKey: ["lectureVotes", lecturerId, "today"],
          })
          queryClient.invalidateQueries({
            queryKey: ["lectures"],
          })
          queryClient.invalidateQueries({
            queryKey: ["lecture", lecturerId],
          })
          refetch()
          toast.success(response?.message || "Đã hủy bình chọn thành công")
        },
        onError: (error: any) => {
          console.error("Error cancelling vote:", error)
          const errorMessage =
            error?.response?.data?.message || "Có lỗi xảy ra khi hủy bình chọn"
          toast.error(errorMessage)
        },
      })
    } else {
      // Vote for lecturer
      voteForLecture(
        { lectureId: lecturerId },
        {
          onSuccess: (response) => {
            setVotedLecturers((prev) => new Set(prev).add(lecturerId))
            // Invalidate relevant queries to update the UI
            queryClient.invalidateQueries({
              queryKey: ["lectureVotes", lecturerId, "today"],
            })
            queryClient.invalidateQueries({
              queryKey: ["lectures"],
            })
            queryClient.invalidateQueries({
              queryKey: ["lecture", lecturerId],
            })
            refetch()
            toast.success(response?.message || "Bình chọn thành công!")
          },
          onError: (error: any) => {
            console.error("Error voting:", error)
            const errorMessage =
              error?.response?.data?.message || "Có lỗi xảy ra khi bình chọn"
            toast.error(errorMessage)
          },
        }
      )
    }
  }

  const handleShare = () => {
    const shareUrl =
      "https://daihoc.fpt.edu.vn/hcm/giang-vien-truyen-cam-hung-2025/"

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Đã sao chép link chia sẻ!")
      })
      .catch(() => {
        toast.error("Không thể sao chép link")
      })
  }

  if (isLoading || isLoadingVotes) {
    return (
      <div className='flex justify-center items-center min-h-screen px-4'>
        <div className='text-base sm:text-lg text-white text-center'>
          Loading lecturer details...
        </div>
      </div>
    )
  }

  if (!lecturer) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen text-white px-4'>
        <h1 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center'>
          Lecturer not found
        </h1>
        <p className='text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-center max-w-md'>
          The lecturer you're looking for doesn't exist.
        </p>
        <Link href='/all-show/lecturers'>
          <Button className='flex items-center gap-2 text-sm sm:text-base'>
            <ArrowLeft className='w-4 h-4' />
            Back to Lecturers
          </Button>
        </Link>
      </div>
    )
  }

  const isVoted = hasUserVoted

  return (
    <div className='min-h-screen md:mt-5 lg:mt-10 xl:mt-15'>
      <div className='container mx-auto px-4 py-4 sm:py-8 pb-20 lg:pb-8'>
        {/* Back Button */}
        <div className='mb-4 sm:mb-6'>
          <Link href='/all-show/lecturers'>
            <button className='flex items-center gap-2 text-white hover:text-white/80 transition-colors'>
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm sm:text-base'>Back to Lecturers</span>
            </button>
          </Link>
        </div>

        {/* Lecturer Details Card */}
        <div className='w-full mx-auto'>
          <div className='relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-gradient flex flex-col lg:flex-row'>
            {/* Image Section */}
            <div className='relative w-full lg:w-1/2'>
              {lecturer.avatarUrl ? (
                <Image
                  src={lecturer.avatarUrl}
                  alt={lecturer.name}
                  className='w-full h-full'
                  width={1000}
                  height={1000}
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
                  <div className='text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold'>
                    <Image
                      src={
                        "https://res.cloudinary.com/dtcinkqwf/image/upload/v1759552442/0_c%C3%B3_h%C3%ACnh_ksqjxi.png"
                      }
                      alt='default avatar'
                      width={1000}
                      height={1000}
                      className='w-full h-full object-contain'
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-4 sm:p-6 lg:p-8 xl:p-12 w-full lg:w-1/2'>
              {/* Lecturer Info */}
              <div className='mb-6 sm:mb-8'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight'>
                  {lecturer.name}
                </h1>

                <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-white/80'>
                  <div className='flex items-center gap-2'>
                    <Building className='w-4 h-4 sm:w-5 sm:h-5' />
                    <span className='text-sm sm:text-base lg:text-lg'>
                      {lecturer.department}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className='bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20'>
                  <Quote className='w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mb-3 sm:mb-4' />
                  <p className='text-base sm:text-lg lg:text-xl text-white italic leading-relaxed'>
                    "{lecturer.quote}"
                  </p>
                </div>
              </div>

              {/* Action Buttons - Hidden on mobile, shown on desktop */}
              <div className='hidden lg:flex items-center justify-between'>
                {/* Vote Button */}
                <Button
                  variant='default'
                  size='lg'
                  onClick={() => handleVote(lecturer.id)}
                  disabled={isVoting || isCancelling}
                  className={`bg-transparent border-gradient text-white hover:bg-white/20 rounded-2xl ${
                    isVoted
                      ? "bg-red-500/20 border-red-400 hover:bg-red-500/30"
                      : ""
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
                      : isVoted
                      ? "Hủy bình chọn"
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

      {/* Sticky Mobile Action Buttons */}
      <div className='lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm'>
        <div className='px-4 py-3'>
          <div className='flex items-center justify-between gap-3'>
            {/* Vote Button */}
            <Button
              variant='default'
              size='lg'
              onClick={() => handleVote(lecturer.id)}
              disabled={isVoting || isCancelling}
              className={`flex-1 bg-transparent border-gradient text-white hover:bg-white/20 rounded-2xl ${
                isVoted
                  ? "bg-red-500/20 border-red-400 hover:bg-red-500/30"
                  : ""
              } ${
                isVoting || isCancelling ? "opacity-50 cursor-not-allowed" : ""
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
                  : isVoted
                  ? "Hủy bình chọn"
                  : lecturer.votes.toString().padStart(3, "0")}
              </span>
            </Button>

            {/* Share Button */}
            <Button
              variant='link'
              size='lg'
              onClick={handleShare}
              className='bg-white/10 text-white hover:bg-white/20 border-gradient rounded-2xl px-6'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
                fill='#e3e3e3'
              >
                <path d='M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z' />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
