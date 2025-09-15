import React from "react"
import TextBox from "./TextBox"

const VinhDanhGiangVien = () => {
  return (
    <section className='bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 h-screen flex items-center justify-center px-10 relative snap-center'>
      <TextBox>
        <ul className='space-y-4 text-2xl py-10'>
          <li className='flex items-start'>
            <span className='text-purple-300 mr-3 mt-1'>•</span>
            <span>
              <strong>
                Top 10 giảng viên đạt danh hiệu "Inspiring Instructor Awards"
              </strong>{" "}
              sẽ được vinh danh trong buổi lễ trang trọng tại trường Đại học FPT
              campus TP.HCM.
            </span>
          </li>
          <li className='flex items-start'>
            <span className='text-purple-300 mr-3 mt-1'>•</span>
            <span>
              <strong>Trao tặng bộ quà tặng dành riêng</strong> cho danh hiệu
              này.
            </span>
          </li>
        </ul>
      </TextBox>
      <div
        className='text-white text-2xl space-y-4 max-w-4xl mx-auto'
        style={{
          textShadow:
            "0 0 20px rgba(255, 100, 100, 0.6), 0 0 40px rgba(255, 100, 100, 0.4), 0 0 60px rgba(255, 100, 100, 0.2)",
          filter: "drop-shadow(0 0 10px rgba(255, 100, 100, 0.3))",
        }}
      >
        <h2 className='text-6xl font-bold w-lg text-center'>
          VINH DANH TOP 10 GIẢNG VIÊN
        </h2>
      </div>
    </section>
  )
}

export default VinhDanhGiangVien
