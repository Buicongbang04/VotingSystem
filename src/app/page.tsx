"use client"

import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../components/landingPart"

export default function Home() {
  return (
    <div className='h-screen overflow-y-scroll snap-y snap-mandatory '>
      <HeroPage />
      <FeaturesPage />
      <StatsPage />
      <ContactPage />
      <Footer />
    </div>
  )
}
