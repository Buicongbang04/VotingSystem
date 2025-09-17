import React from "react";
import TextBox from "./TextBox";

const GioiThieuVeChuongTrinh = () => {
  return (
    <section className="bg-gioithieu h-screen flex flex-col md:flex-row items-center justify-center snap-center px-4 md:px-10 gap-8 md:gap-5">
      {/* Title */}
      <div
        className="w-full md:w-1/2 text-white text-4xl sm:text-5xl md:text-7xl font-bold text-center flex items-center justify-center"
        style={{
          textShadow:
            "0 0 20px rgba(233, 233, 233, 0.8), 0 0 40px rgba(167, 163, 163, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
        }}
      >
        GIỚI THIỆU VỀ CHƯƠNG TRÌNH
      </div>

      {/* Content */}
      <TextBox className="w-full md:w-1/2">
        <p className="text-base sm:text-lg md:text-2xl text-justify mb-4">
          Đây là danh hiệu được bình chọn định kỳ hàng năm và dành cho giảng
          viên giảng dạy ở 3 học kỳ gần nhất của thời điểm đó:{" "}
          <strong>Fall</strong>, <strong>Spring</strong>,{" "}
          <strong>Summer</strong>.
        </p>
        <p className="text-base sm:text-lg md:text-2xl text-justify">
          Danh hiệu <strong>"Inspiring Instructor Awards"</strong> nhằm tôn vinh
          những nỗ lực, cống hiến của Giảng viên trong hành trình trao truyền
          kiến thức và cảm hứng đến sinh viên <strong>FPTU HCMC</strong>.
        </p>
      </TextBox>
    </section>
  );
};

export default GioiThieuVeChuongTrinh;
