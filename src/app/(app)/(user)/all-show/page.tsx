"use client"

// import EventAnnouncement from "@/src/components/EventAnnouncement"
// import FeedbackVoteComponent from "@/src/components/FeedbackVoteComponent"
// import { useGetAccountById } from "@/src/services/AccountServices"
// import { useUser } from "@/src/stores/tokenStore"
// import { useRouter } from "next/navigation"
// import React from "react"

// const Page = () => {
//   const user = useUser()
//   const { data } = useGetAccountById(user?.sub!)
//   const redirect = useRouter()

//   const onJoin = () => {
//     if (data) {
//       redirect.push(`/all-show/lecturers`)
//     } else {
//       redirect.push("/user-information")
//     }
//   }

//   return (
//     <div className='flex justify-center items-center pt-10 md:pt-30 p-4 md:p-10'>
//       <EventAnnouncement onJoin={onJoin} />
//     </div>
//   )
// }

// export default Page

import React from "react"
import Image from "next/image"
import { useGetTopLectures } from "@/src/services/LectureServices"
import { LoadingGrid } from "@/src/components/ui/loading"
import { Crown } from "lucide-react"
import { Star } from "lucide-react"

const Page = () => {
  // Get top 10 lecturers sorted by votes
  const { data: topLecturersData, isLoading } = useGetTopLectures(10, 1)
  const topLecturers = topLecturersData?.data || []

  // Generate image paths for TOP 10 images (1.png through 10.png)
  // Map lecturers to their corresponding images
  const getImagePath = (index: number) => `/images/TOP 10/${index + 1}.png`

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Crown className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white' />
        )
      case 2:
        return (
          <Crown className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white' />
        )
      case 3:
        return (
          <Crown className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white' />
        )
      default:
        return (
          <span className='text-sm sm:text-base md:text-lg font-bold text-white bg-pink-500 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center'>
            {rank}
          </span>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-700"
      default:
        return "bg-gradient-to-r from-pink-500 to-pink-700"
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingGrid />
      </div>
    )
  }

  return (
    <div className='min-h-screen relative px-2 sm:px-4 mt-10'>
      <div className='pt-4 sm:pt-8 pb-8'>
        {/* Top 3 Special Layout */}
        <div className='grid grid-cols-1 sm:flex sm:justify-center sm:items-end gap-4 sm:gap-2 md:gap-4 mb-8 sm:mb-12 px-2 sm:px-4'>
          {topLecturers.slice(0, 3).map((lecturer, i) => {
            const rank = i + 1
            const isMiddle = rank === 1
            return (
              <div
                key={lecturer.id}
                className={`relative transition-all duration-300 ${
                  isMiddle
                    ? "sm:transform sm:scale-110 sm:z-20 sm:order-2"
                    : rank === 2
                    ? "sm:transform sm:scale-95 sm:z-10 sm:order-1"
                    : "sm:transform sm:scale-95 sm:z-10 sm:order-3"
                }`}
              >
                {/* Rank Badge */}
                <div
                  className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 ${getRankBadgeColor(
                    rank
                  )} rounded-full p-1 sm:p-2 shadow-lg`}
                >
                  {getRankIcon(rank)}
                </div>

                {/* Lecturer Card */}
                <div
                  className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-gradient cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation ${
                    isMiddle
                      ? "sm:w-40 md:w-48 lg:w-56"
                      : "sm:w-36 md:w-48 lg:w-56"
                  }`}
                >
                  {/* Image Section */}
                  <div className='relative h-sm -z-2'>
                    <Image
                      src={getImagePath(i)}
                      alt={lecturer.name}
                      className='w-full h-full object-cover'
                      width={300}
                      height={300}
                      priority={rank <= 3}
                      loading={rank <= 3 ? "eager" : "lazy"}
                      placeholder='blur'
                      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
                    />
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
                      {lecturer.department && (
                        <p className='text-xs sm:text-sm text-white/80 truncate'>
                          {lecturer.department}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Rest of the lecturers (4-10) - Vertical Grid on Mobile, Horizontal Scroll on Larger Screens */}
        <section className='relative mb-6 sm:mb-8'>
          <div className='w-full'>
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center px-2 sm:px-4'>
              Các giảng viên khác
            </h3>
            {/* Mobile: Vertical List */}
            <div className='w-full px-2 sm:px-4 block sm:hidden'>
              <div className='flex flex-col gap-4'>
                {topLecturers.slice(3, 10).map((lecturer, index) => {
                  const rank = index + 4
                  return (
                    <div key={lecturer.id} className='relative'>
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-2 -right-2 z-10 ${getRankBadgeColor(
                          rank
                        )} rounded-full p-1 shadow-lg`}
                      >
                        {getRankIcon(rank)}
                      </div>

                      {/* Lecturer Card */}
                      <div className='relative w-full rounded-2xl overflow-hidden border-gradient cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation'>
                        {/* Image Section */}
                        <div className='relative h-sm -z-2'>
                          <Image
                            src={getImagePath(index + 3)}
                            alt={lecturer.name}
                            className='w-full h-full object-cover'
                            width={300}
                            height={300}
                            loading='lazy'
                            placeholder='blur'
                            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
                          />
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
                            {lecturer.department && (
                              <p className='text-xs sm:text-sm text-white/80 truncate'>
                                {lecturer.department}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Larger Screens: Horizontal Scroll */}
            <div className='w-full hidden sm:block'>
              <div className='w-full overflow-x-auto overflow-y-hidden'>
                <div
                  className='flex flex-nowrap gap-2 sm:gap-4 md:gap-6 pb-4 px-2 sm:px-4 p-5'
                  style={{ width: "max-content" }}
                >
                  {topLecturers.slice(3, 10).map((lecturer, index) => {
                    const rank = index + 4
                    return (
                      <div key={lecturer.id} className='relative flex-shrink-0'>
                        {/* Rank Badge */}
                        <div
                          className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 ${getRankBadgeColor(
                            rank
                          )} rounded-full p-1 sm:p-2 shadow-lg`}
                        >
                          {getRankIcon(rank)}
                        </div>

                        {/* Lecturer Card */}
                        <div className='relative w-32 sm:w-36 md:w-48 lg:w-56 rounded-2xl sm:rounded-3xl overflow-hidden border-gradient cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation'>
                          {/* Image Section */}
                          <div className='relative h-sm -z-2'>
                            <Image
                              src={getImagePath(index + 3)}
                              alt={lecturer.name}
                              className='w-full h-full object-cover'
                              width={300}
                              height={300}
                              loading='lazy'
                              placeholder='blur'
                              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
                            />
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
                              {lecturer.department && (
                                <p className='text-xs sm:text-sm text-white/80 truncate'>
                                  {lecturer.department}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
