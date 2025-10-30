"use client"

import { Suspense } from "react"
import Background from "@/src/components/landingPart/BackgroundMain"
import BackgroundKV from "@/src/components/landingPart/BackgroundKV"
import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh"
import CacMocThoiGian from "@/src/components/About/CacMocThoiGian"
import TheLeBinhChon from "@/src/components/About/TheLeBinhChon"
import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien"
import { Footer } from "@/src/components/landingPart"
import Reveal from "@/src/utils/Reveal"
import ScrollToTop from "@/src/components/scroll-to-top-arrow"
import { useGetWebImageByNamePublic } from "@/src/services/WebImageServices"
import BackgroundKVAbout from "@/src/components/landingPart/BackgroundKVAbout"

// Component that fetches and renders backgrounds
function AboutBackgrounds() {
  // Fetch web images for backgrounds
  const { data: backgroundData, isLoading: isLoadingBackground } =
    useGetWebImageByNamePublic("aboutPageBG1")
  const { data: background1Data, isLoading: isLoadingBackground1 } =
    useGetWebImageByNamePublic("aboutPageBG2")

  // Wait for images to load
  if (isLoadingBackground || isLoadingBackground1) {
    return <LoadingBackgrounds />
  }

  // Use fetched image URLs or fallback to default
  const backgroundSrc = backgroundData?.data?.imageUrl || "/images/bg.png"
  const backgroundKVSrc = background1Data?.data?.imageUrl || "/images/KV.png"

  return (
    <>
      <BackgroundKVAbout src={backgroundKVSrc} />
      <BackgroundKVAbout src={backgroundSrc} />
    </>
  )
}

// Loading fallback
function LoadingBackgrounds() {
  return (
    <>
      <BackgroundKVAbout src='/images/bg.png' />
      <BackgroundKVAbout src='/images/KV.png' />
    </>
  )
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<LoadingBackgrounds />}>
        <AboutBackgrounds />
      </Suspense>

      {/* Intro xuất hiện từ dưới lên */}
      <section
        data-kv='intro'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='up' threshold={0.3} duration={800}>
          <GioiThieuVeChuongTrinh />
        </Reveal>
      </section>

      {/* Timeline: xuất hiện từ trái sang, có stagger nhỏ */}
      <section
        data-kv='timeline'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='left' threshold={0.3} duration={800}>
          <CacMocThoiGian />
        </Reveal>
      </section>

      {/* Rules: xuất hiện từ phải sang */}
      <section
        data-kv='rules'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='right' threshold={0.3} duration={800}>
          <TheLeBinhChon />
        </Reveal>
      </section>

      {/* Honors/ Footer nếu muốn cũng bọc */}
      <section
        data-kv='honors'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='right' threshold={0.3} duration={800}>
          <VinhDanhGiangVien />
        </Reveal>
      </section>
      <ScrollToTop />

      <Footer />
    </>
  )
}
