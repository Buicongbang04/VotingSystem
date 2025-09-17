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
        {
          hearts: 2,
          instructors: "3 giảng viên",
          category: "chuyên ngành",
        },
      ],
    },
    {
      title: "GIAI ĐOẠN CHUYÊN NGÀNH",
      subtitle: "(HK7 - HK9)",
      rules: [
        {
          hearts: 3,
          instructors: "3 giảng viên",
          category: "chuyên ngành",
        },
      ],
    },
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-stats snap-section relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Main Title */}
        <div className="text-center pt-10">
          <h2
            className="text-5xl md:text-6xl font-bold text-white"
            style={{
              textShadow:
                "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
            }}
          >
            THỂ LỆ BÌNH CHỌN
          </h2>
        </div>

        {/* Voting Rules Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white">Quy tắc bình chọn</h3>
          <div className="space-y-3 text-white">
            <div className="flex items-start">
              <span className="text-pink-400 mr-3">•</span>
              <span>
                1 sinh viên có 3 lượt bình chọn và chỉ được tham gia 1 lần/ngày
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-pink-400 mr-3">•</span>
              <span>1 phiếu chỉ được bình chọn cho 1 giảng viên/bộ môn</span>
            </div>
          </div>
        </div>

        {/* Point Calculation Rules */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white pb-5 italic">
            Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicStages.map((stage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-600/30 to-indigo-600/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 relative"
                style={{
                  boxShadow:
                    "0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <h4 className="text-white font-bold text-lg mb-2 text-center">
                  {stage.title}
                </h4>
                {stage.subtitle && (
                  <p className="text-white/80 text-sm text-center mb-4">
                    {stage.subtitle}
                  </p>
                )}

                <div className="space-y-4">
                  {stage.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="text-center">
                      <div className="flex justify-center mb-2">
                        {Array.from({ length: rule.hearts }, (_, i) => (
                          <span
                            key={i}
                            className="text-pink-400 text-xl mx-1"
                            style={{
                              textShadow: "0 0 10px rgba(244, 114, 182, 0.6)",
                            }}
                          >
                            ♥
                          </span>
                        ))}
                      </div>
                      <p className="text-white text-sm font-semibold">
                        {rule.instructors}
                      </p>
                      <p className="text-white/80 text-xs">{rule.category}</p>
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
