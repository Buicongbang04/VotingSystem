import React from "react"

const HeroPage = () => {
  return (
    <section className='h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 snap-section'>
      <div className='container mx-auto'>
        <div
          className='text-white text-8xl font-bold mb-6 text-center'
          style={{
            textShadow:
              "0 0 20px rgba(255, 100, 100, 0.6), 0 0 40px rgba(255, 100, 100, 0.4), 0 0 60px rgba(255, 100, 100, 0.2)",
            filter: "drop-shadow(0 0 10px rgba(255, 100, 100, 0.3))",
          }}
        >
          Inspiring Instructor Awards 2025
        </div>

        <div className='w-full p-5 bg-gray-700/35'>
          <div className='text-white text-3xl mb-6 text-center max-w-7xl mx-auto'>
            Danh hiệu{" "}
            <span className='font-bold'> Inspiring Instructor Awards 2025</span>{" "}
            nhằm tôn vinh những nỗ lực, cống hiến của Giảng viên trong hành
            trình định hướng, hỗ trợ sinh viên thu nhận kiến thức và truyền cảm
            hứng đến sinh viên <span className='font-bold'>FPTU HCMC</span>{" "}
            trong 3 học kỳ:{" "}
            <span className='font-bold'>
              Fall 2024, Spring 2025 và Summer 2025.{" "}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mt-8'>
            <button className='px-8 py-3 bg-pink-200 text-fuchsia-600 font-bold text-xl rounded-full border-2 border-fuchsia-400 shadow-lg hover:bg-pink-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
              THAM GIA
            </button>
            <button className='px-8 py-3 bg-pink-200 text-fuchsia-600 font-bold text-xl rounded-full border-2 border-fuchsia-400 shadow-lg hover:bg-pink-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
              CHIA SẺ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPage
