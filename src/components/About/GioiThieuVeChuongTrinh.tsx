import React from "react"
import TextBox from "./TextBox"

const GioiThieuVeChuongTrinh = () => {
  return (
    <section className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 snap-center px-10 gap-5'>
      <div
        className='w-full h-1/2 text-white text-7xl font-bold text-center flex items-center'
        style={{
          textShadow:
            "0 0 20px rgba(255, 100, 100, 0.6), 0 0 40px rgba(255, 100, 100, 0.4), 0 0 60px rgba(255, 100, 100, 0.2)",
          filter: "drop-shadow(0 0 10px rgba(255, 100, 100, 0.3))",
        }}
      >
        GIỚI THIỆU VỀ CHƯƠNG TRÌNH
      </div>
      <TextBox>
        <p className='text-2xl text-justify'>
          Đây là danh hiệu được bình chọn định kỳ hàng năm và dành cho giảng
          viên giảng dạy ở 3 học kỳ gần nhất của thời điểm đó:{" "}
          <strong>Fall</strong>, <strong>Spring</strong>,{" "}
          <strong>Summer</strong>.
        </p>
        <p className='text-2xl text-justify'>
          Danh hiệu <strong>"Inspiring Instructor Awards"</strong> nhằm tôn vinh
          những nỗ lực, cống hiến của Giảng viên trong hành trình trao truyền
          kiến thức và cảm hứng đến sinh viên <strong>FPTU HCMC</strong>.
        </p>
      </TextBox>
    </section>
  )
}

export default GioiThieuVeChuongTrinh
