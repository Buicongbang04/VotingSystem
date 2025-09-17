"use client"

import CacMocThoiGian from "@/src/components/About/CacMocThoiGian"
import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh"
import TheLeBinhChon from "@/src/components/About/TheLeBinhChon"
import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien"
import { Footer } from "@/src/components/landingPart"
import Lenis from "lenis"
import React, { useEffect } from "react"

const page = () => {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])
  return (
    <main
      className=''
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
  )
}

export default page
