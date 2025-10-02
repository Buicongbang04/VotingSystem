import React from "react"
import TextBox from "./TextBox"
import Image from "next/image"

const TheLeBinhChon = () => {
  return (
    <section className='h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative snap-center gap-8 overflow-hidden'>
      <div className='absolute inset-0 z-10 flex flex-col justify-center items-center lg:justify-start lg:items-start z-0'>
        <div
          className='mt-[4vh] sm:mt-[6vh] md:mt-[6vh] lg:mt-[6vh] xl:mt-[16vh]
                        ml-0 sm:ml-0 md:ml-0 lg:ml-25 xl:ml-20
                        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'
        >
          <Image
            src='/images/vote.png'
            alt='logo'
            width={877}
            height={200}
            priority
            className='
                      h-auto
                      w-[90vw] max-w-[580px]
                      sm:w-[80vw] sm:max-w-[640px]
                      md:w-[55vw] md:max-w-[720px]
                      lg:w-[700px] lg:max-w-[700px]
                      xl:w-[877px] xl:max-w-[877px]

                    '
            sizes='
                      (min-width:1280px) 877px,
                      (min-width:1024px) 700px,
                      (min-width:768px) 55vw,
                      (min-width:640px) 70vw,
                      80vw
                    '
          />
        </div>

        <div
          className='
              rounded-3xl
              bg-gradient-to-r from-[#1E1E1E]/50 via-[#65002F]/50 to-[#F54BAF]/50
              border border-[#F9C3E3]/70 backdrop-blur-md
              w-full max-w-[90vw] md:max-w-xl lg:max-w-3xl xl:max-w-4xl
              text-white
              p-6 sm:p-6 md:p-8 lg:p-10 xl:p-12
              ml-0 sm:ml-20 md:ml-30 lg:ml-40 xl:ml-30
              mt-6 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-18
            '
        >
          <ul className='space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl'>
            <li className='flex items-start'>
              <span className='text-xl sm:text-2xl md:text-3xl mr-4'>•</span>
              <span>
                Chương trình dành cho tất cả sinh viên đang học tại FPTU HCMC.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-xl sm:text-2xl md:text-3xl mr-4'>•</span>
              <span>
                Sinh viên sẽ bình chọn cho giảng viên mà bạn cảm thấy được
                truyền cảm hứng trong quá trình học tập, trao đổi tại trường.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-xl sm:text-2xl md:text-3xl mr-4'>•</span>
              <span>
                Hệ thống sẽ tính điểm theo tổng lượt bình chọn của sinh viên
                dành cho mỗi giảng viên.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-xl sm:text-2xl md:text-3xl mr-4'>•</span>
              <span>
                Sau thời gian bình chọn, ban tổ chức sẽ chọn ra top 10 giảng
                viên truyền cảm hứng nhất năm và vinh danh.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TheLeBinhChon
