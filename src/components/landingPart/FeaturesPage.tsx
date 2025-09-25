import React from "react";
import ScrollToElement from "../scroll-to-top-arrow";
import Image from "next/image";
import TimeLine from "./Timeline";

const FeaturesPage = () => {
  return (
    <section
      id="features"
      className="
        bg-feature
        min-h-dvh flex flex-col items-center justify-center
        w-full max-w-[100vw]
        snap-section
        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
        overflow-y-visible overflow-x-hidden
      "
    >
      {/* Nội dung full-width; giới hạn trên các khung con để không bị bó hẹp */}
      <div className="w-full min-w-0 flex flex-col items-center md:items-stretch justify-center">
        <div
          className="
            flex justify-center md:justify-start items-start
            pt-[4vh] sm:pt-[6vh] md:pt-[6vh] lg:pt-[6vh] xl:pt-[2vh]
            md:pl-[8vw] lg:pl-[10vw] xl:pl-[12vw]
          "
        >
          <Image
            src="/images/moc.png"
            alt="logo"
            width={877}
            height={200}
            priority
            className="
              h-auto
              w-[80vw] max-w-[520px]
              sm:w-[70vw] sm:max-w-[640px]
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

        {/* Timeline */}
        <div className="w-full">
          {/* Parent wrapper: chiều cao theo breakpoint + tránh tràn ngang khi item đi chéo */}
          <div
            className="
              relative w-full
              h-[46vh]              
              sm:h-[52vh]            
              md:h-[58vh]             
              lg:h-[64vh]  
              xl:h-[68vh] 2xl:h-[72vh]
              overflow-x-hidden
              pr-8 sm:pr-12 md:pr-16 lg:pr-24 xl:pr-32 
              pl-3 sm:pl-4 md:pl-6 lg:pl-8            
              mt-6 sm:mt-8 md:mt-10 lg:mt-12
            "
          >
            {/* Nếu muốn font Bolkit cho toàn bộ timeline, giữ class dưới */}
            <TimeLine className="w-full h-full font-bolkit" />
          </div>
        </div>
      </div>

      {/* Scroll to top / Hero */}
      <ScrollToElement to="#hero" />
    </section>
  );
};

export default FeaturesPage;
