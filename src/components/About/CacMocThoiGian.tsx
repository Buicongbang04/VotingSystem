import React from "react";
import TextBox from "./TextBox";
import Image from "next/image";

const CacMocThoiGian = () => {
  return (
    <section className="bg-gioithieu1 min-h-screen flex flex-col items-start justify-start px-6 md:px-10 relative snap-center gap-8">
      <div className="pt-[4vh] sm:pt-[6vh] md:pt-[6vh] lg:pt-[6vh] xl:pt-[2vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Image
          src="/images/moc.png"
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
              rounded-3xl p-6 sm:p-6 md:p-12 lg:p-14 xl:p-16
                        bg-gradient-to-r from-[#1E1E1E]/70 via-[#65002F]/70 to-[#F54BAF]/70
                        border border-[#F9C3E3]/70 backdrop-blur-md
                        w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-4xl
                        text-white
            "
      >
        <h3 className="text-white text-2xl md:text-3xl leading-relaxed mb-4 text-center md:text-left">
          Trải qua các giai đoạn sẽ tìm ra được top 10 giảng viên truyền cảm
          hứng nhất năm:
        </h3>
        <ul className="w-full text-white text-lg pl-10 md:text-2xl space-y-3">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
            Bình chọn
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
            Kết thúc bình chọn
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
            Công bố top 10
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
            Vinh danh top 10
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CacMocThoiGian;
