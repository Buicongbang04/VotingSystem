"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { useGetAllLectures } from "@/src/services/LectureServices"
import { useGetAllAccounts } from "@/src/services/AccountServices"
import { useGetAllFeedbackVotes } from "@/src/services/FeedbackVoteServices"

export default function AdminDashboard() {
  // Fetch real data from services
  const { data: lecturersData, isLoading: lecturersLoading } =
    useGetAllLectures()
  const { data: accountsData, isLoading: accountsLoading } = useGetAllAccounts()
  const { data: feedbackData, isLoading: feedbackLoading } =
    useGetAllFeedbackVotes()

  // Calculate stats
  const totalLecturers = lecturersData?.data?.length || 0
  const totalUsers = accountsData?.data?.length || 0
  const totalFeedback = feedbackData?.data?.length || 0

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-white'>Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white/70 text-sm font-medium'>
                Total Lecturers
              </p>
              <p className='text-2xl font-bold text-white'>
                {lecturersLoading ? "..." : totalLecturers}
              </p>
            </div>
            <div className='p-3 bg-vibrant-pink/20 rounded-full'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white/70 text-sm font-medium'>Total Users</p>
              <p className='text-2xl font-bold text-white'>
                {accountsLoading ? "..." : totalUsers}
              </p>
            </div>
            <div className='p-3 bg-vibrant-pink/20 rounded-full'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white/70 text-sm font-medium'>
                Feedback Votes
              </p>
              <p className='text-2xl font-bold text-white'>
                {feedbackLoading ? "..." : totalFeedback}
              </p>
            </div>
            <div className='p-3 bg-vibrant-pink/20 rounded-full'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* System Overview */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            System Overview
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-vibrant-pink rounded-full'></div>
                <p className='text-white/80'>Total Lecturers</p>
              </div>
              <span className='text-white font-semibold'>{totalLecturers}</span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p className='text-white/80'>Total Users</p>
              </div>
              <span className='text-white font-semibold'>{totalUsers}</span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                <p className='text-white/80'>Feedback Responses</p>
              </div>
              <span className='text-white font-semibold'>{totalFeedback}</span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <p className='text-white/80'>Total Votes Cast</p>
              </div>
              <span className='text-white font-semibold'>
                {lecturersData?.data?.reduce(
                  (sum, lecturer) => sum + lecturer.votes,
                  0
                ) || 0}
              </span>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <a
              href='/admin/lecturers/add'
              className='block w-full p-3 bg-vibrant-pink/20 hover:bg-vibrant-pink/30 text-white rounded-lg transition-colors text-center'
            >
              Add New Lecturer
            </a>
            <a
              href='/admin/lecturers'
              className='block w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center'
            >
              Manage Lecturers
            </a>
            <a
              href='/admin/users'
              className='block w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center'
            >
              View Users
            </a>
            <a
              href='/admin/feedback'
              className='block w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center'
            >
              View Feedback
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
