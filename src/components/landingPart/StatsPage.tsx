import React from "react"
import ScrollToElement from "../scroll-to-top-arrow"
import Image from "next/image"
import { StageCard } from "./StageCard"

const StatsPage = () => {
  const academicStages = [
    {
      title: "GIAI ĐOẠN DỰ BỊ",
      subtitle: "",
      rules: [
        {
          hearts: 3,
          instructors: "3 Giảng viên",
          category: "Nhóm ngành cơ bản",
        },
      ],
    },
    {
      title: "GIAI ĐOẠN CHUYÊN NGÀNH",
      subtitle: "(HK1 - HK6)",
      rules: [
        {
          hearts: 3,
          instructors: "3 Giảng viên",
          category: "Nhóm ngành cơ bản",
        },
        { hearts: 2, instructors: "3 Giảng viên", category: "Chuyên ngành" },
      ],
    },
    {
      title: "GIAI ĐOẠN CHUYÊN NGÀNH",
      subtitle: "(HK7 - HK9)",
      rules: [
        { hearts: 3, instructors: "3 Giảng viên", category: "Chuyên ngành" },
      ],
    },
  ]

  return (
    <section
      id='stats'
      className='
       
        min-h-dvh flex flex-col items-center justify-center snap-section relative
        px-2 sm:px-4 lg:px-6
        w-full
        overflow-x-hidden
      '
    >
      {/* Nội dung chính */}
      <div className='relative z-10 w-full min-w-0 max-w-[95%] md:max-w-5xl mx-auto'>
        {/* Main Title */}
        <div
          className='
                    flex justify-center items-center
                    pt-[5vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[12vh] xl:pt-[15vh]
                    md:pl-[8vw] lg:pl-[10vw] xl:pl-[12vw]
                  '
        >
          <Image
            src='/images/vote.png'
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
                      lg:w-[680px] lg:max-w-[820px]
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

        {/* Voting Rules Section */}
        <div className='mb-8 sm:mb-10 ml-0 sm:ml-0 md:ml-40 lg:ml-70 xl:ml-50'>
          <h3 className='text-xl sm:text-2xl font-bold text-white mb-4'>
            Quy tắc bình chọn
          </h3>
          <div className='space-y-2 sm:space-y-3 text-white text-md sm:text-base md:text-lg lg:text-xl break-words whitespace-normal'>
            <div className='flex items-end'>
              <span className='text-white-400 mr-2 sm:mr-3 my-auto'>•</span>
              <span>
                1 sinh viên có 3 lượt bình chọn và chỉ được tham gia 1 lần/ngày
              </span>
            </div>
            <div className='flex items-end'>
              <span className='text-white-400 mr-2 sm:mr-3 my-auto'>•</span>
              <span>1 phiếu chỉ được bình chọn cho 1 giảng viên/bộ môn</span>
            </div>
          </div>
        </div>

        {/* Point Calculation Rules */}
        <div className='mb-8 sm:mb-12 flex flex-col justify-end items-start md:justify-center md:items-center lg:justify-end lg:items-center'>
          <h3
            className='italic font-bold text-white pb-4 sm:pb-5 mb-2 sm:mb-4
                         text-lg sm:text-xl md:text-2xl break-words whitespace-normal
                      ml-0 sm:ml-0 md:ml-40 lg:ml-0 xl:ml-0'
          >
            Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 ml-0 sm:ml-0 md:ml-40 lg:ml-0 xl:ml-0'>
            {academicStages.map((stage, index) => (
              <StageCard
                key={index}
                title={stage.title}
                subtitle={stage.subtitle}
                rules={stage.rules}
              />
            ))}
          </div>
        </div>
      </div>

      <ScrollToElement to='#features' />
    </section>
  )
}

export default StatsPage
