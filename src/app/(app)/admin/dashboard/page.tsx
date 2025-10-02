"use client"

import React from "react"
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
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
              <p className='text-2xl font-bold text-white'>89</p>
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
              <p className='text-white/70 text-sm font-medium'>Active Votes</p>
              <p className='text-2xl font-bold text-white'>456</p>
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
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white/70 text-sm font-medium'>Events</p>
              <p className='text-2xl font-bold text-white'>12</p>
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
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            Recent Activity
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-vibrant-pink rounded-full'></div>
              <p className='text-white/80'>New user registered</p>
              <span className='text-white/60 text-sm ml-auto'>2 min ago</span>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <p className='text-white/80'>Voting session completed</p>
              <span className='text-white/60 text-sm ml-auto'>1 hour ago</span>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              <p className='text-white/80'>New lecturer added</p>
              <span className='text-white/60 text-sm ml-auto'>3 hours ago</span>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <button className='w-full p-3 bg-vibrant-pink/20 hover:bg-vibrant-pink/30 text-white rounded-lg transition-colors'>
              Create New Voting Session
            </button>
            <button className='w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'>
              Add New Lecturer
            </button>
            <button className='w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'>
              View System Logs
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
