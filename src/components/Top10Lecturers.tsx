import React from "react"
import LecturerCard from "./LecturerCard"
import {
  mockTop10Lecturers,
  getTop10Lecturers,
} from "../data/mockTop10Lecturers"
import { Trophy, Medal, Award } from "lucide-react"

interface Top10LecturersProps {
  className?: string
}

const Top10Lecturers = ({ className = "" }: Top10LecturersProps) => {
  const top10Lecturers = getTop10Lecturers()

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className='w-6 h-6 text-yellow-500' />
      case 2:
        return <Medal className='w-6 h-6 text-gray-400' />
      case 3:
        return <Award className='w-6 h-6 text-amber-600' />
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
      {/* Header */}
      <div className='text-center mb-8'>
        <h2 className='text-4xl font-bold text-white mb-4'>
          Top 10 Giảng viên được yêu thích nhất
        </h2>
        <p className='text-lg text-gray-300'>
          Danh sách những giảng viên có số lượt bình chọn cao nhất
        </p>
      </div>

      {/* Top 10 Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {top10Lecturers.map((lecturer, index) => {
          const rank = index + 1
          return (
            <div key={lecturer.id} className='relative'>
              {/* Rank Badge */}
              <div
                className={`absolute -top-3 -right-3 z-10 ${getRankBadgeColor(
                  rank
                )} rounded-full p-2 shadow-lg`}
              >
                {getRankIcon(rank)}
              </div>

              {/* Lecturer Card */}
              <LecturerCard
                lecturer={lecturer}
                voteCount={lecturer.votes}
                isVoted={false}
                className='h-full'
                // No onVote or onShare props - making it unvoteable
              />

              {/* Rank Number Overlay */}
              <div className='absolute top-4 left-4 z-10'>
                <div
                  className={`${getRankBadgeColor(
                    rank
                  )} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg`}
                >
                  {rank}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Note */}
      <div className='text-center mt-8 p-4 bg-gray-800/50 rounded-lg'>
        <p className='text-gray-400 text-sm'>
          * Danh sách này được cập nhật dựa trên số lượt bình chọn từ sinh viên
        </p>
        <p className='text-gray-500 text-xs mt-2'>
          Tính năng bình chọn đã được tắt cho danh sách Top 10
        </p>
      </div>
    </div>
  )
}

export default Top10Lecturers
