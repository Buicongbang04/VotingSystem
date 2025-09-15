import React from "react"
import TextBox from "./TextBox"

const CacMocThoiGian = () => {
  return (
    <section className='h-screen flex items-center justify-center px-10 relative bg-rose-400 snap-center'>
      {/* Left content box */}
      <TextBox className='items-start flex-1'>
        <h3 className='text-white text-3xl leading-relaxed '>
          Trải qua các giai đoạn sẽ tìm ra được top 10 giảng viên truyền cảm
          hứng nhất năm:
        </h3>
        <ul className=' text-white text-2xl ml-7'>
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
      </TextBox>

      {/* Right side text */}
      <div className='text-center'>
        <h2
          className='text-6xl font-bold text-white'
          style={{
            textShadow:
              "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
          }}
        >
          CÁC MỐC THỜI GIAN
        </h2>
      </div>
    </section>
  )
}

export default CacMocThoiGian
