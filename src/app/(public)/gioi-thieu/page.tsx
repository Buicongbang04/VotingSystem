"use client"
import Background from "@/src/components/landingPart/BackgroundMain"
import BackgroundKV from "@/src/components/landingPart/BackgroundKV"
import CacMocThoiGian from "@/src/components/About/CacMocThoiGian"
import GioiThieuVeChuongTrinh from "@/src/components/About/GioiThieuVeChuongTrinh"
import TheLeBinhChon from "@/src/components/About/TheLeBinhChon"
import VinhDanhGiangVien from "@/src/components/About/VinhDanhGiangVien"
import { Footer } from "@/src/components/landingPart"
import { useEffect, useRef } from "react"

function PSection({
  children,
  speed = 0.15,
  className = "",
  kvKey,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  kvKey: "hero" | "features" | "stats" | "contact"
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current!
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const y = rect.top + window.scrollY
      const viewportY = window.scrollY + window.innerHeight * 0.5
      const delta = (viewportY - y) * speed
      el.style.transform = `translateY(${delta.toFixed(1)}px)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return (
    <section
      ref={ref}
      data-kv={kvKey}
      className={`relative max-w-7xl mx-auto px-6 py-28 will-change-transform ${className}`}
    >
      {children}
    </section>
  )
}

const page = () => {
  return (
    <>
      <Background src='/images/bg.png' />
      <BackgroundKV src='/images/KV.png' />

      <PSection
        kvKey='hero'
        speed={0.15}
        className='md:translate-x-8 px-4 sm:px-6 py-24 sm:py-28'
      >
        <GioiThieuVeChuongTrinh />
      </PSection>

      <PSection
        kvKey='features'
        speed={0.25}
        className='md:-translate-x-12 -mt-12'
      >
        <CacMocThoiGian />
      </PSection>

      <PSection kvKey='stats' speed={0.18} className='md:translate-x-6 -mt-8'>
        <TheLeBinhChon />
      </PSection>

      <PSection
        kvKey='contact'
        speed={0.22}
        className='md:-translate-x-16 -mt-10'
      >
        <VinhDanhGiangVien />
      </PSection>
      <Footer />
    </>
  )
}

export default page
