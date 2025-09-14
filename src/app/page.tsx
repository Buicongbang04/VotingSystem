"use client"

import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
} from "../components/landingPart"

export default function Home() {
  return (
    <div className='h-screen overflow-y-scroll snap-container'>
      <HeroPage />
      <FeaturesPage />
      <StatsPage />
      <ContactPage />
    </div>
  )
}
