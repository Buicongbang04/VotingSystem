"use client"

import React, { useState } from "react"
import { Bell, User, ChevronDown, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser, useLogout } from "../stores/tokenStore"

const AppNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const user = useUser()
  const logout = useLogout()
  const router = useRouter()

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
    setIsProfileOpen(false)
  }

  const handleUserInformation = () => {
    router.push("/user-information")
    setIsProfileOpen(false)
  }

  return (
    <div className='h-30'>
      <div className='h-full px-6 flex items-center justify-center'>
        {/* Left Section - Logo/Brand */}
        <div className='flex items-center space-x-100'>
          <Image
            src='/images/Logo.png'
            alt='FPT University'
            width={200}
            height={200}
            className='object-cover'
          />
          <Image
            src='/images/iia_Logo.png'
            alt='FPT University'
            width={150}
            height={150}
            className='object-cover'
          />
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <button className='p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200'>
              <Bell className='w-5 h-5' />
            </button>
          </div>

          <div className='relative'>
            <button
              onClick={toggleProfile}
              className='flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                <User className='w-4 h-4 text-black' />
              </div>
              <div className='hidden sm:block text-left'>
                <p className='text-sm font-medium text-white'>{user?.name}</p>
                <p className='text-xs text-white'>Sinh viên</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-gray-500 transition-transform duration-200",
                  isProfileOpen && "rotate-180"
                )}
              />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className='fixed inset-0 z-10'
                  onClick={() => setIsProfileOpen(false)}
                />

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
                    <button
                      onClick={handleUserInformation}
                      className='w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
                    >
                      <Settings className='w-4 h-4' />
                      <span className='text-sm'>Thông tin cá nhân</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200'
                    >
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
