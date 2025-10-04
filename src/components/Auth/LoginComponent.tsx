"use client"

import React from "react"
import { Home } from "lucide-react"
import Image from "next/image"

interface LoginComponentProps {
  onGoogleLogin?: () => void
  onHomeClick?: () => void
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  onGoogleLogin,
  onHomeClick,
}) => {
  return (
    <div
      className='
        bg-login min-h-dvh flex flex-col items-center justify-center
        px-4 sm:px-6 lg:px-8 py-[clamp(1rem,4vw,2rem)]
        h-screen
      '
    >
      {/* Logo */}
      <div className='mb-[clamp(1rem,4vw,2rem)] flex flex-row items-center md:translate-y-5 md:translate-x-5 lg:translate-y-[-5] gap-15 sm:gap-20 md:gap-25 lg:gap-35'>
        <Image
          src='/images/Logo.png'
          alt='IIA Logo'
          width={280}
          height={280}
          priority
          sizes='(max-width: 640px) 160px, (max-width: 768px) 200px, 280px'
          className='h-auto w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] sm:visible invisible md:visible lg:visible xl:visible'
        />
        <Image
          src='/images/iia_logo.png'
          alt='IIA Logo'
          width={280}
          height={280}
          priority
          sizes='(max-width: 640px) 160px, (max-width: 768px) 200px, 280px'
          className='h-auto w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] sm:visible invisible md:visible lg:visible xl:visible'
        />
      </div>

      {/* Form Shell */}
      <div className='relative w-full max-w-md min-w-0'>
        {/* Glow border */}
        <div className='absolute -inset-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-2xl blur-sm opacity-50' />

        {/* Card */}
        <div
          className='
            relative bg-pink-300/50 rounded-2xl
            p-[clamp(1rem,4vw,2rem)]
            shadow-2xl w-full
          '
        >
          <div className='space-y-6'>
            {/* Title */}
            <div className='text-center'>
              <h1 className='text-2xl font-bold text-white mb-2'>Đăng nhập</h1>
              <p className='text-white/80'>
                Sử dụng Google để đăng nhập vào hệ thống
              </p>
            </div>

            {/* Home Button */}
            <div className='flex justify-center'>
              <button
                type='button'
                onClick={onHomeClick}
                aria-label='Về trang chủ'
                className='
                  w-10 h-10 bg-white rounded-full flex items-center justify-center
                  shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105
                '
              >
                <Home size={20} className='text-gray-600' />
              </button>
            </div>

            {/* Google Login */}
            <button
              type='button'
              onClick={onGoogleLogin}
              className='
                w-full bg-white hover:bg-gray-50
                text-gray-700 font-medium py-3 px-6 rounded-full
                border border-gray-300 transition-all duration-300
                transform hover:scale-105
                shadow-md hover:shadow-lg
                flex items-center justify-center gap-3
                text-[clamp(0.95rem,1.3vw,1rem)]
              '
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                focusable='false'
              >
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
