// "use client";

// import Background from "@/src/components/landingPart/BackgroundMain";
// import BackgroundKVAbout from "@/src/components/landingPart/BackgroundKVAbout";

// import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh";
// import CacMocThoiGian from "@/src/components/About/CacMocThoiGian";
// import TheLeBinhChon from "@/src/components/About/TheLeBinhChon";
// import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien";
// import { Footer } from "@/src/components/landingPart";

// import { useEffect, useRef, useState } from "react";

// type KVAboutKey = "intro" | "timeline" | "rules" | "honors";

// function PSection({
//   children,
//   speed = 0.2, // đồng bộ với Home (bạn đang để 0.2)
//   className = "",
//   kvKey,
// }: {
//   children: React.ReactNode;
//   speed?: number;
//   className?: string;
//   kvKey: KVAboutKey;
// }) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const el = ref.current!;
//     const onScroll = () => {
//       const rect = el.getBoundingClientRect();
//       const y = rect.top + window.scrollY;
//       const viewportY = window.scrollY + window.innerHeight * 0.5;
//       const delta = (viewportY - y) * speed;
//       el.style.transform = `translateY(${delta.toFixed(1)}px)`;
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [speed]);

//   return (
//     <section
//       ref={ref}
//       data-kv={kvKey}
//       className={`relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28 will-change-transform ${className}`}
//     >
//       {children}
//     </section>
//   );
// }

// export default function AboutPage() {
//   return (
//     <>
//       {/* Nền tĩnh + KV động (pan/zoom theo section About) */}
//       <Background src="/images/bg.png" />
//       <BackgroundKVAbout src="/images/KV.png" />

//       {/* Intro */}
//       <PSection kvKey="intro" className="md:-translate-x-12">
//         <GioiThieuVeChuongTrinh />
//       </PSection>

//       {/* Timeline */}
//       <PSection kvKey="timeline" className="md:translate-x-16 -mt-8">
//         <CacMocThoiGian />
//       </PSection>

//       {/* Rules */}
//       <PSection kvKey="rules" className="md:-translate-x-20 -mt-6">
//         <TheLeBinhChon />
//       </PSection>

//       {/* Honors */}
//       <PSection kvKey="honors" className="md:translate-x-12 -mt-6">
//         <VinhDanhGiangVien />
//       </PSection>
//       <Footer />
//     </>
//   );
// }
"use client";

import Background from "@/src/components/landingPart/BackgroundMain";
import BackgroundKVAbout from "@/src/components/landingPart/BackgroundKVAbout";

import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh";
import CacMocThoiGian from "@/src/components/About/CacMocThoiGian";
import TheLeBinhChon from "@/src/components/About/TheLeBinhChon";
import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien";
import { Footer } from "@/src/components/landingPart";

import Reveal from "@/src/utils/Reveal";

export default function Page() {
  return (
    <>
      <Background src="/images/bg.png" />
      <BackgroundKVAbout src="/images/KV.png" />

      {/* Intro xuất hiện từ dưới lên */}
      <section data-kv="intro" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
        <Reveal direction="up" threshold={0.3} duration={800}>
          <GioiThieuVeChuongTrinh />
        </Reveal>
      </section>

      {/* Timeline: xuất hiện từ trái sang, có stagger nhỏ */}
      <section data-kv="timeline" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
        <Reveal direction="left" threshold={0.3} duration={800}>
          <CacMocThoiGian />
        </Reveal>
      </section>

      {/* Rules: xuất hiện từ phải sang */}
      <section data-kv="rules" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
        <Reveal direction="right" threshold={0.3} duration={800}>
          <TheLeBinhChon />
        </Reveal>
      </section>

      {/* Honors/ Footer nếu muốn cũng bọc */}
      <section data-kv="honors" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
        <Reveal direction="right" threshold={0.3} duration={800}>
          <VinhDanhGiangVien />
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
