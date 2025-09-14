import React from "react"

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
    <section className='h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 snap-center'>
      <div className='container mx-auto px-8'>
        <div className='text-center mb-16'>
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
          {/* Rocket Icon */}
          <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8'>
            <div className='text-4xl'>🚀</div>
          </div>

          {/* Timeline Line */}
          <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent'></div>
          </div>

          {/* Timeline Events */}
          <div className='relative flex justify-between items-center'>
            {timelineEvents.map((event, index) => (
              <div key={index} className='relative flex flex-col items-center'>
                {/* Event Circle */}
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white/50 ${
                    event.isHighlighted
                      ? "bg-pink-400 shadow-lg shadow-pink-400/50"
                      : "bg-purple-600"
                  }`}
                  style={{
                    boxShadow: event.isHighlighted
                      ? "0 0 20px rgba(244, 114, 182, 0.6), 0 0 40px rgba(244, 114, 182, 0.4)"
                      : "0 0 10px rgba(147, 51, 234, 0.5)",
                  }}
                ></div>

                {/* Event Details */}
                <div
                  className={`absolute ${
                    event.position === "above"
                      ? "-top-20"
                      : event.position === "below"
                      ? "-bottom-20"
                      : "-top-16"
                  } text-center`}
                >
                  <div className='text-white text-sm font-semibold mb-1'>
                    {event.date}
                  </div>
                  <div className='text-white/80 text-xs max-w-24'>
                    {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesPage
