"use client"

import React from "react"
import { mockTop10Lecturers2024 } from "../data/mockTop10Lecturers"
import { Crown } from "lucide-react"
import { motion } from "motion/react"
import MockLecturerCard from "./MockLecturerCard"

interface Top10LecturersProps {
  className?: string
}

const Top10Lecturers = ({ className = "" }: Top10LecturersProps) => {
  const top10Lecturers = mockTop10Lecturers2024

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className='w-6 h-6 text-white' />
      case 2:
        return <Crown className='w-6 h-6 text-white' />
      case 3:
        return <Crown className='w-6 h-6 text-white' />
      default:
        return (
          <span className='text-lg font-bold text-white bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center'>
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

  return (
    <div className={`w-full ${className}`}>
      {/* Top 3 Special Layout */}
      <div className='flex justify-center items-end gap-2 md:gap-4 mb-12 px-4'>
        {[
          top10Lecturers[1], // Rank 2 (left)
          top10Lecturers[0], // Rank 1 (middle)
          top10Lecturers[2], // Rank 3 (right)
        ].map((lecturer, index) => {
          const rank = index === 0 ? 2 : index === 1 ? 1 : 3
          const isMiddle = rank === 1
          return (
            <div
              key={lecturer.id}
              className={`relative transition-all duration-300 ${
                isMiddle
                  ? "transform scale-105 md:scale-110 z-20"
                  : "transform scale-85 md:scale-90 z-10"
              }`}
            >
              {/* Rank Badge */}
              <div
                className={`absolute -top-3 -right-3 z-10 ${getRankBadgeColor(
                  rank
                )} rounded-full p-2 shadow-lg`}
              >
                {getRankIcon(rank)}
              </div>

              {/* Lecturer Card */}
              <MockLecturerCard
                lecturer={lecturer}
                className={`h-full ${
                  isMiddle ? "w-56 md:w-64" : "w-48 md:w-56"
                }`}
                // No onVote or onShare props - making it unvoteable
              />

              {/* Rank Number Overlay */}
            </div>
          )
        })}
      </div>

      {/* Rest of the lecturers (4-10) with automatic infinite scroll */}
      <section className='relative mb-8 px-4 overflow-x-hidden'>
        <div className='w-full'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Các giảng viên khác
          </h3>

          {/* Infinite scroll container */}
          <div className='relative '>
            <motion.div
              className='flex gap-4 md:gap-6 pb-4'
              animate={{
                x: [0, -100 * top10Lecturers.slice(3).length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate the lecturers for seamless loop */}
              {[...top10Lecturers.slice(3), ...top10Lecturers.slice(3)].map(
                (lecturer, index) => {
                  const rank = (index % top10Lecturers.slice(3).length) + 4
                  return (
                    <div
                      key={`${lecturer.id}-${index}`}
                      className='relative flex-shrink-0'
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-3 -right-3 z-10 ${getRankBadgeColor(
                          rank
                        )} rounded-full p-2 shadow-lg`}
                      >
                        {getRankIcon(rank)}
                      </div>

                      {/* Lecturer Card */}
                      <MockLecturerCard
                        lecturer={lecturer}
                        className='w-48 md:w-56 h-full'
                        // No onVote or onShare props - making it unvoteable
                      />
                    </div>
                  )
                }
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Top10Lecturers
