import React from "react";
import ScrollToElement from "../scroll-to-top-arrow";

const StatsPage = () => {
  const academicStages = [
    {
      title: "GIAI ĐOẠN DỰ BỊ",
      subtitle: "",
      rules: [
        {
          hearts: 3,
          instructors: "3 giảng viên",
          category: "nhóm ngành cơ bản",
        },
      ],
    },
    {
      title: "GIAI ĐOẠN CHUYÊN NGÀNH",
      subtitle: "(HK1 - HK6)",
      rules: [
        {
          hearts: 3,
          instructors: "3 giảng viên",
          category: "nhóm ngành cơ bản",
        },
        { hearts: 2, instructors: "3 giảng viên", category: "chuyên ngành" },
      ],
    },
    {
      title: "GIAI ĐOẠN CHUYÊN NGÀNH",
      subtitle: "(HK7 - HK9)",
      rules: [
        { hearts: 3, instructors: "3 giảng viên", category: "chuyên ngành" },
      ],
    },
  ];

  return (
    <section
      id="stats"
      className="
        bg-stats
        min-h-dvh flex flex-col items-center justify-center snap-section relative
        px-4 sm:px-6 lg:px-8
        w-full max-w-[100vw]
        overflow-x-hidden overflow-x-clip overflow-y-visible
      "
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-20 right-20 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full min-w-0 max-w-[95%] md:max-w-5xl mx-auto">
        {/* Main Title */}
        <div className="text-center pt-10">
          <h2
            className="
              font-bold text-white leading-tight mb-8
              text-[clamp(1.75rem,5vw,3.5rem)]
              break-words whitespace-normal [text-wrap:balance]
            "
            style={{
              textShadow:
                "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
            }}
          >
            THỂ LỆ BÌNH CHỌN
          </h2>
        </div>

        {/* Voting Rules Section */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Quy tắc bình chọn
          </h3>
          <div className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base break-words whitespace-normal">
            <div className="flex items-start">
              <span className="text-pink-400 mr-2 sm:mr-3">•</span>
              <span>
                1 sinh viên có 3 lượt bình chọn và chỉ được tham gia 1 lần/ngày
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-pink-400 mr-2 sm:mr-3">•</span>
              <span>1 phiếu chỉ được bình chọn cho 1 giảng viên/bộ môn</span>
            </div>
          </div>
        </div>

        {/* Point Calculation Rules */}
        <div className="mb-8 sm:mb-12">
          <h3
            className="italic font-bold text-white pb-4 sm:pb-5 mb-2 sm:mb-4
                         text-lg sm:text-xl md:text-2xl break-words whitespace-normal"
          >
            Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {academicStages.map((stage, index) => (
              <div
                key={index}
                className="
                  bg-gradient-to-br from-purple-600/30 to-indigo-600/30
                  backdrop-blur-sm rounded-2xl
                  p-4 sm:p-6 md:p-8
                  border border-purple-400/30 relative
                  w-full min-w-0
                "
                style={{
                  boxShadow:
                    "0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <h4
                  className="text-white font-bold text-center mb-1 sm:mb-2
                               text-base sm:text-lg md:text-xl break-words whitespace-normal"
                >
                  {stage.title}
                </h4>
                {stage.subtitle && (
                  <p
                    className="text-white/80 text-center mb-2 sm:mb-4
                                text-xs sm:text-sm md:text-base break-words whitespace-normal"
                  >
                    {stage.subtitle}
                  </p>
                )}

                <div className="space-y-3 sm:space-y-4">
                  {stage.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="text-center">
                      <div className="flex justify-center mb-1 sm:mb-2">
                        {Array.from({ length: rule.hearts }, (_, i) => (
                          <span
                            key={i}
                            className="text-pink-400 text-lg sm:text-xl md:text-2xl mx-1"
                            style={{
                              textShadow: "0 0 10px rgba(244, 114, 182, 0.6)",
                            }}
                          >
                            ♥
                          </span>
                        ))}
                      </div>
                      <p
                        className="text-white font-semibold
                                    text-sm sm:text-base md:text-base break-words whitespace-normal"
                      >
                        {rule.instructors}
                      </p>
                      <p
                        className="text-white/80
                                    text-xs sm:text-sm md:text-sm break-words whitespace-normal"
                      >
                        {rule.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollToElement to="#features" />
    </section>
  );
};

export default StatsPage;
