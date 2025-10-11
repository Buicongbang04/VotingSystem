import React from "react"
import Reveal from "@/src/utils/Reveal"

const DEFAULT_MILESTONES = [
  { id: "01", date: "14.10.2025", title: "Mở cổng bình chọn" },
  { id: "02", date: "06.11.2025", title: "Kết thúc bình chọn" },
  { id: "03", date: "07.11.2025", title: "Công bố Top 10" },
  { id: "04", date: "20.11.2025", title: "Vinh danh Top 10" },
]

export default function TimeLine({
  milestones = DEFAULT_MILESTONES,
  className = "",
}) {
  const [m1, m2, m3, m4] = milestones

  return (
    <div className={`relative ${className}`}>
      {/* ITEM 1 */}
      <Reveal direction='left' threshold={0.3} duration={600} delay={0}>
        <div
          className='flex flex-row items-center gap-3 sm:gap-4 transform
                       translate-x-[0px]  sm:translate-x-[60px]  md:translate-x-[0px]  lg:translate-x-[0px]  xl:translate-x-[100px]
                       -translate-y-[0px] sm:-translate-y-[0px] md:-translate-y-[0px] lg:-translate-y-[0px] xl:-translate-y-[0px]'
        >
          <div
            className='text-white/30 leading-none select-none font-bolkit whitespace-nowrap'
            style={{ fontSize: "clamp(26px, 10vw, 90px)", fontWeight: 300 }}
          >
            {m1?.id}
          </div>
          <div className='text-center sm:text-left'>
            <div className='text-white font-semibold tracking-wide text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m1?.date}
            </div>
            <div className='text-white/90 text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m1?.title}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ITEM 2 */}
      <Reveal direction='right' threshold={0.3} duration={600} delay={200}>
        <div
          className='flex flex-row items-center gap-3 sm:gap-4 transform
                       translate-x-[0px]  sm:translate-x-[160px] md:translate-x-[160px] lg:translate-x-[40px] xl:translate-x-[250px]
                      -translate-y-[0px] sm:-translate-y-[20px] md:-translate-y-[10px] lg:-translate-y-[10px] xl:-translate-y-[0px]'
        >
          <div
            className='text-white/30 leading-none select-none font-bolkit whitespace-nowrap'
            style={{ fontSize: "clamp(26px, 10vw, 90px)", fontWeight: 300 }}
          >
            {m2?.id}
          </div>
          <div className='text-center sm:text-left'>
            <div className='text-white font-semibold tracking-wide text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m2?.date}
            </div>
            <div className='text-white/90 text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m2?.title}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ITEM 3 */}
      <Reveal direction='left' threshold={0.3} duration={600} delay={400}>
        <div
          className='flex flex-row items-center gap-3 sm:gap-4 transform
                       translate-x-[0px]  sm:translate-x-[120px] md:translate-x-[80px] lg:translate-x-[100px] xl:translate-x-[0px]
                      -translate-y-[0px] sm:-translate-y-[90px] md:-translate-y-[20px] lg:-translate-y-[20px] xl:-translate-y-[10px]'
        >
          <div
            className='text-white/30 leading-none select-none font-bolkit whitespace-nowrap'
            style={{ fontSize: "clamp(26px, 10vw, 90px)", fontWeight: 300 }}
          >
            {m3?.id}
          </div>
          <div className='text-center sm:text-left'>
            <div className='text-white font-semibold tracking-wide text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m3?.date}
            </div>
            <div className='text-white/90 text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m3?.title}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ITEM 4 */}
      <Reveal direction='right' threshold={0.3} duration={600} delay={600}>
        <div
          className='flex flex-row items-center gap-3 sm:gap-4 transform
                      translate-x-[0px]  sm:translate-x-[200px] md:translate-x-[300px] lg:translate-x-[170px] xl:translate-x-[350px]
                      -translate-y-[0px] sm:-translate-y-[100px] md:-translate-y-[30px] lg:-translate-y-[30px] xl:-translate-y-[20px]'
        >
          <div
            className='text-white/30 leading-none select-none font-bolkit whitespace-nowrap'
            style={{ fontSize: "clamp(26px, 10vw, 90px)", fontWeight: 300 }}
          >
            {m4?.id}
          </div>
          <div className='text-center sm:text-left'>
            <div className='text-white font-semibold tracking-wide text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m4?.date}
            </div>
            <div className='text-white/90 text-base sm:text-lg lg:text-xl xl:text-2xl'>
              {m4?.title}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
