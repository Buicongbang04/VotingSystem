"use client"

import React, { useState } from "react"
import { Bell, User, ChevronDown, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useUser } from "../stores/tokenStore"

const AppNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [notificationCount] = useState(3) // Mock notification count
  const user = useUser()

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <div className='h-20 bg-rose-200/40 border-b border-gray-200 shadow-sm'>
      <div className='h-full px-6 flex items-center justify-between'>
        {/* Left Section - Logo/Brand */}
        <div className='flex items-center'>
          <div className='flex items-center space-x-2'>
            <Image
              src='/images/Logo.png'
              alt='FPT University'
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className='flex items-center space-x-4'>
          {/* Bell Icon with Notification Badge */}
          <div className='relative'>
            <button className='p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200'>
              <Bell className='w-5 h-5' />
              {notificationCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className='relative'>
            <button
              onClick={toggleProfile}
              className='flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              <div className='w-8 h-8 bg-[#8B1538] rounded-full flex items-center justify-center'>
                <User className='w-4 h-4 text-white' />
              </div>
              <div className='hidden sm:block text-left'>
                <p className='text-sm font-medium text-gray-800'>
                  {user?.name}
                </p>
                <p className='text-xs text-gray-500'>Sinh viên</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-gray-500 transition-transform duration-200",
                  isProfileOpen && "rotate-180"
                )}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <>
                {/* Backdrop */}
                <div
                  className='fixed inset-0 z-10'
                  onClick={() => setIsProfileOpen(false)}
                />

                {/* Dropdown Content */}
                <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20'>
                  <div className='p-4 border-b border-gray-100'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-12 h-12 bg-[#8B1538] rounded-full flex items-center justify-center'>
                        <User className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>
                          {user?.name}
                        </p>
                        <p className='text-sm text-gray-500'>{user?.email}</p>
                        <p className='text-xs text-gray-400'>Sinh viên - K15</p>
                      </div>
                    </div>
                  </div>

                  <div className='py-2'>
                    <button className='w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
                      <Settings className='w-4 h-4' />
                      <span className='text-sm'>Cài đặt tài khoản</span>
                    </button>

                    <button className='w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200'>
                      <LogOut className='w-4 h-4' />
                      <span className='text-sm'>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppNavbar
