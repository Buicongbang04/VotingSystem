import React from "react"
import TextBox from "./TextBox"

const TheLeBinhChon = () => {
  return (
    <section className='h-screen flex items-center justify-center px-10 relative bg-purple-400 snap-center'>
      <div
        className='w-full h-1/2 text-white text-7xl font-bold text-center flex items-center'
        style={{
          textShadow:
            "0 0 20px rgba(255, 100, 100, 0.6), 0 0 40px rgba(255, 100, 100, 0.4), 0 0 60px rgba(255, 100, 100, 0.2)",
          filter: "drop-shadow(0 0 10px rgba(255, 100, 100, 0.3))",
        }}
      >
        <h2>THỂ LỆ BÌNH CHỌN</h2>
      </div>
      <TextBox>
        <div className='text-white text-2xl space-y-4 max-w-4xl mx-auto'>
          <ul className='space-y-4'>
            <li className='flex items-start'>
              <span className='text-3xl mr-4'>•</span>
              <span>
                Chương trình dành cho tất cả sinh viên đang học tại FPTU HCMC.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-3xl mr-4'>•</span>
              <span>
                Sinh viên sẽ bình chọn cho giảng viên mà bạn cảm thấy được
                truyền cảm hứng trong quá trình học tập, trao đổi tại trường.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-3xl mr-4'>•</span>
              <span>
                Hệ thống sẽ tính điểm theo tổng lượt bình chọn của sinh viên
                dành cho mỗi giảng viên.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-3xl mr-4'>•</span>
              <span>
                Sau thời gian bình chọn, ban tổ chức sẽ chọn ra top 10 giảng
                viên truyền cảm hứng nhất năm và vinh danh.
              </span>
            </li>
          </ul>
        </div>
      </TextBox>
    </section>
  )
}

export default TheLeBinhChon
