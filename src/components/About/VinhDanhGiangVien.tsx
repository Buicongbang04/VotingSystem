import React from "react";
import TextBox from "./TextBox";

const VinhDanhGiangVien = () => {
  return (
    <section className="bg-gioithieu min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative snap-center gap-8">
      {/* Left content */}
      <TextBox className="w-full md:w-1/2 order-2 md:order-1">
        <ul className="space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl py-6">
          <li className="flex items-start">
            <span className="text-purple-300 mr-3 mt-1 text-lg sm:text-xl">
              •
            </span>
            <span>
              <strong>
                Top 10 giảng viên đạt danh hiệu "Inspiring Instructor Awards"
              </strong>{" "}
              sẽ được vinh danh trong buổi lễ trang trọng tại trường Đại học FPT
              campus TP.HCM.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-300 mr-3 mt-1 text-lg sm:text-xl">
              •
            </span>
            <span>
              <strong>Trao tặng bộ quà tặng dành riêng</strong> cho danh hiệu
              này.
            </span>
          </li>
        </ul>
      </TextBox>

      {/* Right side title */}
      <div
        className="text-white max-w-3xl mx-auto text-center px-2 order-1 md:order-2"
        style={{
          textShadow:
            "0 0 20px rgba(233, 233, 233, 0.8), 0 0 40px rgba(167, 163, 163, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
          VINH DANH TOP 10 GIẢNG VIÊN
        </h2>
      </div>
    </section>
  );
};

export default VinhDanhGiangVien;
