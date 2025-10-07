"use client"
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

export default function Home() {
  return (
    <>
      <Background src='/images/bg.png' />
      <BackgroundKV src='/images/KV.png' />

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
