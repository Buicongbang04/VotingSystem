import React from "react";
import TextBox from "./TextBox";
import Image from "next/image";

const TheLeBinhChon = () => {
  return (
    <section className="bg-gioithieu h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative snap-center gap-8 overflow-hidden">
      <div className="w-[100vw] max-w-none h-[100svh] overflow-hidden">
        <Image
          src="/images/KV.png"
          alt="KV"
          fill
          priority
          className="object-cover w-full translate-y-[10%] sm:translate-y-[15%] md:translate-y-[20%] lg:translate-y-[25%] xl:translate-y-[20%]
                          translate-x-[-10%] sm:translate-x-[-10%] md:translate-x-[0%] lg:translate-x-[5%] xl:translate-x-[25%]
                          scale-[1.3] sm:scale-[1.4] md:scale-[1.4] lg:scale-[1.5] xl:scale-[1.5] sm:z-[0] md:z-[0] lg:z-[0] xl:z-[30]"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center lg:justify-start lg:items-start z-0">
          <div className="pt-[4vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[10vh] xl:pt-[14vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ml-10">
            <Image
              src="/images/vote.png"
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
              sm:ml-0 md:ml-0 lg:ml-0 xl:ml-50 xl:mt-20 xl:pr-20 xl:pt-10
              p-6 m-5 sm:p-6 sm:m-7 md:p-10 md:m-10 md:mt-20 lg:p-10 lg:m-10
              bg-gradient-to-r from-[#1E1E1E]/50 via-[#65002F]/50 to-[#F54BAF]/50
              border border-[#F9C3E3]/70 backdrop-blur-md
              w-full max-w-[90vw] md:max-w-xl lg:max-w-xl xl:max-w-5xl
              lg:min-h-[450px] xl:min-h-[500px]
              text-white
            "
          >
            <ul className="space-y-4 xl:max-w-[80%] sm:text-md md:text-xl lg:text-xl xl:text-2xl font-light">
              <li className="flex items-start">
                <span className="text-xl sm:text-2xl md:text-3xl mr-4">•</span>
                <span>
                  Chương trình dành cho tất cả sinh viên đang học tại FPTU HCMC.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-xl sm:text-2xl md:text-3xl mr-4">•</span>
                <span>
                  Sinh viên sẽ bình chọn cho giảng viên mà bạn cảm thấy được
                  truyền cảm hứng trong quá trình học tập, trao đổi tại trường.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-xl sm:text-2xl md:text-3xl mr-4">•</span>
                <span>
                  Hệ thống sẽ tính điểm theo tổng lượt bình chọn của sinh viên
                  dành cho mỗi giảng viên.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-xl sm:text-2xl md:text-3xl mr-4">•</span>
                <span>
                  Sau thời gian bình chọn, ban tổ chức sẽ chọn ra top 10 giảng
                  viên truyền cảm hứng nhất năm và vinh danh.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLeBinhChon;
