// import React from "react";
// import TextBox from "./TextBox";

// const CacMocThoiGian = () => {
//   return (
//     <section className="h-screen flex items-center justify-center px-10 relative bg-rose-400 snap-center">
//       {/* Left content box */}
//       <TextBox className="items-start flex-1">
//         <h3 className="text-white text-3xl leading-relaxed ">
//           Trải qua các giai đoạn sẽ tìm ra được top 10 giảng viên truyền cảm
//           hứng nhất năm:
//         </h3>
//         <ul className=" text-white text-2xl ml-7">
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
//             Bình chọn
//           </li>
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
//             Kết thúc bình chọn
//           </li>
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
//             Công bố top 10
//           </li>
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
//             Vinh danh top 10
//           </li>
//         </ul>
//       </TextBox>

//       {/* Right side text */}
//       <div className="text-center">
//         <h2
//           className="text-6xl font-bold text-white"
//           style={{
//             textShadow:
//               "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
//             filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
//           }}
//         >
//           CÁC MỐC THỜI GIAN
//         </h2>
//       </div>
//     </section>
//   );
// };

// export default CacMocThoiGian;

import React from "react";
import TextBox from "./TextBox";

const CacMocThoiGian = () => {
  return (
    <section className="bg-gioithieu min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative snap-center gap-8">
      {/* Left content */}
      <TextBox className="w-full md:w-1/2 order-2 md:order-1">
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
          CÁC MỐC THỜI GIAN
        </h2>
      </div>
    </section>
  );
};

export default CacMocThoiGian;
