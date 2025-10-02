import React from "react"
import TextBox from "./TextBox"
import Image from "next/image"

const CacMocThoiGian = () => {
  return (
    <section className='min-h-screen flex flex-col items-start justify-start px-6 md:px-10 relative snap-center gap-8'>
      <div className='pt-[4vh] sm:pt-[6vh] md:pt-[6vh] lg:pt-[6vh] xl:pt-[2vh]'>
        <Image
          src='/images/moc.png'
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
              rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12
                        bg-gradient-to-r from-[#1E1E1E]/70 via-[#65002F]/70 to-[#F54BAF]/70
                        border border-[#F9C3E3]/70 backdrop-blur-md
                        w-full max-w-[95vw] sm:max-w-xl md:max-w-lg lg:max-w-xl xl:max-w-2xl
                        text-white
            '
      >
        <h3 className='text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-4'>
          Trải qua các giai đoạn sẽ tìm ra được top 10 giảng viên truyền cảm
          hứng nhất năm:
        </h3>
        <ul className='w-full text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pl-2 space-y-3'>
          <li className='flex items-center'>
            <span className='w-2 h-2 bg-white rounded-full mr-3'></span>
            Bình chọn
          </li>
          <li className='flex items-center'>
            <span className='w-2 h-2 bg-white rounded-full mr-3'></span>
            Kết thúc bình chọn
          </li>
          <li className='flex items-center'>
            <span className='w-2 h-2 bg-white rounded-full mr-3'></span>
            Công bố top 10
          </li>
          <li className='flex items-center'>
            <span className='w-2 h-2 bg-white rounded-full mr-3'></span>
            Vinh danh top 10
          </li>
        </ul>
      </div>
    </section>
  )
}

export default CacMocThoiGian
