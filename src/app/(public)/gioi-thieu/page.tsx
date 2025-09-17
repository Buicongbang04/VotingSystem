"use client";

import CacMocThoiGian from "@/src/components/About/CacMocThoiGian";
import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh";
import TheLeBinhChon from "@/src/components/About/TheLeBinhChon";
import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien";
import { Footer } from "@/src/components/landingPart";
import React, { useEffect } from "react";

const page = () => {
  return (
    <main
      className=""
      style={{
        scrollBehavior: "smooth",
        scrollSnapType: "y mandatory",
        scrollSnapStop: "always",
      }}
    >
      <GioiThieuVeChuongTrinh />
      <CacMocThoiGian />
      <TheLeBinhChon />
      <VinhDanhGiangVien />
      <Footer />
    </main>
  );
};

export default page;
