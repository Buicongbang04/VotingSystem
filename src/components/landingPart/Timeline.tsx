import React from "react";

const DEFAULT_MILESTONES = [
  { id: "01", date: "10.10.2025", title: "Mở cổng bình chọn" },
  { id: "02", date: "31.10.2025", title: "Kết thúc bình chọn" },
  { id: "03", date: "01.11.2025", title: "Công bố Top 10" },
  { id: "04", date: "xx.11.2025", title: "Vinh danh Top 10" },
];

export default function TimeLine({
  milestones = DEFAULT_MILESTONES,
  className = "",
}) {
  const [m1, m2, m3, m4] = milestones;

  return (
    <div className={`relative ${className}`}>
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/60 via-black to-black" />
      </div>

      {/* Diagonal layout – responsive without inline transforms */}
      <div className="relative flex flex-col h-full w-full py-4 sm:py-6 gap-6 sm:gap-8 overflow-x-hidden">
        {/* ITEM 1 */}
        <div
          className="flex flex-row items-center gap-3 sm:gap-4 transform
                     translate-x-[20px]  sm:translate-x-[60px]  md:translate-x-[0px]  lg:translate-x-[20px]  xl:translate-x-[120px]
                     -translate-y-[0px] sm:-translate-y-[0px] md:-translate-y-[0px] lg:-translate-y-[25px] xl:-translate-y-[0px]"
        >
          <div
            className="text-white/30 leading-none select-none font-bolkit whitespace-nowrap"
            style={{ fontSize: "clamp(36px, 10vw, 120px)", fontWeight: 300 }}
          >
            {m1?.id}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-semibold tracking-wide text-lg sm:text-2xl lg:text-3xl">
              {m1?.date}
            </div>
            <div className="text-white/90 text-base sm:text-xl lg:text-2xl">
              {m1?.title}
            </div>
          </div>
        </div>

        {/* ITEM 2 */}
        <div
          className="flex flex-row items-center gap-3 sm:gap-4 transform
                     translate-x-[60px]  sm:translate-x-[160px] md:translate-x-[160px] lg:translate-x-[270px] xl:translate-x-[560px]
                    -translate-y-[10px] sm:-translate-y-[20px] md:-translate-y-[30px] lg:-translate-y-[50px] xl:-translate-y-[100px]"
        >
          <div
            className="text-white/30 leading-none select-none font-bolkit whitespace-nowrap"
            style={{ fontSize: "clamp(36px, 10vw, 120px)", fontWeight: 300 }}
          >
            {m2?.id}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-semibold tracking-wide text-lg sm:text-2xl lg:text-3xl">
              {m2?.date}
            </div>
            <div className="text-white/90 text-base sm:text-xl lg:text-2xl">
              {m2?.title}
            </div>
          </div>
        </div>

        {/* ITEM 3 */}
        <div
          className="flex flex-row items-center gap-3 sm:gap-4 transform
                     translate-x-[40px]  sm:translate-x-[120px] md:translate-x-[80px] lg:translate-x-[150px] xl:translate-x-[340px]
                    -translate-y-[30px] sm:-translate-y-[90px] md:-translate-y-[70px] lg:-translate-y-[80px] xl:-translate-y-[180px]"
        >
          <div
            className="text-white/30 leading-none select-none font-bolkit whitespace-nowrap"
            style={{ fontSize: "clamp(36px, 10vw, 120px)", fontWeight: 300 }}
          >
            {m3?.id}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-semibold tracking-wide text-lg sm:text-2xl lg:text-3xl">
              {m3?.date}
            </div>
            <div className="text-white/90 text-base sm:text-xl lg:text-2xl">
              {m3?.title}
            </div>
          </div>
        </div>

        {/* ITEM 4 */}
        <div
          className="flex flex-row items-center gap-3 sm:gap-4 transform
                    translate-x-[80px]  sm:translate-x-[200px] md:translate-x-[300px] lg:translate-x-[420px] xl:translate-x-[760px]
                    -translate-y-[50px] sm:-translate-y-[100px] md:-translate-y-[100px] lg:-translate-y-[100px] xl:-translate-y-[260px]"
        >
          <div
            className="text-white/30 leading-none select-none font-bolkit whitespace-nowrap"
            style={{ fontSize: "clamp(36px, 10vw, 120px)", fontWeight: 300 }}
          >
            {m4?.id}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-semibold tracking-wide text-lg sm:text-2xl lg:text-3xl">
              {m4?.date}
            </div>
            <div className="text-white/90 text-base sm:text-xl lg:text-2xl">
              {m4?.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
