import React from "react";
import TextBox from "./TextBox";
import Image from "next/image";

const VinhDanhGiangVien = () => {
  return (
    <section className="bg-gioithieu h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative snap-center gap-8 overflow-hidden">
      <div className="w-[100vw] max-w-none h-[100svh] overflow-hidden">
        <Image
          src="/images/KV.png"
          alt="KV"
          fill
          priority
          className="object-cover w-full translate-y-[10%] sm:translate-y-[15%] md:translate-y-[20%] lg:translate-y-[25%] xl:translate-y-[20%]
                              translate-x-[-10%] sm:translate-x-[-10%] md:translate-x-[0%] lg:translate-x-[5%] xl:translate-x-[-20%]
                              scale-[1.3] sm:scale-[1.4] md:scale-[1.4] lg:scale-[1.5] xl:scale-[1.4]"
        />

        <div
          className="absolute inset-0 z-10 flex flex-col justify-center items-center lg:justify-start lg:items-start z-0
                        translate-x-[-10%] sm:translate-x-[-10%] md:translate-x-[0%] lg:translate-x-[5%] xl:translate-x-[50%]"
        >
          <div
            className="pt-[4vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[10vh] xl:pt-[2vh] px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10
                        ml-20 lg:ml-20 xl:translate-x-[-13%]"
          >
            <Image
              src="/images/top_10.png"
              alt="logo"
              width={877}
              height={200}
              priority
              className="
                          h-auto
                          w-[90vw] max-w-[580px]
                          sm:w-[80vw] sm:max-w-[640px]
                          md:w-[55vw] md:max-w-[720px]
                          lg:w-[820px] lg:max-w-[820px]
                          xl:w-[877px] xl:max-w-[877px]
                        "
              sizes="
                          (min-width:1280px) 877px,
                          (min-width:1024px) 820px,
                          (min-width:768px) 55vw,
                          (min-width:640px) 70vw,
                          80vw
                        "
            />
          </div>

          <div
            className="
                  rounded-3xl px-6 sm:px-6 md:px-12 lg:px-14 xl:px-16 
                  xl:pr-20 xl:pt-10
                  p-6 sm:p-6 md:p-10 lg:p-10
                  ml-20 sm:ml-30 md:ml-40 lg:ml-55 xl:ml-30
                  bg-gradient-to-r from-[#1E1E1E]/50 via-[#65002F]/50 to-[#F54BAF]/50
                  border border-[#F9C3E3]/70 backdrop-blur-md
                  w-full max-w-[90vw] md:max-w-md lg:max-w-lg xl:max-w-2xl
                  xl:min-h-[300px]
                  text-white
                "
          >
            <ul className="space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl py-6">
              <li className="flex items-start">
                <span className="text-purple-300 mr-3 mt-1 text-lg sm:text-xl">
                  •
                </span>
                <span>
                  <strong>
                    Top 10 giảng viên đạt danh hiệu "Inspiring Instructor
                    Awards"
                  </strong>{" "}
                  sẽ được vinh danh trong buổi lễ trang trọng tại trường Đại học
                  FPT campus TP.HCM.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-3 mt-1 text-lg sm:text-xl">
                  •
                </span>
                <span>
                  <strong>Trao tặng bộ quà tặng dành riêng</strong> cho danh
                  hiệu này.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VinhDanhGiangVien;
