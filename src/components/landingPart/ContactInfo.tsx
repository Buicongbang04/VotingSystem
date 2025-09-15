"use client"

import Link from "next/link"
import React from "react"

const ContactInfo = () => {
  return (
    <section className=''>
      <div className='p-10 text-center relative z-10'>
        {/* Main Title */}
        <div className='text-start py-5'>
          <h2 className='text-2xl font-bold text-white uppercase'>LIÊN HỆ</h2>
        </div>

        {/* Contact Information */}
        <div className='flex flex-col items-start space-y-8'>
          {/* Facebook Contact */}

          <Link
            href='https://www.facebook.com/srofptuhcmc'
            className='flex items-center space-x-4'
          >
            <div className='w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center'>
              <svg
                className='w-6 h-6 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
              </svg>
            </div>
            <span className='text-white text-xl font-medium'>
              Phòng CTSV ĐH FPT TPHCM
            </span>
          </Link>

          {/* Email Contact */}
          <Link
            href='mailto:ctsv.hcm@fpt.edu.vn'
            className='flex items-center space-x-4'
          >
            <div className='w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <span className='text-white text-xl font-medium'>
              ctsv.hcm@fpt.edu.vn
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
