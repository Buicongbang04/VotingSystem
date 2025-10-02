import React from "react"
import Image from "next/image"

const GioiThieuVeChuongTrinh = () => {
  return (
    <section
      className="relative min-h-dvh
                w-full max-w-[100vw] flex flex-col
                snap-section
                overflow-y-visible overflow-x-hidden"
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center lg:justify-start lg:items-start">
        <div className="pt-[4vh] sm:pt-[6vh] md:pt-[6vh] lg:pt-[6vh] xl:pt-[2vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <Image
            src="/images/inspo.png"
            alt="logo"
            width={877}
            height={200}
            priority
            className="
                h-auto
                w-[90vw] max-w-[580px]
                sm:w-[80vw] sm:max-w-[640px]
                md:w-[55vw] md:max-w-[720px]
                lg:w-[700px] lg:max-w-[700px]
                xl:w-[877px] xl:max-w-[877px]
              "
            sizes="
                (min-width:1280px) 877px,
                (min-width:1024px) 700px,
                (min-width:768px) 55vw,
                (min-width:640px) 70vw,
                80vw
              "
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
                    translate-x-0 sm:translate-x-0 md:translate-x-10 lg:translate-x-0 xl:translate-x-0">
          <div
            className="
              rounded-3xl p-6 sm:p-6 md:p-8 lg:p-10 xl:p-12
                        bg-gradient-to-r from-[#1E1E1E]/70 via-[#65002F]/70 to-[#F54BAF]/70
                        border border-[#F9C3E3]/70 backdrop-blur-md
                        w-full max-w-[95vw] sm:max-w-xl md:max-w-xl lg:max-w-3xl xl:max-w-4xl
                        text-white
            "
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-justify mb-4">
              Đây là danh hiệu được bình chọn định kỳ hàng năm và dành cho
              giảng viên giảng dạy ở 3 học kỳ gần nhất của thời điểm đó:{" "}
              <strong>Fall</strong>, <strong>Spring</strong>,{" "}
              <strong>Summer</strong>.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-justify">
              Danh hiệu <strong>"Inspiring Instructor Awards"</strong> nhằm
              tôn vinh những nỗ lực, cống hiến của Giảng viên trong hành trình
              trao truyền kiến thức và cảm hứng đến sinh viên{" "}
              <strong>FPTU HCMC</strong>.
            </p>
          </div>
        </div>
      </div>
    </section >
  );
};

export default GioiThieuVeChuongTrinh
