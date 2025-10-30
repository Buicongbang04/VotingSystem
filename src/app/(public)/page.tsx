"use client"
import { Suspense } from "react"
import Background from "@/src/components/landingPart/BackgroundMain"
import BackgroundKV from "@/src/components/landingPart/BackgroundKV"
import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../../components/landingPart"
import ScrollToTop from "@/src/components/scroll-to-top-arrow"
import Reveal from "@/src/utils/Reveal"
import { useGetWebImageByNamePublic } from "@/src/services/WebImageServices"

// Component that fetches and renders backgrounds
function HomeBackgrounds() {
  // Fetch web images for backgrounds
  const { data: backgroundData, isLoading: isLoadingBackground } =
    useGetWebImageByNamePublic("background")
  const { data: background1Data, isLoading: isLoadingBackground1 } =
    useGetWebImageByNamePublic("landingPageBg")

  // Wait for images to load
  if (isLoadingBackground || isLoadingBackground1) {
    return <LoadingBackgrounds />
  }

  // Use fetched image URLs or fallback to default
  const backgroundSrc = backgroundData?.data?.imageUrl || "/images/bg.png"
  const backgroundKVSrc = background1Data?.data?.imageUrl || "/images/KV.png"

  return (
    <>
      <BackgroundKV src={backgroundKVSrc} />
      <BackgroundKV src={backgroundSrc} />
    </>
  )
}

// Loading fallback
function LoadingBackgrounds() {
  return (
    <>
      <BackgroundKV src='/images/bg.png' />
      <BackgroundKV src='/images/KV.png' />
    </>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingBackgrounds />}>
        <HomeBackgrounds />
      </Suspense>

      {/* Hero section - appears from bottom */}
      <section
        data-kv='hero'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='up' threshold={0.3} duration={800}>
          <HeroPage />
        </Reveal>
      </section>

      {/* Features section - appears from left */}
      <section
        data-kv='features'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='left' threshold={0.3} duration={800}>
          <FeaturesPage />
        </Reveal>
      </section>

      {/* Stats section - appears from right */}
      <section
        data-kv='stats'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='right' threshold={0.3} duration={800}>
          <StatsPage />
        </Reveal>
      </section>

      {/* Contact section - appears from bottom */}
      <section
        data-kv='contact'
        className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28'
      >
        <Reveal direction='up' threshold={0.3} duration={800}>
          <ContactPage />
        </Reveal>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  )
}
