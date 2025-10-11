"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

const HeroPage = () => {
  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://daihoc.fpt.edu.vn/hcm/giang-vien-truyen-cam-hung-2025/"
      )
      alert("Link đã được sao chép!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <section
      id='hero'
      className='
        
        px-4
        w-full max-w-[100vw]
        relative
      '
    >
      <div className='flex flex-col items-start justify-start -translate-y-30'>
        <div className='ml-auto mt-30 md:mt-30 '>
          <Image
            src='/images/hero.png'
            alt='logo'
            width={877}
            height={200}
            priority
            draggable={false}
            className='
                        h-auto
                        w-[80vw] max-w-[520px]
                        sm:w-[70vw] sm:max-w-[640px]
                        md:w-[55vw] md:max-w-[720px]
                        lg:w-[700px] lg:max-w-[700px]
                        xl:w-[877px] xl:max-w-[877px]
                      '
            sizes='
                        (min-width:1280px) 877px,
                        (min-width:1024px) 820px,
                        (min-width:768px) 55vw,
                        (min-width:640px) 70vw,
                        80vw
                      '
          />
        </div>

        <div
          className='
          relative
            rounded-3xl
            p-6 sm:p-6 md:p-12 lg:p-14 xl:p-16
            bg-gradient-to-r from-[#1E1E1E]/70 via-[#65002F]/70 to-[#F54BAF]/70
            backdrop-blur-md
            w-full
            max-w-[95vw] sm:max-w-xl md:max-w-xl lg:max-w-4xl xl:max-w-4xl
            text-white
            border-gradient
            border-b-0
            mx-auto
            z-20
          '
        >
          <div
            className='text-[15vw] leading-none absolute opacity-20 top-0'
            draggable={false}
          >
            ❝
          </div>

          <p
            className='
              text-sm
              sm:text-md md:text-lg lg:text-2xl xl:text-2xl
              leading-relaxed
              mb-5 sm:mb-6
            '
          >
            Danh hiệu{" "}
            <span className='font-bold'>Inspiring Instructor Awards 2025</span>{" "}
            nhằm tôn vinh những nỗ lực, cống hiến của Giảng viên trong hành
            trình định hướng, hỗ trợ sinh viên thu nhận kiến thức và truyền cảm
            hứng đến sinh viên <span className='font-bold'>FPTU</span> trong 3
            học kỳ:{" "}
            <span className='font-bold'>
              Fall 2024, Spring 2025 và Summer 2025.
            </span>
          </p>

          {/* Buttons: dọc trên mobile, ngang từ sm trở lên */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <Link
              href='/login'
              className='
                relative px-6 py-2 rounded-full
                text-white font-medium
                button1
                text-center
                text-[clamp(0.95rem,1.1vw,1rem)]
              '
            >
              Tham gia
            </Link>

            <button
              onClick={handleShareClick}
              className='
                relative px-6 py-2 rounded-full
                text-white font-medium
                button2
                text-[clamp(0.95rem,1.1vw,1rem)]
              '
            >
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPage
