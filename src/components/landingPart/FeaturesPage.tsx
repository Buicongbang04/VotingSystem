import React from "react";
import ScrollToElement from "../scroll-to-top-arrow";
import { TimeLineSVG } from "./Timeline";

const FeaturesPage = () => {
  const timelineEvents = [
    { date: "10/10/2025", description: "Bình chọn", position: "below" },
    {
      date: "31/10/2025",
      description: "Kết thúc bình chọn",
      position: "above",
    },
    { date: "01/11/2025", description: "Công bố Top 10", position: "center" },
    {
      date: "31/10/2025",
      description: "Vinh danh Top 10",
      position: "center",
      isHighlighted: true,
    },
  ];

  return (
    <section
      id="features"
      className="
        bg-feature
        min-h-dvh flex flex-col items-center justify-center snap-section
        px-4 sm:px-6 lg:px-8
        w-full max-w-[100vw]
        overflow-x-hidden overflow-x-clip overflow-y-visible
      "
    >
      {/* Nội dung full-width; giới hạn trên các khung con để không bị bó hẹp */}
      <div className="w-full min-w-0">
        {/* Title */}
        <div className="text-center mb-[clamp(1rem,3vw,2rem)]">
          <h2
            className="
              font-bold text-white leading-tight
              text-[clamp(1.75rem,5.5vw,3.25rem)]
              break-words whitespace-normal [text-wrap:balance]
              inline-block
              px-[clamp(0.75rem,2vw,2rem)]
              py-[clamp(0.5rem,1.5vw,1.25rem)]
              max-w-[90%] md:max-w-4xl mx-auto
            "
            style={{
              textShadow:
                "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)",
            }}
          >
            MỐC THỜI GIAN
          </h2>
        </div>

        {/* Timeline */}
        <div
          className="
            relative mx-auto
            w-full min-w-0
            max-w-[95%] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl
          "
        >
          {/* Đảm bảo TimeLineSVG có viewBox trong component gốc để responsive mượt */}
          <TimeLineSVG
            className="
              block w-full h-auto max-w-full
            "
          />
        </div>
      </div>

      {/* Scroll to top / Hero */}
      <ScrollToElement to="#hero" />
    </section>
  );
};

export default FeaturesPage;
