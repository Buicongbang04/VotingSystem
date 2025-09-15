import React from "react"
import ScrollToTopArrow from "../scroll-to-top-arrow"
import ScrollToElement from "../scroll-to-top-arrow"
import { TimeLineSVG } from "./Timeline"

const FeaturesPage = () => {
  const timelineEvents = [
    {
      date: "10/10/2025",
      description: "Bình chọn",
      position: "below",
    },
    {
      date: "31/10/2025",
      description: "Kết thúc bình chọn",
      position: "above",
    },
    {
      date: "01/11/2025",
      description: "Công bố Top 10",
      position: "center",
    },
    {
      date: "31/10/2025",
      description: "Vinh danh Top 10",
      position: "center",
      isHighlighted: true,
    },
  ]

  return (
    <section
      id='features'
      className='h-screen flex flex-col items-center justify-between bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 snap-section'
    >
      <div className='mx-auto'>
        <div className='text-center '>
          <h2
            className='text-5xl md:text-6xl font-bold text-white p-10'
            style={{
              textShadow:
                "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
            }}
          >
            MỐC THỜI GIAN
          </h2>
        </div>

        <div className='relative max-w-6xl mx-auto'>
          <TimeLineSVG className='w-full h-full' />
        </div>
      </div>

      <ScrollToElement to='#hero' />
    </section>
  )
}

export default FeaturesPage
